function diceRollerama() {

  // elements
  var element_html = e("html");
  var element_diceSelector = e("#diceSelector");
  var element_diceRollClicker = e("#diceRollClicker");
  var element_goRoll = e("#goRoll");
  var element_currentResult = e("#currentResult");
  var element_savedRolls = e("#savedRolls");
  var element_savedRolls_list = e("#savedRolls .list");
  var element_resultHistory = e("#resultHistory");
  var element_resultHistory_list = e("#resultHistory .list");
  var element_diceSelect_label = eA("#diceSelector label");
  // formula
  var formula_numberOfDiceSides_value;
  var formula_numberOfBonus = e("#formula .number.ofBonus");
  var formula_numberOfBonus_input = e("#formula .number.ofBonus input");
  var formula_numberOfBonus_input_value
  var formula_numberOfDice = e("#formula .number.ofDice");
  var formula_numberOfDice_input = e("#formula .number.ofDice input");
  var formula_numberOfDice_input_value
  var formula_currentDice_h1 = e("#formula .currentDice h1");
  // bonus
  var modifiers_changeAmountOfBonus_clear = e("#formula .number.ofBonus .clear");
  var modifiers_changeAmountOfBonus_plusFive = e("#modifiers .changeAmount.ofBonus .plusFive");
  var modifiers_changeAmountOfBonus_plusOne = e("#modifiers .changeAmount.ofBonus .plusOne");
  var modifiers_changeAmountOfBonus_minusFive = e("#modifiers .changeAmount.ofBonus .minusFive");
  var modifiers_changeAmountOfBonus_minusOne = e("#modifiers .changeAmount.ofBonus .minusOne");
  // number of dice
  var modifiers_changeAmountOfDice_clear = e("#formula .number.ofDice .clear");
  var modifiers_changeAmountOfDice_plusFive = e("#modifiers .changeAmount.ofDice .plusFive");
  var modifiers_changeAmountOfDice_plusOne = e("#modifiers .changeAmount.ofDice .plusOne");
  var modifiers_changeAmountOfDice_minusFive = e("#modifiers .changeAmount.ofDice .minusFive");
  var modifiers_changeAmountOfDice_minusOne = e("#modifiers .changeAmount.ofDice .minusOne");
  // utilities
  var utilities_saveCurrentFormula = e("#utilities .saveCurrentFormula");
  var utilities_goFullscreen = e("#utilities .toggleFullscreen");
  var utilities_goFullscreen_icon = e("#utilities .toggleFullscreen .icon");
  var utilities_clearAll = e("#utilities .clearAll");

  // get element by class or id
  function e(selector) {
    return document.querySelector(selector);
  };

  // get all elements by class or id
  function eA(selector) {
    return document.querySelectorAll(selector);
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

  // formula current dice
  function changeCurrentDiceH1() {
    getRadioValue(element_diceSelector, "diceSelect");
    formula_currentDice_h1.innerHTML = "d" + formula_numberOfDiceSides_value;
  };

  // save current formula
  function saveCurrentFormulaString() {
    getRadioValue(element_diceSelector, "diceSelect");
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
    var formulaNamesOfJoy = ["Bonk", "Bash", "Blam", "Boink", "Crash", "Smash", "Donk", "Ponk", "Slonk", "Slash", "Whoosh", "Meep", "Beep", "Boop", "Ow", "Slap", "Hick", "Eep", "Kink", "Wack", "Wonk", "Bork", "Wee"];
    var saveName = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    // is the bonus more than or less than 0
    var plusOrMinus = function() {
      if (formula_numberOfBonus_input_value > 0) {
        plusOrMinus = "+" + formula_numberOfBonus_input_value;
      } else if (formula_numberOfBonus_input_value < 0) {
        plusOrMinus = formula_numberOfBonus_input_value
      } else {
        plusOrMinus = "";
      };
    };
    var writeSavedRoll = function() {
      plusOrMinus();
      element_savedRolls_list.innerHTML =
        "<p class=\"savedFormula\">" 
        + " <button class=\"roll\"><span class=\"icon diceIcon-save\"></span> Roll</button>" 
        + " <input class=\"name\" type=\"text\" value=\"" + saveName + "\">" 
        + " <span class=\"amountOfDice\">" + formula_numberOfDice_input_value + "</span>" 
        + " <span class=\"d\"><span class=\"icon diceIcon-d" + formula_numberOfDiceSides_value + "\" data-dice-sides=\"" + formula_numberOfDiceSides_value + "\"></span></span>" 
        + " <span class=\"amountOfBonus\">" + plusOrMinus + "</span>" 
        + " <span class=\"deleteSavedFormulaConfirm\">"
        + " <button class=\"clear\"><span class=\"icon diceIcon-close\"></span></button>" 
        + " <button class=\"cancel\">Cancel</button>" 
        + " <button class=\"delete\">Delete</button>" 
        + " </span>"
        + " </p>"
        + element_savedRolls_list.innerHTML;
    };
    writeSavedRoll();
    addListenerTo_saveCurrentFormula();
    checkListActiveState();
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

  // resize input to text lenght
  function maxWidth(element) {
    element.style.width = "50%";
  };

  // resize input to text lenght
  function autoWidth(element) {
    element.style.width = parseInt(element.value.length, 10) * 5.6 + 20 + "px";
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
    checkListActiveState();
  };

  // remove saved formula
  function deleteSavedFormula(element) {
    var deleteSavedFormulaConfirm = getClosest(element, ".deleteSavedFormulaConfirm");
    var toRemove = getClosest(deleteSavedFormulaConfirm, ".savedFormula");
    toRemove.parentNode.removeChild(toRemove);
    checkListActiveState();
  };

  // cancel remove saved formula
  function cancelSavedFormula(element) {
    var deleteSavedFormulaConfirm = getClosest(element, ".deleteSavedFormulaConfirm");
    var savedFormula = getClosest(deleteSavedFormulaConfirm, ".savedFormula");
    savedFormula.classList.remove("showDelete");
  };

  // roll saved formula
  function runSavedFormula() {
    var readSavedAmountOfDice = parseInt(this.parentNode.querySelector(".amountOfDice").textContent, 10) || 0;
    var readSavedDiceSides = this.parentNode.querySelector(".d .icon");
    var readSavedDiceSidesValue = parseInt(readSavedDiceSides.dataset.diceSides, 10) || 0;
    var readSavedAmountOfBonus = parseInt(this.parentNode.querySelector(".amountOfBonus").textContent, 10) || 0;
    var readSavedName = this.parentNode.querySelector(".name").value;
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
    changeCurrentDiceH1();
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
    // print final total to result box
    element_currentResult.innerHTML = "<p>" + finalResult + "</p>";
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
      bonusOrNoBonus = " " + plusOrMinus + bonusModifier + " Bonus";
    };
    // if there is a name with the roll
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
        critical20Or1 = " class=\"critical-20\"";
        element_diceRollClicker.classList.add("critical-20");
        element_diceRollClicker.classList.remove("critical-1");
      } else if (naturalMultipleRolls == 1) {
        // if natural 1
        critical20Or1 = " class=\"critical-1\"";
        element_diceRollClicker.classList.remove("critical-20");
        element_diceRollClicker.classList.add("critical-1");
      } else {
        critical20Or1 = "";
        element_diceRollClicker.classList.remove("critical-20");
        element_diceRollClicker.classList.remove("critical-1");
      }
    } else {
      critical20Or1 = "";
      element_diceRollClicker.classList.remove("critical-20");
      element_diceRollClicker.classList.remove("critical-1");
    };
    // print results to history
    element_resultHistory_list.innerHTML =
      "<p" + critical20Or1 + ">" + savedRollName + numberOfDice + " <span class=\"icon diceIcon-d" + whichDice + "\"></span>" + " <span class=\"multipleDiceResults\">" + "(Rolls: " + multipleDiceResultsWithSpaces + ")</span>" + bonusOrNoBonus + " = <span class=\"hostoryTotal\">" + finalResult + "</span>" + "</p>" + element_resultHistory_list.innerHTML;

    checkListActiveState();
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
    element_currentResult.innerHTML = "<p>0</p>";
    modifiers_plusMinus(0, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
    modifiers_plusMinus(0, formula_numberOfDice_input);
    modifiers_readAmountOfDice();
    element_diceRollClicker.classList.remove("critical-20");
    element_diceRollClicker.classList.remove("critical-1");
    checkListActiveState();
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
      formula_numberOfBonus.classList.remove("active");
    } else {
      formula_numberOfBonus.classList.add("active");
    };
    // console.log("modifiers_readAmountOfBonus \t \t \t input bonus is " + formula_numberOfBonus_input_value);
    return formula_numberOfBonus_input_value;
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
      formula_numberOfDice.classList.remove("active");
    } else {
      formula_numberOfDice.classList.add("active");
    };
    // console.log("modifiers_readAmountOfDice \t \t multiple dice is " + formula_numberOfDice_input_value);
    return formula_numberOfDice_input_value;
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
      // element_html.classList.add("fullscreen");
    } else {
      cancelFullScreen.call(root);
      utilities_goFullscreen.classList.remove("active");
      utilities_goFullscreen_icon.classList.remove("diceIcon-compress");
      utilities_goFullscreen_icon.classList.add("diceIcon-expand");
      // element_html.classList.remove("fullscreen");
    }
  };

  // make list active when it has content
  function checkListActiveState() {
    if (element_savedRolls_list.firstChild) {
      element_savedRolls.classList.add("active");
    } else {
      element_savedRolls.classList.remove("active");
    };
    if (element_resultHistory_list.firstChild) {
      element_resultHistory.classList.add("active");
    } else {
      element_resultHistory.classList.remove("active");
    };
  };

  // resize element_savedRolls and history list on desktop to window height
  function listMaxHeight() {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    // var parent = getClosest(element_savedRolls, ".columns");
    // var children = parent.childNodes;
    // console.log(document.documentElement + height);
    // console.log(document.documentElement + width);
    // console.log(parent);
    // console.log(children);
    // var childrenHeight = children[1].clientHeight + children[3].clientHeight + children[5].clientHeight + children[7].clientHeight;
    // var savedRollListHeight = height - childrenHeight - 100;
    // console.log(height);
    // console.log(width);
    if (width > 750) {
      height = height - 60;
      // element_savedRolls.style.maxHeight = savedRollListHeight + "px";
      element_resultHistory.style.maxHeight = height + "px";
    } else {
      element_resultHistory.style.maxHeight = "";
    };
  };

  function listMaxwidth() {
    var window_width = document.documentElement.clientWidth;
    var parent = getClosest(element_resultHistory, ".columns");
    var list_width = parent.clientWidth;
    if (window_width > 750) {
      element_resultHistory.style.width = list_width + "px";
    } else {
      element_resultHistory.style.width = "";
    };
  };

  // add fixed class when scrolling
  function fixedHeader() {
    var body = e("body");
    var width = document.documentElement.clientWidth;
    // console.log(window.pageYOffset)
    if (window.pageYOffset >= 60 && width < 750) {
      body.classList.add("fixed");
    } else {
      body.classList.remove("fixed");
    };
  };

  // local storage add
  function localStoreAdd() {
    if (localStorage.getItem) {
      localStorage.setItem("savedRolls", element_savedRolls_list.innerHTML);
      // console.log("added");
    };
  };

  // local storage read
  function localStoreRead() {
    if (localStorage.getItem("savedRolls") == "") {
      localStorage.clear("savedRolls");
    } else if (localStorage.getItem("savedRolls")) {
      element_savedRolls_list.innerHTML = localStorage.getItem("savedRolls");
      // console.log("read and displayed");
    };
  };

  // listeners
  window.addEventListener("resize", function() {
    listMaxHeight();
    listMaxwidth();
  }, false);
  window.addEventListener("scroll", function() {
    fixedHeader();
  }, false);
  element_goRoll.addEventListener("click", function() {
    roll(modifiers_readAmountOfDice(), getRadioValue(element_diceSelector, "diceSelect"), modifiers_readAmountOfBonus());
  }, false);
  utilities_goFullscreen.addEventListener("click", function() {
    toggleFullScreen()
  }, false);
  utilities_clearAll.addEventListener("click", function() {
    clearAllFields();
  }, false);
  utilities_saveCurrentFormula.addEventListener("click", function() {
    saveCurrentFormulaString();
    localStoreAdd();
  }, false);

  // dice select
  function addListenerTo_element_diceSelect_label() {
    for (var i = 0; i < element_diceSelect_label.length; i++) {
      element_diceSelect_label[i].addEventListener("click", function() {
        makeSelectedRadioActive(element_diceSelector, "diceSelect");
        changeCurrentDiceH1();
      }, false);
    };
  };

  // add listeners to saved formula buttons and inputs
  function addListenerTo_saveCurrentFormula() {
    var formula_savedFormula = eA(".savedFormula");
    var formula_savedFormula_roll = eA(".savedFormula .roll");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_roll[i].addEventListener("click", runSavedFormula, false);
    };
    var formula_savedFormula_clear = eA(".savedFormula .clear");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_clear[i].addEventListener("click", function() {
        clearSavedFormula(this);
        localStoreAdd();
      }, false);
    };
    var formula_savedFormula_delete = eA(".savedFormula .delete");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_delete[i].addEventListener("click", function() {
        deleteSavedFormula(this);
        localStoreAdd();
      }, false);
    };
    var formula_savedFormula_cancel = eA(".savedFormula .cancel");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_cancel[i].addEventListener("click", function() {
        cancelSavedFormula(this);
        localStoreAdd();
      }, false);
    };
    var formula_savedFormula_name = eA(".savedFormula .name");
    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_name[i].addEventListener("focus", function() {
        maxWidth(this);
      }, false);
      formula_savedFormula_name[i].addEventListener("focus", function() {
        this.select();
      }, false);
      formula_savedFormula_name[i].addEventListener("focusout", function() {
        autoWidth(this);
      }, false);
      formula_savedFormula_name[i].addEventListener("keyup", function() {
        storeInputName(this);
        localStoreAdd();
      }, false);
      formula_savedFormula_name[i].addEventListener("keyup", dropFocus, false);
      formula_savedFormula_name[i].style.width = parseInt(formula_savedFormula_name[i].value.length, 10) * 5.6 + 20 + "px";
    };
  };

  // formula_currentDice_h1.addEventListener("click", function(){ roll( modifiers_readAmountOfDice(), getRadioValue(element_diceSelector,"diceSelect"), modifiers_readAmountOfBonus()); }, false);
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

  formula_numberOfBonus_input.addEventListener("focus", function() {
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

  formula_numberOfDice_input.addEventListener("focus", function() {
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

  modifiers_readAmountOfBonus();
  modifiers_readAmountOfDice();
  addListenerTo_element_diceSelect_label();
  getRadioValue(element_diceSelector, "diceSelect");
  makeSelectedRadioActive(element_diceSelector, "diceSelect");
  changeCurrentDiceH1();
  listMaxHeight();
  listMaxwidth();
  localStoreRead();
  addListenerTo_saveCurrentFormula();
  checkListActiveState();

};

diceRollerama();
