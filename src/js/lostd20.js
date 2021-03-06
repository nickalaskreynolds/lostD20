(function() {

  // elements
  var element_results = e(".results");
  var element_results_list = e(".results .list");
  var element_results_expandResults = e(".results .expand-results");
  var element_results_clearResults = e(".results .clear-results");

  var element_formulas = e(".formulas");
  var element_formulas_list = e(".formulas .list");

  var element_diceForm = e(".dice-form");
  var element_diceForm_label = eA(".dice-form label");

  var element_goRoll = e(".go-roll");

  var controls_numberOfBonus = e(".controls .number-of-bonus");
  var controls_numberOfBonus_input = e(".controls .number-of-bonus input");
  var controls_numberOfBonus_input_value
  var controls_numberOfBonus_clear = e(".controls .number-of-bonus .clear");
  var controls_numberOfBonus_plusOne = e(".controls .input-controls-bonus .plus-one");
  var controls_numberOfBonus_minusOne = e(".controls .input-controls-bonus .minus-one");

  var controls_numberOfDice = e(".controls .number-of-dice");
  var controls_numberOfDice_input = e(".controls .number-of-dice input");
  var controls_numberOfDice_input_value
  var controls_numberOfDice_clear = e(".controls .number-of-dice .clear");
  var controls_numberOfDice_plusOne = e(".controls .input-controls-dice .plus-one");
  var controls_numberOfDice_minusOne = e(".controls .input-controls-dice .minus-one");

  var controls_saveCurrentFormula = e(".controls .save-current-formula");

  // --------------------------------------------------------------------------
  // helper functions
  // --------------------------------------------------------------------------

  // get element by class or id
  function e(selector) {
    return document.querySelector(selector);
  };

  // get all elements by class or id
  function eA(selector) {
    return document.querySelectorAll(selector);
  };

  // toggle class
  function toggleClass(element, theClassName) {
    element.classList.toggle(theClassName);
  };

  // add class
  function addClass(element, theClassName) {
    element.classList.add(theClassName);
  };

  // remove class
  function removeClass(element, theClassName) {
    element.classList.remove(theClassName);
  };

  // get parent element
  var getClosest = function(element, selector) {
    var firstChar = selector.charAt(0);
    // Get closest match
    for (; element && element !== document; element = element.parentNode) {
      // If selector is a class
      if (firstChar === '.') {
        if (element.classList.contains(selector.substr(1))) {
          return element;
        };
      };
      // If selector is an ID
      if (firstChar === '#') {
        if (element.id === selector.substr(1)) {
          return element;
        };
      };
      // If selector is a data attribute
      if (firstChar === '[') {
        if (element.hasAttribute(selector.substr(1, selector.length - 2))) {
          return element;
        };
      };
      // If selector is a tag
      if (element.tagName.toLowerCase() === selector) {
        return element;
      };
    };
    return false;
  };

  // delay function
  function delayFunction(functionToDelay, time) {
    window.setTimeout(functionToDelay, time);
  };

  // --------------------------------------------------------------------------
  // local store
  // --------------------------------------------------------------------------

  // local storage add
  function localStoreAdd(key, data) {
    if (localStorage.getItem) {
      localStorage.setItem(key, data.innerHTML);
    };
  };

  // local storage remove
  function localStoreRemove(key) {
    if (localStorage.getItem) {
      localStorage.removeItem(key);
    };
  };

  // local storage read
  function localStoreRead(key, data) {
    if (localStorage.getItem(key) == "") {
      localStorage.removeItem(key);
    } else if (localStorage.getItem(key)) {
      data.innerHTML = localStorage.getItem(key);
    };
  };

  // --------------------------------------------------------------------------
  // nav
  // --------------------------------------------------------------------------

  var nav = e("nav");
  var nav_toggle = e("nav .toggle-nav");
  var nav_clearAll = e("nav .clear-all");
  var nav_toggleDropLowest = e("nav .toggle-drop-lowest");
  var nav_toggleFullscreen = e("nav .toggle-fullscreen");

  function toggleFullScreen() {
    var icon = nav_toggleFullscreen.querySelector("span");
    var root = window.document;
    var rootElement = root.documentElement;
    var requestFullScreen = rootElement.requestFullscreen || rootElement.mozRequestFullScreen || rootElement.webkitRequestFullScreen || rootElement.msRequestFullscreen;
    var cancelFullScreen = root.exitFullscreen || root.mozCancelFullScreen || root.webkitExitFullscreen || root.msExitFullscreen;
    if (!root.fullscreenElement && !root.mozFullScreenElement && !root.webkitFullscreenElement && !root.msFullscreenElement) {
      requestFullScreen.call(rootElement);
      toggleClass(nav_toggleFullscreen, "active");
      toggleClass(icon, "icon-fullscreen-exit");
      toggleClass(icon, "icon-fullscreen");
    } else {
      cancelFullScreen.call(root);
      toggleClass(nav_toggleFullscreen, "active");
      toggleClass(icon, "icon-fullscreen-exit");
      toggleClass(icon, "icon-fullscreen");
    }
  };

  nav_toggle.addEventListener("click", function() {
    toggleClass(nav, "open");
  }, false);

  function toggleDropLowest() {
    var icon = nav_toggleDropLowest.querySelector("span");
    toggleClass(nav_toggleDropLowest, "active");
    toggleClass(icon, "icon-check-box-checked");
    toggleClass(icon, "icon-check-box-unchecked");
    var readDataSet = nav_toggleDropLowest.dataset.active;
    if (readDataSet == "false") {
      nav_toggleDropLowest.dataset.active = "true";
    } else if (readDataSet == "true") {
      nav_toggleDropLowest.dataset.active = "false";
    };
  };

  nav_clearAll.addEventListener("click", function() {
    createPrompt("Are you sure?", "Roll history and saved formuals will be cleared. This can not be undone.", "clear all");
    removeClass(nav, "open");
  }, false);

  nav_toggleDropLowest.addEventListener("click", function() {
    toggleDropLowest();
  }, false);

  nav_toggleFullscreen.addEventListener("click", function() {
    toggleFullScreen();
  }, false);

  window.addEventListener('click', function() {
    removeClass(nav, "open");
  });

  nav.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  // --------------------------------------------------------------------------
  // dice form
  // --------------------------------------------------------------------------

  // get checked radio val 
  function getRadioValue(form, radioGroupName) {
    var selectedDice;
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // radios can also be expressed with
    // console.log(e(".dice-form")["dice-select"]);
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // radio checked?
        selectedDice = radios[i].value; // if so, hold its value in selectedDice
      };
    };
    return selectedDice;
  };

  // dice active state 
  function makeSelectedRadioActive(form, radioGroupName) {
    var element_currentDice = e(".current-dice span");
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // radio checked?
        element_diceForm_label[i].classList.add("active");
        var dice = parseInt(element_diceForm_label[i].querySelector("input").value, 10);
        element_currentDice.textContent = dice;
      } else {
        element_diceForm_label[i].classList.remove("active");
      };
    };
  };

  // dice select
  function addListenerTo_element_diceForm_label() {
    for (var i = 0; i < element_diceForm_label.length; i++) {
      element_diceForm_label[i].addEventListener("click", function() {
        makeSelectedRadioActive(element_diceForm, "dice-select");
      }, false);
    };
  };

  // --------------------------------------------------------------------------
  // input fields
  // --------------------------------------------------------------------------

  // loose focus when enter is pressed
  function dropFocusOnEnter(element) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      element.blur();
    };
  };

  // press enter to roll
  function rollOnEnter(element) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      rollCurrentFormula(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    };
  };

  // arrow key input change 
  function keystroke_modifiers_plusMinus(whichInputField) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 38) {
      modifiers_plusMinus(1, whichInputField);
    } else if (keystroke == 40) {
      modifiers_plusMinus(-1, whichInputField);
    };
  };

  // resize input to text lenght
  function storeInputName(element) {
    element.setAttribute("value", element.value);
    var savedFormula = getClosest(element, ".saved-formula");
    savedFormula.dataset.rollName = element.value;
  };

  // read multiple dice input field
  function modifiers_readAmountOfDice() {
    controls_numberOfDice_input_value = parseInt(controls_numberOfDice_input.value, 10) || 0;
    if (controls_numberOfDice_input_value >= 999) {
      controls_numberOfDice_input.value = 999;
      controls_numberOfDice_input_value = 999;
    };
    if (controls_numberOfDice_input_value >= 2) {
      removeClass(controls_numberOfDice_clear, "hidden")
    };
    if (controls_numberOfDice_input_value == 1 || controls_numberOfDice_input_value == 0) {
      addClass(controls_numberOfDice_clear, "hidden")
    };
    return controls_numberOfDice_input_value;
  };

  function modifiers_readAmountOfDice_blur() {
    controls_numberOfDice_input_value = parseInt(controls_numberOfDice_input.value, 10) || 0;
    if (controls_numberOfDice_input_value <= 0 || controls_numberOfDice_input_value == "") {
      controls_numberOfDice_input.value = 1;
      controls_numberOfDice_input_value = 1;
    };
  };

  // read bonus input field
  function modifiers_readAmountOfBonus() {
    controls_numberOfBonus_input_value = parseInt(controls_numberOfBonus_input.value, 10) || 0;
    controls_numberOfBonus_input.maxLength = 3;
    if (controls_numberOfBonus_input_value >= 999) {
      controls_numberOfBonus_input.value = 999;
      controls_numberOfBonus_input_value = 999;
    };
    if (controls_numberOfBonus_input_value >= 1) {
      removeClass(controls_numberOfBonus_clear, "hidden")
    };
    if (controls_numberOfBonus_input_value <= -1) {
      removeClass(controls_numberOfBonus_clear, "hidden")
    };
    if (controls_numberOfBonus_input_value == 0) {
      addClass(controls_numberOfBonus_clear, "hidden")
    };
    return controls_numberOfBonus_input_value;
  };

  function modifiers_readAmountOfBonus_blur() {
    controls_numberOfBonus_input_value = parseInt(controls_numberOfBonus_input.value, 10) || 0;
    controls_numberOfBonus_input.maxLength = 4;
    if (controls_numberOfBonus_input_value == 0) {
      controls_numberOfBonus_input.value = "+" + 0;
      controls_numberOfBonus_input_value = 0;
    };
    if (controls_numberOfBonus_input_value > 0) {
      controls_numberOfBonus_input.value = "+" + controls_numberOfBonus_input_value;
    };
  };

  function modifiers_readAmountOfBonus_focus() {
    controls_numberOfBonus_input_value = parseInt(controls_numberOfBonus_input.value, 10) || 0;
    controls_numberOfBonus_input.value = controls_numberOfBonus_input_value;
  };

  // plus or minus modifier or clear
  function modifiers_plusMinus(changeBy, whichInputField) {
    whichInputField.value = whichInputField.value * 1 + changeBy;
    if (changeBy == 0) {
      whichInputField.value = "0";
    };
  };

  // clear
  controls_numberOfBonus_clear.addEventListener("click", function() {
    modifiers_plusMinus(0, controls_numberOfBonus_input);
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfBonus_blur();
  }, false);

  controls_numberOfDice_clear.addEventListener("click", function() {
    modifiers_plusMinus(0, controls_numberOfDice_input);
    modifiers_readAmountOfDice();
    modifiers_readAmountOfDice_blur();
  }, false);

  // bonusModifiers
  controls_numberOfBonus_input.addEventListener("input", function() {
    modifiers_readAmountOfBonus();
  }, false);

  controls_numberOfBonus_input.addEventListener("blur", function() {
    modifiers_readAmountOfBonus_blur();
  }, false);

  controls_numberOfBonus_input.addEventListener("focus", function() {
    modifiers_readAmountOfBonus_focus();
  }, false);

  controls_numberOfBonus_input.addEventListener("keypress", function() {
    // dropFocusOnEnter(this);
    rollOnEnter(this);
  }, false);

  controls_numberOfBonus_input.addEventListener("keydown", function() {
    keystroke_modifiers_plusMinus(controls_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  controls_numberOfBonus_plusOne.addEventListener("click", function() {
    modifiers_plusMinus(1, controls_numberOfBonus_input);
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfBonus_blur();
  }, false);

  controls_numberOfBonus_minusOne.addEventListener("click", function() {
    modifiers_plusMinus(-1, controls_numberOfBonus_input);
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfBonus_blur();
  }, false);

  // multipleDice
  controls_numberOfDice_input.addEventListener("input", function() {
    modifiers_readAmountOfDice();
  }, false);

  controls_numberOfDice_input.addEventListener("blur", function() {
    modifiers_readAmountOfDice_blur();
  }, false);

  controls_numberOfDice_input.addEventListener("keypress", function() {
    // dropFocusOnEnter(this);
    rollOnEnter(this);
  }, false);

  controls_numberOfDice_input.addEventListener("keydown", function() {
    keystroke_modifiers_plusMinus(controls_numberOfDice_input);
    modifiers_readAmountOfDice();
  }, false);

  controls_numberOfDice_plusOne.addEventListener("click", function() {
    modifiers_plusMinus(1, controls_numberOfDice_input);
    modifiers_readAmountOfDice();
    modifiers_readAmountOfDice_blur();
  }, false);

  controls_numberOfDice_minusOne.addEventListener("click", function() {
    modifiers_plusMinus(-1, controls_numberOfDice_input);
    modifiers_readAmountOfDice();
    modifiers_readAmountOfDice_blur();
  }, false);

  // --------------------------------------------------------------------------
  // dice roll
  // --------------------------------------------------------------------------

  // roll current settings/formula
  function rollCurrentFormula(numberOfDice, whichDice, bonusModifier, rollName) {
    // make array
    var randomDiceResults = [];
    // populate array with natural rolls
    for (var i = 0; i < numberOfDice; i++) {
      randomDiceResults.push(Math.floor(Math.random() * whichDice) + 1)
    };
    // make lowest index var
    var lowestRollIndex;
    // find lowest number index in array
    var indexOfSmallestValue = function(array) {
      lowestRollIndex = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i] < array[lowestRollIndex]) {
          lowestRollIndex = i;
        };
      };
      return lowestRollIndex;
    };
    // run find the lowest value function passing in the array of rolls
    indexOfSmallestValue(randomDiceResults);
    // sum all array numbers
    var naturalMultipleRolls = randomDiceResults.reduce(function(a, b) {
      return a + b;
    });
    // check if drop lowest toggle is true or false
    var toggleDropLowestState = nav_toggleDropLowest.dataset.active;
    // make a lowest subtract var
    var lowestToSubtract;
    if (toggleDropLowestState == "true" && numberOfDice > 1) {
      // ser var lowestToSubtract value to the index in randomDiceResults with the lowest value
      lowestToSubtract = randomDiceResults[lowestRollIndex];
      // wrap the content in the lowest value index with a span
      randomDiceResults[lowestRollIndex] = '<span class="strike">' + randomDiceResults[lowestRollIndex] + '</span>';
    } else {
      lowestToSubtract = 0;
    };
    // add bonus to final total
    var finalResult = naturalMultipleRolls + bonusModifier - lowestToSubtract;
    // make array with spaces for history
    var randomDiceResultsWithSpaces = randomDiceResults.join(", ");
    // pass arguments to roll function
    createRollResult(numberOfDice, whichDice, bonusModifier, rollName, randomDiceResultsWithSpaces, lowestRollIndex, finalResult);
    checkListListState();
  };

  function createRollResult(numberOfDice, whichDice, bonusModifier, rollName, randomDiceResultsWithSpaces, lowestRollIndex, finalResult) {
    // make snack bar elements
    var resultItem = document.createElement("div");
    resultItem.setAttribute("class", "result-item");
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-8");
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-4");
    var p1 = document.createElement("p");
    p1.setAttribute("class", "breakdown");
    var p2 = document.createElement("p");
    p2.setAttribute("class", "total");
    p2.textContent = finalResult;
    //  if natural 1 or 20 on a single d20 roll
    if (whichDice == 20 && numberOfDice <= 1) {
      if (randomDiceResultsWithSpaces == 20) {
        p2.setAttribute("class", "total critical-20");
      } else if (randomDiceResultsWithSpaces == 1) {
        p2.setAttribute("class", "total critical-1");
      }
    };
    var span1 = document.createElement("span");
    span1.setAttribute("class", "roll-name");
    // if name is passed to function
    if (rollName) {
      span1.textContent = rollName + " ";
    };
    var span2 = document.createElement("span");
    span2.setAttribute("class", "number-of-dice");
    span2.textContent = numberOfDice + " ";
    var span3 = document.createElement("span");
    span3.setAttribute("class", "dice");
    span3.textContent = "d" + whichDice + " ";
    var span4 = document.createElement("span");
    span4.setAttribute("class", "number-of-bonus");
    // if modifier is more than 0 add a + symbol or not
    if (bonusModifier > 0) {
      span4.textContent = "+" + bonusModifier + " ";
    } else {
      span4.textContent = bonusModifier + " ";
    };
    var span5 = document.createElement("span");
    span5.setAttribute("class", "multiple-dice-results");
    span5.innerHTML = "(Rolled: " + randomDiceResultsWithSpaces + ")";
    // if name append it
    if (rollName) {
      p1.appendChild(span1);
    };
    // if number of dice is more than 1 append it
    if (numberOfDice > 1) {
      p1.appendChild(span2);
    };
    p1.appendChild(span3);
    // if bonus is not 0 append it
    if (bonusModifier != 0) {
      p1.appendChild(span4);
    };
    // if multiple dice rolls append it
    if (numberOfDice > 1 || bonusModifier != 0) {
      p1.appendChild(span5);
    };
    col1.appendChild(p1);
    col2.appendChild(p2);
    row.appendChild(col1);
    row.appendChild(col2);
    resultItem.appendChild(row);
    // append result item to history
    element_results_list.insertBefore(resultItem, element_results_list.firstChild);
    checkListListState();
  };

  // go roll
  element_goRoll.addEventListener("click", function() {
    rollCurrentFormula(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    localStoreAdd("saved-history", element_results_list);
  }, false);

  // --------------------------------------------------------------------------
  // saved formula
  // --------------------------------------------------------------------------

  // save current formula
  function saveCurrentFormula(numberOfDice, whichDice, bonusModifier, rollName) {
    var formulaNamesOfJoy = ["Aieee!", "Aiieee!", "Arrgh!", "Awk!", "Awkkkkkk!", "Bam!", "Bang!", "Bang!", "Biff!", "Bloop!", "Blurp!", "Boff!", "Bonk!", "Clank!", "Clank!", "Clash!", "Clunk!", "Clunk!", "Crraack!", "Crash!", "Crraack!", "Crunch!", "Crunch!", "Eee-yow!", "Flrbbbbb!", "Glipp!", "Glurpp!", "Kapow!", "Kayo!", "Ker-sploosh!", "Kerplop!", "Klonk!", "Klunk!", "Krunch!", "Oooff!", "Ooooff!", "Ouch!", "Ouch!", "Owww!", "Ow", "Pam!", "Plop!", "Pow!", "Powie!", "Qunckkk!", "Rakkk!", "Rip!", "Slosh!", "Sock!", "Splats!", "Splatt!", "Sploosh!", "Swaap!", "Swish!", "Swoosh!", "Thunk!", "Thwack!", "Thwacke!", "Thwape!", "Thwapp!", "Uggh!", "Urkkk!", "Vronk!", "Whack!", "Whack!", "Wham!", "Whamm!", "Whammm!", "Whap!", "Z-zwap!", "Zam!", "Zamm!", "Zammm!", "Zap!", "Zap", "Zgruppp!", "Zlonk!", "Zlopp!", "Zlott!", "Zok!", "Zowie!", "Zwapp!", "Zzwap!", "Zzzzwap!", "Zzzzzwap!", "Pepper-Pow!"];
    // if arguments are not passed
    if (numberOfDice == undefined) {
      numberOfDice = modifiers_readAmountOfDice();
    };
    if (whichDice == undefined) {
      whichDice = getRadioValue(element_diceForm, "dice-select");
    };
    if (bonusModifier == undefined) {
      bonusModifier = modifiers_readAmountOfBonus();
    };
    modifiers_readAmountOfBonus_blur();
    if (rollName == undefined) {
      rollName = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    };
    // define data attributes
    var data_rollName = rollName;
    var data_numberOfDice = numberOfDice;
    var data_whichDice = whichDice;
    var data_numberOfBonus = bonusModifier;
    // filter arguments
    if (numberOfDice <= 1) {
      numberOfDice = "";
    };
    if (bonusModifier == 0) {
      bonusModifier = "";
    };
    if (bonusModifier > 0) {
      bonusModifier = "+" + bonusModifier;
    };

    // make saved formula
    var savedFormula = document.createElement("div");
    savedFormula.setAttribute("class", "saved-formula");
    savedFormula.dataset.rollName = data_rollName;
    savedFormula.dataset.dice = data_whichDice;
    savedFormula.dataset.ammountOfDice = data_numberOfDice;
    savedFormula.dataset.ammountOfBonus = data_numberOfBonus;
    savedFormula.dataset.eventListener = false;

    var row = document.createElement("div");
    row.setAttribute("class", "row no-gutter");

    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-2 col-sm-1");

    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-4 col-sm-6 col-lg-7");

    var col3 = document.createElement("div");
    col3.setAttribute("class", "col-xs-4 col-lg-3");

    var col4 = document.createElement("div");
    col4.setAttribute("class", "col-xs-2 col-sm-1");

    var inputName = document.createElement("input");
    inputName.setAttribute("class", "name");
    inputName.setAttribute("tabindex", "4");
    inputName.setAttribute("placeholder", "Name?");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("value", rollName);

    var savedFormulaRecord = document.createElement("div");
    savedFormulaRecord.setAttribute("class", "formula");

    var savedFormulaClear = document.createElement("div");
    savedFormulaClear.setAttribute("class", "clear");

    var savedFormulaRoll = document.createElement("div");
    savedFormulaRoll.setAttribute("class", "roll");

    var savedFormulaRecordPara = document.createElement("p");

    var savedFormulaNumberOfDice = document.createElement("span");
    savedFormulaNumberOfDice.setAttribute("class", "number-of-dice");
    savedFormulaNumberOfDice.textContent = numberOfDice + " ";

    var savedFormulaDice = document.createElement("span");
    savedFormulaDice.setAttribute("class", "dice");
    savedFormulaDice.textContent = "d" + whichDice + " ";

    var savedFormulaNumberOfBonus = document.createElement("span");
    savedFormulaNumberOfBonus.setAttribute("class", "number-of-bonus");
    savedFormulaNumberOfBonus.textContent = bonusModifier;

    var savedFormulaClearButton = document.createElement("button");
    savedFormulaClearButton.setAttribute("class", "button button-dark button-block");

    var savedFormulaRollButton = document.createElement("button");
    savedFormulaRollButton.setAttribute("class", "button button-primary button-block");

    var savedFormulaIconClear = document.createElement("span");
    savedFormulaIconClear.setAttribute("class", "icon-close");

    var savedFormulaIconRoll = document.createElement("span");
    savedFormulaIconRoll.setAttribute("class", "icon-chevron-right");

    savedFormulaClearButton.appendChild(savedFormulaIconClear);
    savedFormulaRollButton.appendChild(savedFormulaIconRoll);
    savedFormulaRecordPara.appendChild(savedFormulaNumberOfDice);
    savedFormulaRecordPara.appendChild(savedFormulaDice);
    savedFormulaRecordPara.appendChild(savedFormulaNumberOfBonus);
    savedFormulaRecord.appendChild(savedFormulaRecordPara);
    savedFormulaRoll.appendChild(savedFormulaRollButton);
    savedFormulaClear.appendChild(savedFormulaClearButton);
    col1.appendChild(savedFormulaClear);
    col2.appendChild(inputName);
    col3.appendChild(savedFormulaRecord);
    col4.appendChild(savedFormulaRoll);
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    savedFormula.appendChild(row);

    // append saved formula to formula list
    element_formulas_list.insertBefore(savedFormula, element_formulas_list.firstChild);
    addListenerTo_savedFormulas();
  };

  controls_saveCurrentFormula.addEventListener("click", function() {
    saveCurrentFormula(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    localStoreAdd("saved-formulas", element_formulas_list);
    checkListListState();
    createSnackBar("Formula saved.", false, false);
  }, false);

  // add listeners to saved formula buttons and inputs
  function addListenerTo_savedFormulas() {
    var formula_savedFormula = eA(".saved-formula");
    var formula_savedFormula_roll = eA(".saved-formula .roll .button");
    var formula_savedFormula_clear = eA(".saved-formula .clear .button");
    var formula_savedFormula_name = eA(".saved-formula .name");
    var formula_savedFormula_formula = eA(".saved-formula .formula");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      if (formula_savedFormula[i].dataset.eventListener == "false") {
        formula_savedFormula_roll[i].addEventListener("click", function() {
          rollSavedFormula(this);
          localStoreAdd("saved-history", element_results_list);
        }, false);
        formula_savedFormula_clear[i].addEventListener("click", function() {
          clearSavedFormula(this);
          localStoreAdd("saved-formulas", element_formulas_list);
          checkListListState();
        }, false);
        formula_savedFormula_name[i].addEventListener("input", function() {
          storeInputName(this);
          localStoreAdd("saved-formulas", element_formulas_list);
        }, false);
        formula_savedFormula_name[i].addEventListener("keypress", function() {
          dropFocusOnEnter(this);
        }, false);
        formula_savedFormula[i].dataset.eventListener = "true";
      };
    };
  };

  // reset data attributes on page reload
  // this is needed after saved formulas are populated from local storage 
  function update_formula_savedFormula() {
    var formula_savedFormula = eA(".saved-formula");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula[i].dataset.eventListener = "false";
    };
  };

  // roll saved formula
  function rollSavedFormula(element) {
    var savedFormula = getClosest(element, ".saved-formula");
    var readSaved_name = savedFormula.dataset.rollName;
    var readSaved_amountOfDice = parseInt(savedFormula.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(savedFormula.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(savedFormula.dataset.ammountOfBonus, 10);
    rollCurrentFormula(readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
  };

  // remove saved formula
  function clearSavedFormula(element) {
    var savedFormula = getClosest(element, ".saved-formula");
    var readSaved_name = savedFormula.dataset.rollName;
    var readSaved_amountOfDice = parseInt(savedFormula.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(savedFormula.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(savedFormula.dataset.ammountOfBonus, 10);
    savedFormula.remove();
    localStoreAdd("saved-formulas", element_formulas_list);
    var timestamp = Date.now();
    // make snack bar with deleted formula
    if (!readSaved_name) {
      readSaved_name = "nameless formula";
    };
    createSnackBar("Cleared " + readSaved_name + ".", false, true, readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
  };

  // move saved formula up or down
  function savedFormula_moveUpDown(element) {
    var node = getClosest(element, ".saved-formula");
    var nodesParent = getClosest(element, ".list");
    // if element has move up class
    if (element.classList.contains("move-up")) {
      var nodesPreviousSibling = node.previousSibling;
      addClass(node, "moving-up");
      addClass(node.previousSibling, "moving-down");
      var moveSavedFormulas = function() {
        removeClass(node.previousSibling, "moving-down");
        removeClass(node, "moving-up");
        nodesParent.insertBefore(node, nodesPreviousSibling);
        localStoreAdd("saved-formulas", element_formulas_list);
      };
      delayFunction(moveSavedFormulas, 300);
    } else if (element.classList.contains("move-down")) {
      var nodesNextSibling = node.nextSibling.nextSibling;
      addClass(node.nextSibling, "moving-up");
      addClass(node, "moving-down");
      var moveSavedFormulas = function() {
        removeClass(node.nextSibling, "moving-up");
        removeClass(node, "moving-down");
        nodesParent.insertBefore(node, nodesNextSibling);
        localStoreAdd("saved-formulas", element_formulas_list);
      };
      delayFunction(moveSavedFormulas, 300);
    };
  };

  // --------------------------------------------------------------------------
  // results
  // --------------------------------------------------------------------------

  function expandCollapseResults() {
    var element_results_expandResults_icon = element_results_expandResults.querySelector("span");
    var element_results_expandResults_text = element_results_expandResults.querySelector(".text");
    if (element_results_list.firstChild) {
      if (element_results.classList.contains("fullsize")) {
        removeClass(element_results, "fullsize");
        removeClass(element_results_expandResults, "active");
        element_results_expandResults_text.textContent = "Expand";
        addClass(element_results_expandResults_icon, "icon-unfold-more");
        removeClass(element_results_expandResults_icon, "icon-unfold-less");
        removeClass(nav, "bright");
      } else {
        addClass(element_results, "fullsize");
        addClass(element_results_expandResults, "active");
        element_results_expandResults_text.textContent = "Collapse";
        removeClass(element_results_expandResults_icon, "icon-unfold-more");
        addClass(element_results_expandResults_icon, "icon-unfold-less");
        addClass(nav, "bright");
      };
    };
  };

  function clearResults() {
    var element_results_expandResults_icon = element_results_expandResults.querySelector("span");
    var element_results_expandResults_text = element_results_expandResults.querySelector(".text");
    removeClass(element_results, "fullsize");
    if (element_results_expandResults.classList.contains("active")) {
      removeClass(element_results_expandResults, "active");
      element_results_expandResults_text.textContent = "Expand";
      addClass(element_results_expandResults_icon, "icon-unfold-more");
      removeClass(element_results_expandResults_icon, "icon-unfold-less");
    };
    if (nav.classList.contains("bright")) {
      removeClass(nav, "bright");
    };
    element_results_list.innerHTML = "";
    expandCollapseResults();
    checkListListState();
    localStoreAdd("saved-history", element_results_list);
  };

  element_results_expandResults.addEventListener("click", function() {
    expandCollapseResults();
  }, false);

  element_results_clearResults.addEventListener("click", function() {
    createPrompt("Are you sure?", "Roll history will be cleared. This can not be undone.", "clear roll history");
  }, false);

  // --------------------------------------------------------------------------
  // results
  // --------------------------------------------------------------------------

  // make list active when it has content
  function checkListListState() {
    if (element_results_list.firstChild) {
      element_results.classList.add("active");
    } else {
      element_results.classList.remove("active");
    };
    if (element_formulas_list.firstChild) {
      element_formulas.classList.add("active");
    } else {
      element_formulas.classList.remove("active");
    };
  };

  // --------------------------------------------------------------------------
  // snack bar
  // --------------------------------------------------------------------------

  function createSnackBar(message, close, undo, numberOfDice, whichDice, bonusModifier, rollName) {
    var element_snackBars = e(".snacks .snack-bars");
    // make snack bar elements
    var snackBar = document.createElement("div");
    snackBar.setAttribute("class", "snack-bar");
    snackBar.setAttribute("data-roll-name", rollName);
    snackBar.setAttribute("data-ammount-of-dice", numberOfDice);
    snackBar.setAttribute("data-dice", whichDice);
    snackBar.setAttribute("data-ammount-of-bonus", bonusModifier);
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-7");
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-5");
    var snackClose = document.createElement("button");
    snackClose.setAttribute("class", "button button-dark button-small snack-clear");
    var snackUndo = document.createElement("button");
    snackUndo.setAttribute("class", "button button-dark button-small snack-undo");
    snackUndo.textContent = "Undo";
    var iconClose = document.createElement("span");
    iconClose.setAttribute("class", "icon-close");
    var snackMessage = document.createElement("p");
    snackMessage.setAttribute("class", "snack-message");
    snackMessage.textContent = message;
    snackClose.appendChild(iconClose);
    // connect elements
    if (close) {
      col2.appendChild(snackClose);
    };
    if (undo) {
      col2.appendChild(snackUndo);
    };
    col1.appendChild(snackMessage);
    row.appendChild(col1);
    row.appendChild(col2);
    // container.appendChild(row);
    snackBar.appendChild(row);
    // mark current snack bars for removal
    var allSnackBars = element_snackBars.querySelectorAll(".snack-bar");
    for (var i = 0; i < allSnackBars.length; i++) {
      var snackBarToRemove = allSnackBars[i];

      function removeReveal() {
        removeClass(snackBarToRemove, "reveal");
      };
      delayFunction(removeReveal, 100);

      function deleteSnackBar() {
        snackBarToRemove.remove();
      };
      delayFunction(deleteSnackBar, 400);
    };
    // append snack bar
    element_snackBars.appendChild(snackBar);
    // add listners
    addListenerTo_snackBar(snackBar);
    // reveal snack bar
    var revealSnackBar = function() {
      addClass(snackBar, "reveal");
    };
    delayFunction(revealSnackBar, 10);
    // auto clear snack bar
    var autoClearSnackBar = function() {
      // if the snack bar hasn't been dismised or undone
      if (snackBar) {
        // console.log("clearing");
        clearSnackBar(snackBar);
      };
    };
    delayFunction(autoClearSnackBar, 5000);
  };

  // add listeners to snack bar buttons
  function addListenerTo_snackBar(element) {
    var formula_savedFormula = getClosest(element, ".snack-bar");
    var formula_savedFormula_clear = formula_savedFormula.querySelector(".snack-clear");
    var formula_savedFormula_undo = formula_savedFormula.querySelector(".snack-undo");
    // add listner to clear
    if (formula_savedFormula_clear) {
      formula_savedFormula_clear.addEventListener("click", function() {
        clearSnackBar(this);
      }, false);
    };
    // add listner to undo
    if (formula_savedFormula_undo) {
      formula_savedFormula_undo.addEventListener("click", function() {
        undoSnackBar(this);
        localStoreAdd("saved-formulas", element_formulas_list);
        checkListListState();
      }, false);
    };
  };

  // snack bar undo
  function undoSnackBar(element) {
    var snackBar = getClosest(element, ".snack-bar");
    var readSaved_name = snackBar.dataset.rollName;
    var readSaved_amountOfDice = parseInt(snackBar.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(snackBar.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(snackBar.dataset.ammountOfBonus, 10);
    if (readSaved_name == "nameless formula") {
      readSaved_name = "";
    };
    saveCurrentFormula(readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
    clearSnackBar(element);
  };

  // snack bar clear
  function clearSnackBar(element) {
    if (element) {
      var snackBar = getClosest(element, ".snack-bar");
    } else {
      var snackBar = e(".snack-bar");
    };
    if (snackBar) {
      function removeReveal() {
        removeClass(snackBar, "reveal");
      };
      delayFunction(removeReveal, 10);

      function deleteSnackBar() {
        snackBar.remove();
      };
      delayFunction(deleteSnackBar, 500);
    };
  };

  // --------------------------------------------------------------------------
  // prompt
  // --------------------------------------------------------------------------

  function createPrompt(heading, message, confirmAction) {
    var body = e("body");
    // make prmpt elements
    var promptShade = document.createElement("div");
    promptShade.setAttribute("class", "prompt prompt-shade");
    var prompt = document.createElement("div");
    prompt.setAttribute("class", "prompt prompt-modal");
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var row1 = document.createElement("div");
    row1.setAttribute("class", "row");
    var row2 = document.createElement("div");
    row2.setAttribute("class", "row");
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-12");
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-6");
    var col3 = document.createElement("div");
    col3.setAttribute("class", "col-xs-6");
    var promptMessage = document.createElement("div");
    promptMessage.setAttribute("class", "prompt-message");
    var promptHeading = document.createElement("h1");
    promptHeading.textContent = heading;
    var promptPara = document.createElement("p");
    promptPara.textContent = message;
    var promptAction = document.createElement("button");
    promptAction.setAttribute("class", "button button-primary button-block prompt-action");
    promptAction.textContent = "OK";
    var promptCencel = document.createElement("button");
    promptCencel.setAttribute("class", "button button-secondary button-block prompt-cancel");
    promptCencel.textContent = "Cancel";
    // connect elements
    promptMessage.appendChild(promptHeading);
    promptMessage.appendChild(promptPara);
    col1.appendChild(promptMessage);
    col2.appendChild(promptCencel);
    col3.appendChild(promptAction);
    row1.appendChild(col1);
    row2.appendChild(col2);
    row2.appendChild(col3);
    container.appendChild(row1);
    container.appendChild(row2);
    prompt.appendChild(container);
    // append prompt and shade
    if (!body.querySelector(".prompt.prompt-shade") && !body.querySelector(".prompt.prompt-modal")) {
      body.appendChild(promptShade);
      body.appendChild(prompt);

      function revealPrompt() {
        addClass(prompt, "reveal");
        addClass(promptShade, "reveal");
      };
      delayFunction(revealPrompt, 10);
      addListenerTo_prompt(confirmAction);
    };
  };

  function addListenerTo_prompt(confirmAction) {
    var promptShade = e(".prompt-shade");
    var promptModal = e(".prompt-modal");
    var promptAction = e(".prompt-modal .prompt-action");
    var promptCancel = e(".prompt-modal .prompt-cancel");

    promptShade.addEventListener('click', function() {
      removePrompt();
    }, false);

    promptCancel.addEventListener('click', function() {
      removePrompt();
    }, false);

    promptAction.addEventListener('click', function() {
      if (confirmAction == "clear all") {
        clearLostD20();
        createSnackBar("All cleared.", false, false);
      };
      if (confirmAction == "clear roll history") {
        clearResults();
        removePrompt();
        createSnackBar("Roll history cleared.", false, false);
      };
    }, false);

  //   window.addEventListener("keydown", function(event) {
  //     promptEnter(event, confirmAction);
  //     removeEventListener('click', promptEnter, false);
  //   }, false);

  };

  // var promptEnter = function(event, confirmAction) {
  //   var promptShade = e(".prompt-shade");
  //   var promptModal = e(".prompt-modal");
  //   if (promptShade && promptModal) {
  //     if (event.keyCode == 13) {
  //       if (confirmAction == "clear all") {
  //         clearLostD20();
  //         createSnackBar("All cleared.", true, false);
  //       };
  //       if (confirmAction == "clear roll history") {
  //         clearResults();
  //         removePrompt();
  //         createSnackBar("Roll history cleared.", true, false);
  //       };
  //     };
  //   };
  // };

  function removePrompt() {
    var promptShade = e(".prompt-shade");
    var promptModal = e(".prompt-modal");
    var promptCancel = e(".prompt-modal .prompt-cancel");
    if (promptShade && promptModal) {
      promptShade.style.opacity = 0;
      promptModal.style.opacity = 0;

      function fadeRemovePrompt() {
        promptShade.remove();
        promptModal.remove();
      }
      delayFunction(fadeRemovePrompt, 500);
    };
  };

  function clearLostD20() {
    localStorage.clear();
    element_formulas_list.innerHTML = "";
    e("#d20").checked = true;
    controls_numberOfDice_input.value = 1;
    controls_numberOfBonus_input.value = 0;
    modifiers_readAmountOfDice();
    modifiers_readAmountOfDice_blur();
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfBonus_blur();
    clearResults();
    expandCollapseResults();
    checkListListState();
    removePrompt();
  };

  // --------------------------------------------------------------------------
  // escape
  // --------------------------------------------------------------------------

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 27) {
      removePrompt();
      clearSnackBar();
    };
  }, false);

  // --------------------------------------------------------------------------
  // run on page load
  // --------------------------------------------------------------------------

  modifiers_readAmountOfBonus();
  modifiers_readAmountOfDice();
  addListenerTo_element_diceForm_label();
  getRadioValue(element_diceForm, "dice-select");
  makeSelectedRadioActive(element_diceForm, "dice-select");
  localStoreRead("saved-formulas", element_formulas_list);
  localStoreRead("saved-history", element_results_list);
  update_formula_savedFormula();
  addListenerTo_savedFormulas();
  checkListListState();
  modifiers_readAmountOfBonus_blur();

})();
