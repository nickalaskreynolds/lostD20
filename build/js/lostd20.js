function diceRollerama() {

  // elements
  var element_columnControls = e(".controls");
  var element_columnResults = e(".results");
  var element_columnFormulas = e(".formulas");
  var element_diceForm = e(".dice-form");
  var element_diceForm_label = eA(".dice-form label");
  var element_goRoll = e(".go-roll");
  var element_formulas_list = e(".formulas .list");
  var element_currentDice = e(".current-dice span");
  // var element_results = e(".results");
  var element_results_list = e(".results .list");
  var element_savedFormulas_list = e(".saved-formulas .list");
  var element_results_toggleFullscreen = e(".results .toggle-fullscreen");
  var element_results_clearResults = e(".results .clear-results");
  // controls
  var controls_numberOfDiceSides_value;

  var controls_numberOfBonus = e(".controls .number-of-bonus");
  var controls_numberOfBonus_input = e(".controls .number-of-bonus input");
  var controls_numberOfBonus_input_value
  var controls_numberOfBonus_clear = e(".controls .input-controls-bonus .clear");
  var controls_numberOfBonus_plusOne = e(".controls .input-controls-bonus .plus-one");
  var controls_numberOfBonus_minusOne = e(".controls .input-controls-bonus .minus-one");

  var controls_numberOfDice = e(".controls .number-of-dice");
  var controls_numberOfDice_input = e(".controls .number-of-dice input");
  var controls_numberOfDice_input_value
  var controls_numberOfDice_clear = e(".controls .input-controls-dice .clear");
  var controls_numberOfDice_plusOne = e(".controls .input-controls-dice .plus-one");
  var controls_numberOfDice_minusOne = e(".controls .input-controls-dice .minus-one");

  var controls_saveCurrentFormula = e(".controls .save-current-formula");

  // utilities
  var nav_toggleDropLowest = e("nav .toggle-drop-lowest");
  var nav_toggleDropLowest_icon = e("nav .toggle-drop-lowest span");
  var nav_toggleFullscreen = e("nav .toggle-fullscreen");
  var nav_toggleFullscreen_icon = e("nav .toggle-fullscreen span");
  var nav_clearAll = e("nav .clear-all");

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
  // nav
  // --------------------------------------------------------------------------

  var nav = e("nav");
  var navList = e(".nav-list");
  var navToggle = e(".nav-toggle");

  navToggle.addEventListener("click", function() {
    toggleClass(nav, "open");
  }, false);

  window.addEventListener('click', function(event) {
    if (nav.classList.contains("open")) {
      if (event.target != nav && event.target.parentNode != nav && event.target.parentNode.parentNode != nav && event.target.parentNode.parentNode.parentNode != nav) {
        removeClass(nav, "open");
      };
    };
  });

  // --------------------------------------------------------------------------
  // dice form
  // --------------------------------------------------------------------------

  // get checked radio val 
  function getRadioValue(form, radioGroupName) {
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // radio checked?
        controls_numberOfDiceSides_value = radios[i].value; // if so, hold its value in controls_numberOfDiceSides_value
      };
    };
    return controls_numberOfDiceSides_value;
  };

  // dice active state 
  function makeSelectedRadioActive(form, radioGroupName) {
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
  function dropFocusOnEnter() {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      this.blur();
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

  controls_numberOfBonus_input.addEventListener("keypress", dropFocusOnEnter, false);

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

  controls_numberOfDice_input.addEventListener("keypress", dropFocusOnEnter, false);

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
    var multipleDiceResults = [];
    // populate array with natural rolls
    for (var i = 0; i < numberOfDice; i++) {
      multipleDiceResults.push(Math.floor(Math.random() * whichDice) + 1)
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
    indexOfSmallestValue(multipleDiceResults);
    // sum all array numbers
    var naturalMultipleRolls = multipleDiceResults.reduce(function(a, b) {
      return a + b;
    });
    // check if drop lowest toggle is true or false
    var toggleDropLowestState = nav_toggleDropLowest.dataset.active;
    // make a subtract var
    var lowestToSubtract;
    if (toggleDropLowestState == "true" && numberOfDice > 1) {
      // ser var lowestToSubtract value to the index in multipleDiceResults with the lowest value
      lowestToSubtract = multipleDiceResults[lowestRollIndex];
      // wrap the content in the lowest value index with a span
      multipleDiceResults[lowestRollIndex] = '<span class="strike">' + multipleDiceResults[lowestRollIndex] + '</span>';
    } else {
      lowestToSubtract = 0;
    };
    // add bonus to final total
    var finalResult = naturalMultipleRolls + bonusModifier - lowestToSubtract;
    // make array with spaces for history
    var multipleDiceResultsWithSpaces = multipleDiceResults.join(", ");
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
    if (!rollName) {
      rollName = "";
    };
    // if 20 or 1 is rolled on a d20 add class names to dice clicker and history <p>
    var critical20Or1;
    if (whichDice == 20 && numberOfDice <= 1) {
      if (naturalMultipleRolls == 20) {
        // if natural 20
        critical20Or1 = " critical-20";
      } else if (naturalMultipleRolls == 1) {
        // if natural 1
        critical20Or1 = " critical-1";
      } else {
        critical20Or1 = "";
      }
    } else {
      critical20Or1 = "";
    };
    // print results to history
    element_results_list.innerHTML =
      '<div class="result-item">' +
      '<div class="row">' +
      '<div class="col-xs-8">' +
      '<p class="breakdown">' +
      '<span class="save-roll-name">' + rollName + '</span>' +
      ' <span class="number-of-dice">' + numberOfDice + '</span>' +
      ' <span class="dice">d' + whichDice + '</span>' +
      ' <span class="number-of-bonus">' + bonusModifier + '</span>' +
      ' <span class="multiple-dice-results">(Rolled: ' + multipleDiceResultsWithSpaces + ')</span>' +
      '</p>' +
      '</div>' +
      '<div class="col-xs-4">' +
      '<p class="total' + critical20Or1 + '">' + finalResult + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' + element_results_list.innerHTML;

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
    var data_numberOfDice = numberOfDice;
    var data_whichDice = whichDice;
    var data_bonusModifier = bonusModifier;
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
    // write saved roll
    var writeSavedRoll = function() {
      element_formulas_list.innerHTML =
        '<div class="saved-formula" data-roll-name="' + rollName + '" data-ammount-of-dice="' + data_numberOfDice + '" data-dice="' + data_whichDice + '" data-ammount-of-bonus="' + data_bonusModifier + '">' +
        '<div class="row no-gutter">' +
        '<div class="col-xs-8 col-sm-5">' +
        '<input type="text" placeholder="Who am I?" value="' + rollName + '" class="name" tabindex="4">' +
        '</div>' +
        '<div class="col-xs-4 col-sm-3">' +
        '<p class="formula"><span class="number-of-dice">' + numberOfDice + '</span> <span class="dice">d' + whichDice + '</span> <span class="number-of-bonus">' + bonusModifier + '</span></p>' +
        '</div>' +
        '<div class="col-xs-2 col-sm-1">' +
        '<a href="javascript:void(0)" class="button button-dark button-block clear" tabindex="4"><span class="icon-close"></span></a>' +
        '</div>' +
        '<div class="col-xs-2 col-sm-1">' +
        '<a href="javascript:void(0)" class="button button-dark button-block move-up" tabindex="4"><span class="icon-expand-less"></span></a>' +
        '</div>' +
        '<div class="col-xs-2 col-sm-1">' +
        '<a href="javascript:void(0)" class="button button-dark button-block move-down" tabindex="4"><span class="icon-expand-more"></span></a>' +
        '</div>' +
        '<div class="col-xs-2 col-xs-offset-4 col-sm-1 col-sm-offset-0">' +
        '<a href="javascript:void(0)" class="button button-primary button-block roll" tabindex="4"><span class="icon-chevron-right"></span></a>' +
        '</div>' +
        '</div>' +
        '</div>' + element_formulas_list.innerHTML

    };
    writeSavedRoll();
    addListenerTo_savedFormulas();
    // addClass(document.querySelector(".saved-formula"), "flash-dark");
    // var removeFlash = function() {
    //   removeClass(document.querySelector(".saved-formula"), "flash-dark");
    // };
    // delayFunction(removeFlash, 1000);
  };

  controls_saveCurrentFormula.addEventListener("click", function() {
    saveCurrentFormula(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    localStoreAdd("saved-formulas", element_formulas_list);
    checkListListState();
  }, false);

  // add listeners to saved formula buttons and inputs
  function addListenerTo_savedFormulas() {
    var formula_savedFormula = eA(".saved-formula");
    var formula_savedFormula_roll = eA(".saved-formula .roll");
    var formula_savedFormula_moveUp = eA(".saved-formula .move-up");
    var formula_savedFormula_moveDown = eA(".saved-formula .move-down");
    var formula_savedFormula_clear = eA(".saved-formula .clear");
    var formula_savedFormula_name = eA(".saved-formula .name");

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_roll[i].addEventListener("click", function() {
        rollSavedFormula(this);
        localStoreAdd("saved-history", element_results_list);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_moveUp[i].addEventListener("click", function() {
        savedFormula_moveUpDown(this);
        localStoreAdd("saved-formulas", element_formulas_list);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_moveDown[i].addEventListener("click", function() {
        savedFormula_moveUpDown(this);
        localStoreAdd("saved-formulas", element_formulas_list);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_clear[i].addEventListener("click", function() {
        clearSavedFormula(this);
        localStoreAdd("saved-formulas", element_formulas_list);
        checkListListState();
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_name[i].addEventListener("click", function() {
        this.select();
      });
      formula_savedFormula_name[i].addEventListener("input", function() {
        // take input value and add it to the input node value attribute
        storeInputName(this);
        localStoreAdd("saved-formulas", element_formulas_list);
      }, false);
      formula_savedFormula_name[i].addEventListener("keypress", dropFocusOnEnter, false);
    };

  };

  // roll saved formula
  function rollSavedFormula(element) {
    var savedFormula = getClosest(element, ".saved-formula");
    var readSaved_name = savedFormula.dataset.rollName;
    var readSaved_amountOfDice = parseInt(savedFormula.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(savedFormula.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(savedFormula.dataset.ammountOfBonus, 10);
    e("#d" + readSaved_diceSides).checked = true;
    controls_numberOfDice_input.value = readSaved_amountOfDice;
    controls_numberOfBonus_input.value = readSaved_amountOfBonus;
    modifiers_readAmountOfBonus_blur();
    makeSelectedRadioActive(element_diceForm, "dice-select");
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
    createSnackBar(readSaved_name + " removed.", false, true, readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
  };

  // move saved formula up or down
  function savedFormula_moveUpDown(element) {
    var node = getClosest(element, ".saved-formula");
    var nodesParent = getClosest(element, ".list");
    // var nodesPreviousSibling = node.previousSibling;
    // var nodesNextSibling = node.nextSibling;
    // console.log("node = ");
    // console.log(node);
    // console.log("nodesParent = ");
    // console.log(nodesParent);
    // console.log("nodesPreviousSibling = ");
    // console.log(nodesPreviousSibling);
    // console.log("nodesNextSibling = ");
    // console.log(nodesNextSibling);
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
      delayFunction(moveSavedFormulas, 500);
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
      delayFunction(moveSavedFormulas, 500);
    };
  };

  // --------------------------------------------------------------------------
  // results
  // --------------------------------------------------------------------------

  function results_toggleFullScreen(element) {
    var text = element.querySelector(".text");
    var icon = element.querySelector("span");
    if (text.textContent == "Expand") {
      text.textContent = "Collapse";
    } else {
      text.textContent = "Expand";
    };
    toggleClass(icon, "icon-unfold-more");
    toggleClass(icon, "icon-unfold-less");
    toggleClass(element_columnResults, "fullsize");
    toggleClass(element, "active");
  };

  function clearResults() {
    removeClass(element_columnResults, "active");
    removeClass(element_columnResults, "fullsize");
    element_results_list.innerHTML = "";
    localStoreAdd("saved-history", element_results_list);
  };

  element_results_toggleFullscreen.addEventListener("click", function() {
    results_toggleFullScreen(this);
  }, false);

  element_results_clearResults.addEventListener("click", function() {
    clearResults();
  }, false);

  // --------------------------------------------------------------------------
  // snack bar
  // --------------------------------------------------------------------------

  // snack bar clear
  function clearSnackBar(element) {
    var snackBar = getClosest(element, ".snack-bar");
    var removeReveal = function() {
      removeClass(snackBar, "reveal");
    };
    delayFunction(removeReveal, 10);
    var deleteSnackBar = function() {
      snackBar.remove();
    };
    delayFunction(deleteSnackBar, 500);
  };

  function createSnackBar(message, close, undo, numberOfDice, whichDice, bonusModifier, rollName) {
    var element_snacks = e(".snacks");
    // make snack bar elements
    var snackBar = document.createElement("div");
    snackBar.setAttribute("class", "snack-bar");
    snackBar.setAttribute("data-roll-name", rollName);
    snackBar.setAttribute("data-ammount-of-dice", numberOfDice);
    snackBar.setAttribute("data-dice", whichDice);
    snackBar.setAttribute("data-ammount-of-bonus", bonusModifier);
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-10");
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-2");
    var snackClose = document.createElement("a");
    snackClose.setAttribute("href", "javascript:void(0)");
    snackClose.setAttribute("class", "button button-dark button-small clear");
    var snackUndo = document.createElement("a");
    snackUndo.setAttribute("href", "javascript:void(0)");
    snackUndo.setAttribute("class", "button button-dark button-block button-small undo");
    snackUndo.textContent = "Undo";
    var iconClose = document.createElement("span");
    iconClose.setAttribute("class", "icon-close");
    var snackMessage = document.createElement("p");
    snackMessage.setAttribute("class", "message");
    snackMessage.textContent = message;
    snackClose.appendChild(iconClose);
    // connect elements
    if (close) {
      col1.appendChild(snackClose);
    };
    col1.appendChild(snackMessage);
    if (undo) {
      col2.appendChild(snackUndo);
    };
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col2);
    container.appendChild(row);
    snackBar.appendChild(container);
    // append snack bar
    element_snacks.appendChild(snackBar);
    addListenerTo_snackBar(snackBar);
    // newSnackBar.addEventListener("mouseover", function() {
    //   clearTimeout(delayFunction);
    // }, false);
    // reveal snack bar
    var revealSnackBar = function() {
      addClass(snackBar, "reveal");
    };
    delayFunction(revealSnackBar, 10);
    // auto clear snack bar
    var autoClearSnackBar = function() {
      // if the snack bar hasn't been dismised or undone
      if (snackBar) {
        clearSnackBar(snackBar);
      };
    };
    delayFunction(autoClearSnackBar, 4000);
  };

  // snack bar undo
  function undoSnackBar(element) {
    var snackBar = getClosest(element, ".snack-bar");
    var readSaved_name = snackBar.dataset.rollName;
    var readSaved_amountOfDice = parseInt(snackBar.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(snackBar.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(snackBar.dataset.ammountOfBonus, 10);
    saveCurrentFormula(readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
    clearSnackBar(element);
  };

  // add listeners to snack bar buttons
  function addListenerTo_snackBar(element) {
    var formula_savedFormula = getClosest(element, ".snack-bar");
    var formula_savedFormula_clear = formula_savedFormula.querySelector(".clear");
    var formula_savedFormula_undo = formula_savedFormula.querySelector(".undo");
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

  // --------------------------------------------------------------------------
  // results
  // --------------------------------------------------------------------------

  // make list active when it has content
  function checkListListState() {
    if (element_results_list.firstChild) {
      element_columnResults.classList.add("active");
    } else {
      element_columnResults.classList.remove("active");
    };
    if (element_savedFormulas_list.firstChild) {
      element_savedFormulas_list.classList.add("active");
    } else {
      element_savedFormulas_list.classList.remove("active");
    };
  };

  // --------------------------------------------------------------------------
  // local store
  // --------------------------------------------------------------------------

  // local storage add
  function localStoreAdd(key, data) {
    if (localStorage.getItem) {
      localStorage.setItem(key, data.innerHTML);
      // console.log("added " + key + " + " + data);
    };
  };

  // local storage read
  function localStoreRead(key, data) {
    if (localStorage.getItem(key) == "") {
      localStorage.removeItem(key);
      // console.log(key + " was deleted");
    } else if (localStorage.getItem(key)) {
      data.innerHTML = localStorage.getItem(key);
      // console.log("read and displayed " + key + " + " + data);
    };
  };

  // --------------------------------------------------------------------------
  // nav
  // --------------------------------------------------------------------------

  // toggle drop lowest
  function toggleDropLowest() {
    toggleClass(nav_toggleDropLowest, "active");
    toggleClass(nav_toggleDropLowest_icon, "icon-check-box-checked");
    toggleClass(nav_toggleDropLowest_icon, "icon-check-box-unchecked");
    var readDataSet = nav_toggleDropLowest.dataset.active;
    if (readDataSet == "false") {
      nav_toggleDropLowest.dataset.active = "true";
    } else if (readDataSet == "true") {
      nav_toggleDropLowest.dataset.active = "false";
    };
  };

  // utilities
  nav_toggleDropLowest.addEventListener("click", function() {
    toggleDropLowest();
  }, false);

  nav_toggleFullscreen.addEventListener("click", function() {
    toggleFullScreen();
  }, false);

  // toggle fullscreen
  function toggleFullScreen() {
    var root = window.document;
    var rootElement = root.documentElement;
    var requestFullScreen = rootElement.requestFullscreen || rootElement.mozRequestFullScreen || rootElement.webkitRequestFullScreen || rootElement.msRequestFullscreen;
    var cancelFullScreen = root.exitFullscreen || root.mozCancelFullScreen || root.webkitExitFullscreen || root.msExitFullscreen;
    if (!root.fullscreenElement && !root.mozFullScreenElement && !root.webkitFullscreenElement && !root.msFullscreenElement) {
      requestFullScreen.call(rootElement);
      toggleClass(nav_toggleFullscreen, "active");
      toggleClass(nav_toggleFullscreen_icon, "icon-fullscreen-exit");
      toggleClass(nav_toggleFullscreen_icon, "icon-fullscreen");
    } else {
      cancelFullScreen.call(root);
      toggleClass(nav_toggleFullscreen, "active");
      toggleClass(nav_toggleFullscreen_icon, "icon-fullscreen-exit");
      toggleClass(nav_toggleFullscreen_icon, "icon-fullscreen");
    }
  };

  nav_clearAll.addEventListener("click", function() {
    clearLostD20();
  }, false);

  function clearLostD20() {
    var promptClearLostD20 = document.createElement("div");
    promptClearLostD20.setAttribute("class", "prompt prompt-clear-awesome-sheet");
    var promptShade = document.createElement("div");
    promptShade.setAttribute("class", "prompt prompt-shade");
    var body = e("body");
    var promptContents =
      '<div class="container">' +
      '<div class="row">' +
      '<div class="col-xs-12">' +
      '<h1>Are you sure?</h1>' +
      '<p>This can not be undone.</p>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-xs-6 col-md-5">' +
      '<a href="javascript:void(0)" class="clear-sheet-cancel button button-secondary button-block">Cancel</a>' +
      '</div>' +
      '<div class="col-xs-6 col-md-5 col-md-offset-2">' +
      '<a href="javascript:void(0)" class="clear-sheet-confirm button button-primary button-block">Clear Sheet</a>' +
      '</div>' +
      '</div>' +
      '</div>';
    promptClearLostD20.innerHTML = promptContents;
    if (!body.querySelector(".prompt-clear-awesome-sheet")) {
      body.appendChild(promptShade);
      body.appendChild(promptClearLostD20);

      function fadeIn() {
        promptClearLostD20.style.opacity = 1;
        promptShade.style.opacity = 1;
      }
      delayFunction(fadeIn, 100);
    };
    var clearSheetCancel = promptClearLostD20.querySelector(".clear-sheet-cancel");
    var clearSheetConfirm = promptClearLostD20.querySelector(".clear-sheet-confirm");
    clearSheetConfirm.addEventListener("click", function() {
      localStorage.clear();
      document.location.reload(true);
    }, false);
    clearSheetCancel.addEventListener("click", function() {
      promptShade.style.opacity = 0;
      promptClearLostD20.style.opacity = 0;

      function removePrompt() {
        promptShade.remove();
        promptClearLostD20.remove();
      }
      delayFunction(removePrompt, 500);
    }, false);
    addListenerTo_promptClearLostD20();
    removeClass(nav, "open");
  };

  function addListenerTo_promptClearLostD20() {
    var promptShade = e(".prompt-shade");
    var promptClearLostD20 = e(".prompt-clear-awesome-sheet");
    promptShade.addEventListener('click', function(event) {
      if (promptShade && promptClearLostD20) {
        promptShade.style.opacity = 0;
        promptClearLostD20.style.opacity = 0;

        function removePrompt() {
          promptShade.remove();
          promptClearLostD20.remove();
        }
        delayFunction(removePrompt, 500);
      };
    });
  };

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
  addListenerTo_savedFormulas();
  checkListListState();
  modifiers_readAmountOfBonus_blur();

};

diceRollerama();
