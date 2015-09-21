function diceRollerama() {

  // elements
  var element_html = e("html");
  var element_column_controls = e(".column-third.controls");
  var element_column_results = e(".column-third.results");
  var element_column_formulas = e(".column-third.formulas");
  var element_diceSelector = e(".diceSelector");
  var element_goRoll = e(".goRoll");
  var element_savedRolls = e(".savedRolls");
  var element_savedRolls_list = e(".savedRolls .list");
  var element_resultHistory = e(".resultHistory");
  var element_resultHistory_list = e(".resultHistory .list");
  var element_results_toggleFullscreen = e(".results .toggleFullscreen");
  var element_diceSelect_label = eA(".diceSelector label");
  // formula
  var formula_numberOfDiceSides_value;
  var formula_numberOfBonus = e(".formula .number.ofBonus");
  var formula_numberOfBonus_input = e(".formula .number.ofBonus input");
  var formula_numberOfBonus_input_value
  var formula_numberOfDice = e(".formula .number.ofDice");
  var formula_numberOfDice_input = e(".formula .number.ofDice input");
  var formula_numberOfDice_input_value
  // bonus
  var modifiers_changeAmountOfBonus_clear = e(".formula .number.ofBonus .clear");
  var modifiers_changeAmountOfBonus_plusFive = e(".modifiers .changeAmount.ofBonus .plusFive");
  var modifiers_changeAmountOfBonus_plusOne = e(".modifiers .changeAmount.ofBonus .plusOne");
  var modifiers_changeAmountOfBonus_minusFive = e(".modifiers .changeAmount.ofBonus .minusFive");
  var modifiers_changeAmountOfBonus_minusOne = e(".modifiers .changeAmount.ofBonus .minusOne");
  // number of dice
  var modifiers_changeAmountOfDice_clear = e(".formula .number.ofDice .clear");
  var modifiers_changeAmountOfDice_plusFive = e(".modifiers .changeAmount.ofDice .plusFive");
  var modifiers_changeAmountOfDice_plusOne = e(".modifiers .changeAmount.ofDice .plusOne");
  var modifiers_changeAmountOfDice_minusFive = e(".modifiers .changeAmount.ofDice .minusFive");
  var modifiers_changeAmountOfDice_minusOne = e(".modifiers .changeAmount.ofDice .minusOne");
  // utilities
  var utilities_saveCurrentFormula = e(".utilities .saveCurrentFormula");
  var utilities_goFullscreen = e(".utilities .toggleFullscreen");
  var utilities_goFullscreen_icon = e(".utilities .toggleFullscreen .icon");
  var utilities_clearAll = e(".utilities .clearAll");

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

  // get checked radio val 
  function getRadioValue(form, radioGroupName) {
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // radio checked?
        formula_numberOfDiceSides_value = radios[i].value; // if so, hold its value in formula_numberOfDiceSides_value
      };
    };
    return formula_numberOfDiceSides_value;
  };

  // dice active state 
  function makeSelectedRadioActive(form, radioGroupName) {
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // radio checked?
        element_diceSelect_label[i].classList.add("active");
      } else {
        element_diceSelect_label[i].classList.remove("active");
      };
    };
  };

  // save current formula
  function saveCurrentFormulaString() {
    getRadioValue(element_diceSelector, "diceSelect");
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
    var formulaNamesOfJoy = ["Aieee!", "Aiieee!", "Arrgh!", "Awk!", "Awkkkkkk!", "Bam!", "Bang!", "Bang!", "Biff!", "Bloop!", "Blurp!", "Boff!", "Bonk!", "Clank!", "Clank!", "Clash!", "Clunk!", "Clunk!", "Crraack!", "Crash!", "Crraack!", "Crunch!", "Crunch!", "Eee-yow!", "Flrbbbbb!", "Glipp!", "Glurpp!", "Kapow!", "Kayo!", "Ker-sploosh!", "Kerplop!", "Klonk!", "Klunk!", "Krunch!", "Oooff!", "Ooooff!", "Ouch!", "Ouch!", "Owww!", "Ow", "Pam!", "Plop!", "Pow!", "Powie!", "Qunckkk!", "Rakkk!", "Rip!", "Slosh!", "Sock!", "Splats!", "Splatt!", "Sploosh!", "Swaap!", "Swish!", "Swoosh!", "Thunk!", "Thwack!", "Thwacke!", "Thwape!", "Thwapp!", "Uggh!", "Urkkk!", "Vronk!", "Whack!", "Whack!", "Wham!", "Whamm!", "Whammm!", "Whap!", "Z-zwap!", "Zam!", "Zamm!", "Zammm!", "Zap!", "Zap", "Zgruppp!", "Zlonk!", "Zlopp!", "Zlott!", "Zok!", "Zowie!", "Zwapp!", "Zzwap!", "Zzzzwap!", "Zzzzzwap!", "Pepper-Pow!"];
    var saveName = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    // is the bonus more than or less than 0
    var plusOrMinus = function() {
      if (formula_numberOfBonus_input_value > 0) {
        plusOrMinus = "+" + formula_numberOfBonus_input_value;
      } else if (formula_numberOfBonus_input_value < 0) {
        plusOrMinus = formula_numberOfBonus_input_value;
      } else {
        plusOrMinus = "";
      };
    };
    // if number of dice is 1
    var oneDiceOrMore = function() {
      if (formula_numberOfDice_input_value == 1) {
        oneDiceOrMore = " hide";
      } else {
        oneDiceOrMore = "";
      };
    };
    var writeSavedRoll = function() {
      plusOrMinus();
      oneDiceOrMore();
      element_savedRolls_list.innerHTML =
          '<p class="savedFormula">'
          // roll button and name
        + '<span class="rollName u-cf">'
        // + '<a class="button button-primary roll"><span class="icon diceIcon-save"></span> Roll</a>'
        + '<a class="button button-primary roll">'

        + '<span class="amountOfDice' + oneDiceOrMore + '">' + formula_numberOfDice_input_value + '</span><span class="dice"><span class="icon diceIcon-d' + formula_numberOfDiceSides_value + '" data-dice-sides="' + formula_numberOfDiceSides_value + '"></span></span><span class="amountOfBonus">' + plusOrMinus + '</span>'

        + '</a>'
        + '<input class="name" type="text" value="' + saveName + '">'
        + '</span>'
        // formula
        // + '<span class="amountOfDice' + oneDiceOrMore + '">' + formula_numberOfDice_input_value + '</span> ' 
        // + '<span class="dice"><span class="icon diceIcon-d' + formula_numberOfDiceSides_value + '" data-dice-sides="' + formula_numberOfDiceSides_value + '"></span></span> '
        // + '<span class="amountOfBonus">' + plusOrMinus + '</span>'
        // delete
        + '<span class="deleteSavedFormulaConfirm">'
        + '<a class="button button-secondary clear"><span class="icon diceIcon-close"></span></a>'
        + '<a class="button button-secondary delete">Delete?</a><a class="button button-secondary cancel">Keep</a>'
        + '</span>' 
        + '</p>' 
        + element_savedRolls_list.innerHTML;
    };
    writeSavedRoll();
    addListenerTo_saveCurrentFormula();
    checkListColumnState();
  };

  // loose focus when enter is pressed
  function dropFocus() {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      this.blur();
    };
  };

  // resize input to text lenght
  function storeInputName(element) {
    element.setAttribute("value", element.value);
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

  // remove saved formula
  function clearSavedFormula(element) {
    var deleteSavedFormulaConfirm = getClosest(element, ".deleteSavedFormulaConfirm");
    var savedFormula = getClosest(deleteSavedFormulaConfirm, ".savedFormula");
    savedFormula.classList.add("showDelete");
    checkListColumnState();
  };

  // remove saved formula
  function deleteSavedFormula(element) {
    var deleteSavedFormulaConfirm = getClosest(element, ".deleteSavedFormulaConfirm");
    var toRemove = getClosest(deleteSavedFormulaConfirm, ".savedFormula");
    toRemove.parentNode.removeChild(toRemove);
    checkListColumnState();
  };

  // cancel remove saved formula
  function cancelSavedFormula(element) {
    var deleteSavedFormulaConfirm = getClosest(element, ".deleteSavedFormulaConfirm");
    var savedFormula = getClosest(deleteSavedFormulaConfirm, ".savedFormula");
    savedFormula.classList.remove("showDelete");
  };

  // roll saved formula
  function runSavedFormula(element) {
    var readSavedAmountOfDice = parseInt(element.parentNode.parentNode.querySelector(".amountOfDice").textContent, 10) || 0;
    var readSavedDiceSides = element.parentNode.parentNode.querySelector(".dice .icon");
    var readSavedDiceSidesValue = parseInt(readSavedDiceSides.dataset.diceSides, 10) || 0;
    var readSavedAmountOfBonus = parseInt(element.parentNode.parentNode.querySelector(".amountOfBonus").textContent, 10) || 0;
    var readSavedName = element.parentNode.parentNode.querySelector(".name").value;
    // console.log(readSavedName);
    // selecting formula dice
    e("#d" + readSavedDiceSidesValue).checked = true;
    // if input or var value is less than 0
    if (readSavedAmountOfDice <= 1) {
      formula_numberOfDice_input.value = "";
    } else {
      formula_numberOfDice_input.value = readSavedAmountOfDice;
    };
    // if input or var value is less than 0
    if (readSavedAmountOfBonus == 0) {
      formula_numberOfBonus_input.value = "";
    } else if (readSavedAmountOfBonus > 0) {
      formula_numberOfBonus_input.value = "+" + readSavedAmountOfBonus;
    } else {
      formula_numberOfBonus_input.value = readSavedAmountOfBonus;
    };
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
    makeSelectedRadioActive(element_diceSelector, "diceSelect");
    roll(readSavedAmountOfDice, readSavedDiceSidesValue, readSavedAmountOfBonus, readSavedName);
  };

  function roll(numberOfDice, whichDice, bonusModifier, name) {
    // console.log(numberOfDice);
    // console.log(whichDice);
    // console.log(bonusModifier);
    // console.log(name);
    // clear array
    var multipleDiceResults = [];
    // populate array with natural rolls
    for (var i = 0; i < numberOfDice; i++) {
      multipleDiceResults.push(Math.floor(Math.random() * whichDice) + 1)
    };
    // sum all array numbers
    var naturalMultipleRolls = multipleDiceResults.reduce(function(a, b) {
      return a + b;
    });
    // add bonus to final total
    var finalResult = naturalMultipleRolls + bonusModifier;
    // make array with spaces for history
    var multipleDiceResultsWithSpaces = multipleDiceResults.join(", ");
    // is the bonus more than or less than 0
    var plusOrMinus;
    if (bonusModifier > 0) {
      plusOrMinus = "+";
    } else {
      plusOrMinus = "";
    };
    // is there a bonus
    var bonusOrNoBonus;
    if (bonusModifier == 0) {
      bonusOrNoBonus = "";
    } else {
      bonusOrNoBonus = " (" + plusOrMinus + bonusModifier + " Bonus)";
    };
    // if there is a name with the roll
    var savedRollName;
    if (name) {
      savedRollName = name + " = ";
    } else {
      savedRollName = "";
    };
    // if 20 or 1 is rolled on a d20 add class names to dice clicker and history <p>
    var critical20Or1;
    if (whichDice == 20 && numberOfDice == 1) {
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
    element_resultHistory_list.innerHTML =
      '<p class="u-cf' + critical20Or1 + '">' 
      + '<span class="total">' + finalResult + '</span> ' 
      + '<span class="breakdown">'
      + savedRollName 
      + numberOfDice 
      + ' <span class="dice"><span class="icon diceIcon-d' + whichDice + '"></span></span>' 
      + ' <span class="multipleDiceResults">' + '(Rolled: ' + multipleDiceResultsWithSpaces + ')</span>' 
      + bonusOrNoBonus 
      // + ' = <span class="historyTotal">' + finalResult + '</span>' 
      + '</span>'
      + '</p>' 
      + element_resultHistory_list.innerHTML;

    checkListColumnState();
    // console.log("---------------------------------------------------");
    // console.log("roll \t \t dice selected is d  \t \t " + whichDice);
    // console.log("roll \t \t bonus passed to me is   \t " + bonusModifier);
    // console.log("roll \t \t natural rolls are   \t \t " + multipleDiceResultsWithSpaces);
    // console.log("roll \t \t total roll is   \t \t \t " + finalResult);
    // console.log("roll \t \t name is   \t \t \t \t \t " + savedRollName);
  };

  // clear all
  function clearAllFields() {
    element_resultHistory_list.innerHTML = "";
    modifiers_plusMinus(0, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
    modifiers_plusMinus(0, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
    checkListColumnState();
  };

  // read multiple dice input field
  function modifiers_readAmountOfDice() {
    formula_numberOfDice_input_value = parseInt(formula_numberOfDice_input.value, 10) || 0;
    // if input or var value is less than 0 
    if (formula_numberOfDice_input.value <= 0 || formula_numberOfDice_input.value == "") {
      formula_numberOfDice_input_value = 1;
      formula_numberOfDice_input.value = "";
    } else if (formula_numberOfDice_input.value >= 999) {
      formula_numberOfDice_input.value = "999";
    };
    // if input bonus is 1 hide the clear button
    if (formula_numberOfDice_input.value == 0 || formula_numberOfDice_input.value == "") {
      addClass(modifiers_changeAmountOfDice_clear, "hide");
    } else {
      removeClass(modifiers_changeAmountOfDice_clear, "hide");
    };
    // console.log("modifiers_readAmountOfDice \t \t multiple dice is " + formula_numberOfDice_input_value);
    return formula_numberOfDice_input_value;
  };

  // read bonus input field
  function modifiers_readAmountOfBonus() {
    formula_numberOfBonus_input_value = parseInt(formula_numberOfBonus_input.value, 10) || 0;
    // if input or var value is less than 0 
    if (formula_numberOfBonus_input_value == 0 || formula_numberOfBonus_input.value == "") {
      formula_numberOfBonus_input.value = "";
    } else if (formula_numberOfBonus_input_value > 0) {
      formula_numberOfBonus_input.value = "+" + formula_numberOfBonus_input_value;
    };
    if (formula_numberOfBonus_input_value >= 999) {
      formula_numberOfBonus_input.value = "+999";
    };
    // if input bonus is 0 hide the clear button
    if (formula_numberOfBonus_input_value == 0 || formula_numberOfBonus_input_value == "") {
      addClass(modifiers_changeAmountOfBonus_clear, "hide");
    } else {
      removeClass(modifiers_changeAmountOfBonus_clear, "hide");
    };
    // console.log("modifiers_readAmountOfBonus \t \t \t input bonus is " + formula_numberOfBonus_input_value);
    return formula_numberOfBonus_input_value;
  };

  // plus or minus modifier or clear
  function modifiers_plusMinus(changeBy, whichInputField) {
    whichInputField.value = whichInputField.value * 1 + changeBy;
    // console.log("above or below 0");
    if (whichInputField.value == "0" || changeBy == 0 || whichInputField.value == "NaN") {
      whichInputField.value = "";
    };
  };

  // toggle fullscreen
  function toggleFullScreen() {
    var root = window.document;
    var rootElement = root.documentElement;
    var requestFullScreen = rootElement.requestFullscreen || rootElement.mozRequestFullScreen || rootElement.webkitRequestFullScreen || rootElement.msRequestFullscreen;
    var cancelFullScreen = root.exitFullscreen || root.mozCancelFullScreen || root.webkitExitFullscreen || root.msExitFullscreen;
    if (!root.fullscreenElement && !root.mozFullScreenElement && !root.webkitFullscreenElement && !root.msFullscreenElement) {
      requestFullScreen.call(rootElement);
      utilities_goFullscreen.classList.add("active");
      utilities_goFullscreen_icon.classList.remove("diceIcon-expand");
      utilities_goFullscreen_icon.classList.add("diceIcon-compress");
    } else {
      cancelFullScreen.call(root);
      utilities_goFullscreen.classList.remove("active");
      utilities_goFullscreen_icon.classList.remove("diceIcon-compress");
      utilities_goFullscreen_icon.classList.add("diceIcon-expand");
    }
  };

  // make list active when it has content
  function checkListColumnState() {
    if (element_savedRolls_list.firstChild) {
      element_column_formulas.classList.add("active");
    } else {
      element_column_formulas.classList.remove("active");
    };
    if (element_resultHistory_list.firstChild) {
      element_column_results.classList.add("active");
    } else {
      element_column_results.classList.remove("active");
    };
  };

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
    } else if (localStorage.getItem(key)) {
      data.innerHTML = localStorage.getItem(key);
      // console.log("read and displayed " + key + " + " + data);
    };
  };


  element_goRoll.addEventListener("click", function() {
    roll(modifiers_readAmountOfDice(), getRadioValue(element_diceSelector, "diceSelect"), modifiers_readAmountOfBonus());
    localStoreAdd("savedHistory", element_resultHistory_list);
  }, false);

  utilities_goFullscreen.addEventListener("click", function() {
    toggleFullScreen()
  }, false);

  utilities_clearAll.addEventListener("click", function() {
    clearAllFields();
    localStoreAdd("savedHistory", element_resultHistory_list);
  }, false);

  utilities_saveCurrentFormula.addEventListener("click", function() {
    saveCurrentFormulaString();
    // localStoreAdd();
    localStoreAdd("savedRolls", element_savedRolls_list);
  }, false);


  // // dice select
  // function addListenerTo_element_diceSelect_label() {
  //   for (var i = 0; i < element_diceSelect_label.length; i++) {
  //     element_diceSelect_label[i].addEventListener("click", function() {
  //       // console.log(this);
  //       // if label is active roll the dice with current modifiers if not make active
  //       if (this.classList.contains("active")) {
  //         roll(modifiers_readAmountOfDice(), getRadioValue(element_diceSelector, "diceSelect"), modifiers_readAmountOfBonus());
  //       } else {
  //         makeSelectedRadioActive(element_diceSelector, "diceSelect");
  //       };
  //     }, false);
  //   };
  // };
  
  // dice select
  function addListenerTo_element_diceSelect_label() {
    for (var i = 0; i < element_diceSelect_label.length; i++) {
      element_diceSelect_label[i].addEventListener("click", function() {
        makeSelectedRadioActive(element_diceSelector, "diceSelect");
      }, false);
    };
  };

  // add listeners to saved formula buttons and inputs
  function addListenerTo_saveCurrentFormula() {
    var formula_savedFormula = eA(".savedFormula");
    var formula_savedFormula_roll = eA(".savedFormula .roll");
    var formula_savedFormula_clear = eA(".savedFormula .clear");
    var formula_savedFormula_delete = eA(".savedFormula .delete");
    var formula_savedFormula_cancel = eA(".savedFormula .cancel");
    var formula_savedFormula_name = eA(".savedFormula .name");

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_roll[i].addEventListener("click", function() {
        runSavedFormula(this);
        localStoreAdd("savedHistory", element_resultHistory_list);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_clear[i].addEventListener("click", function() {
        clearSavedFormula(this);
        localStoreAdd("savedHistory", element_resultHistory_list);  
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_delete[i].addEventListener("click", function() {
        deleteSavedFormula(this);
        localStoreAdd("savedRolls", element_savedRolls_list);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_cancel[i].addEventListener("click", function() {
        cancelSavedFormula(this);
        localStoreAdd("savedHistory", element_resultHistory_list);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_name[i].addEventListener("click", function() {
        this.select();
      });
      formula_savedFormula_name[i].addEventListener("keyup", function() {
        // take input value and add it to the input node value attribute
        storeInputName(this);
        localStoreAdd("savedRolls", element_savedRolls_list);
      }, false);
      formula_savedFormula_name[i].addEventListener("keyup", dropFocus, false);
    };
  };

  modifiers_changeAmountOfBonus_clear.addEventListener("click", function() {
    modifiers_plusMinus(0, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  modifiers_changeAmountOfDice_clear.addEventListener("click", function() {
    modifiers_plusMinus(0, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
  }, false);

  // bonusModifiers
  formula_numberOfBonus_input.addEventListener("input", function() {
    modifiers_readAmountOfBonus();
  }, false);

  formula_numberOfBonus_input.addEventListener("keyup", dropFocus, false);

  formula_numberOfBonus_input.addEventListener("click", function() {
    this.select();
  }, false);

  modifiers_changeAmountOfBonus_plusFive.addEventListener("click", function() {
    modifiers_plusMinus(5, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  modifiers_changeAmountOfBonus_plusOne.addEventListener("click", function() {
    modifiers_plusMinus(1, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  modifiers_changeAmountOfBonus_minusOne.addEventListener("click", function() {
    modifiers_plusMinus(-1, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  modifiers_changeAmountOfBonus_minusFive.addEventListener("click", function() {
    modifiers_plusMinus(-5, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  // multipleDice
  formula_numberOfDice_input.addEventListener("input", function() {
    modifiers_readAmountOfDice();
  }, false);

  formula_numberOfDice_input.addEventListener("keyup", dropFocus, false);

  formula_numberOfDice_input.addEventListener("click", function() {
    this.select();
  }, false);

  modifiers_changeAmountOfDice_plusFive.addEventListener("click", function() {
    modifiers_plusMinus(5, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
  }, false);

  modifiers_changeAmountOfDice_plusOne.addEventListener("click", function() {
    modifiers_plusMinus(1, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
  }, false);

  modifiers_changeAmountOfDice_minusOne.addEventListener("click", function() {
    modifiers_plusMinus(-1, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
  }, false);

  modifiers_changeAmountOfDice_minusFive.addEventListener("click", function() {
    modifiers_plusMinus(-5, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
  }, false);

  element_results_toggleFullscreen.addEventListener("click", function() {
    toggleClass(element_column_results, "fullsize");
  }, false);

  modifiers_readAmountOfBonus();

  modifiers_readAmountOfDice();

  addListenerTo_element_diceSelect_label();

  getRadioValue(element_diceSelector, "diceSelect");

  makeSelectedRadioActive(element_diceSelector, "diceSelect");

  localStoreRead("savedRolls", element_savedRolls_list);

  localStoreRead("savedHistory", element_resultHistory_list);

  addListenerTo_saveCurrentFormula();

  checkListColumnState();

};

diceRollerama();
