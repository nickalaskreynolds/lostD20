function diceRollerama() {

  // elements
  var element_html = e("html");
  var element_columnControls = e(".column-third.controls");
  var element_columnResults = e(".column-third.results");
  var element_columnFormulas = e(".column-third.formulas");
  var element_diceForm = e(".dice-form");
  var element_diceForm_label = eA(".dice-form label");
  var element_goRoll = e(".go-roll");
  var element_savedFormulas_list = e(".saved-formulas .list");
  var element_resultHistory = e(".result-history");
  var element_resultHistory_list = e(".result-history .list");
  var element_results_toggleFullscreen = e(".results .toggle-fullscreen");
  var element_results_toggleFullscreen_icon = e(".results .toggle-fullscreen span");
  // formula
  var formula_numberOfDiceSides_value;
  var formula_numberOfBonus = e(".formula .number.of-bonus");
  var formula_numberOfBonus_input = e(".formula .number.of-bonus input");
  var formula_numberOfBonus_input_value
  var formula_numberOfDice = e(".formula .number.of-dice");
  var formula_numberOfDice_input = e(".formula .number.of-dice input");
  var formula_numberOfDice_input_value
  // bonus
  var modifiers_numberOfBonus_clear = e(".formula .number.of-bonus .clear");
  var modifiers_changeAmountOfBonus_plusFive = e(".modifiers .change-amount.of-bonus .plus-five");
  var modifiers_changeAmountOfBonus_plusOne = e(".modifiers .change-amount.of-bonus .plus-one");
  var modifiers_changeAmountOfBonus_minusFive = e(".modifiers .change-amount.of-bonus .minus-five");
  var modifiers_changeAmountOfBonus_minusOne = e(".modifiers .change-amount.of-bonus .minus-one");
  // number of dice
  var modifiers_numberOfDice_clear = e(".formula .number.of-dice .clear");
  var modifiers_changeAmountOfDice_plusFive = e(".modifiers .change-amount.of-dice .plus-five");
  var modifiers_changeAmountOfDice_plusOne = e(".modifiers .change-amount.of-dice .plus-one");
  var modifiers_changeAmountOfDice_minusFive = e(".modifiers .change-amount.of-dice .minus-five");
  var modifiers_changeAmountOfDice_minusOne = e(".modifiers .change-amount.of-dice .minus-one");
  // utilities
  var utilities_toggleDropLowest = e(".utilities .toggle-drop-lowest");
  var utilities_toggleDropLowest_icon = e(".utilities .toggle-drop-lowest span");
  var utilities_saveCurrentFormula = e(".utilities .save-current-formula");
  var utilities_toggleFullscreen = e(".utilities .toggle-fullscreen");
  var utilities_toggleFullscreen_icon = e(".utilities .toggle-fullscreen span");
  var utilities_clearAll = e(".utilities .clear-all");

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
        element_diceForm_label[i].classList.add("active");
      } else {
        element_diceForm_label[i].classList.remove("active");
      };
    };
  };

  // save current formula
  function saveCurrentFormulaString() {
    getRadioValue(element_diceForm, "dice-select");
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
        oneDiceOrMore = " hidden";
      } else {
        oneDiceOrMore = "";
      };
    };
    var writeSavedRoll = function() {
      plusOrMinus();
      oneDiceOrMore();
      element_savedFormulas_list.innerHTML =
          '<p class="savedFormula">'
        // name
        + '<span class="icon-bookmark"></span>'
        + '<input class="name" type="text" placeholder="The roll with no name" value="' + saveName + '">'
        // roll button
        + '<a href="javascript:void(0)" class="button button-primary roll">Roll</a> '
        // formula
        + '<span class="amountOfDice' + oneDiceOrMore + '">' + formula_numberOfDice_input_value + '</span> ' 
        + '<span class="dice"><span class="diceIcon-d' + formula_numberOfDiceSides_value + '" data-dice-sides="' + formula_numberOfDiceSides_value + '"></span></span> '
        + '<span class="amountOfBonus">' + plusOrMinus + '</span>'
        // delete
        + '<a href="javascript:void(0)" class="button button-secondary clear"><span class="icon-close"></span></a>'
        + '<span class="deleteConfirm">'
        + 'Delete this roll?'
        + '<a href="javascript:void(0)" class="button button-secondary cancel">Keep</a><a href="javascript:void(0)" class="button button-primary delete">Delete</a>'
        + '</span>' 
        + '</p>'
        + element_savedFormulas_list.innerHTML;
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
    var savedFormula = getClosest(element, ".savedFormula");
    addClass(savedFormula, "showDelete");
  };

  // remove saved formula
  function deleteSavedFormula(element) {
    var toRemove = getClosest(element, ".savedFormula");
    toRemove.parentNode.removeChild(toRemove);
  };

  // cancel remove saved formula
  function cancelSavedFormula(element) {
    var savedFormula = getClosest(element, ".savedFormula");
    removeClass(savedFormula, "showDelete");
  };

  // roll saved formula
  function runSavedFormula(element) {
    var readSavedAmountOfDice = parseInt(element.parentNode.querySelector(".amountOfDice").textContent, 10) || 0;
    var readSavedDiceSides = element.parentNode.querySelector(".dice span");
    var readSavedDiceSidesValue = parseInt(readSavedDiceSides.dataset.diceSides, 10) || 0;
    var readSavedAmountOfBonus = parseInt(element.parentNode.querySelector(".amountOfBonus").textContent, 10) || 0;
    var readSavedName = element.parentNode.querySelector(".name").value;
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
    makeSelectedRadioActive(element_diceForm, "dice-select");
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
    var toggleDropLowestState = utilities_toggleDropLowest.dataset.active;
    // make a subtract var
    var lowestToSubtract;
    if (toggleDropLowestState == "true" && numberOfDice > 1) {
      // ser var lowestToSubtract value to the index in multipleDiceResults with the lowest value
      lowestToSubtract = multipleDiceResults[lowestRollIndex];
      // wrap the content in the lowest value index with a span
      multipleDiceResults[lowestRollIndex] = '<span class="strike">' +  multipleDiceResults[lowestRollIndex] + '</span>';
    } else {
      lowestToSubtract = 0;
    };
    // add bonus to final total
    var finalResult = naturalMultipleRolls + bonusModifier - lowestToSubtract;
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
      + ' <span class="dice"><span class="diceIcon-d' + whichDice + '"></span></span>'
      + ' <span class="multipleDiceResults">' + '(Rolled: ' + multipleDiceResultsWithSpaces + ')</span>'
      + bonusOrNoBonus
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
      addClass(modifiers_numberOfDice_clear, "hide");
    } else {
      removeClass(modifiers_numberOfDice_clear, "hide");
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
      addClass(modifiers_numberOfBonus_clear, "hide");
    } else {
      removeClass(modifiers_numberOfBonus_clear, "hide");
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
      toggleClass(utilities_toggleFullscreen, "active");
      toggleClass(utilities_toggleFullscreen_icon, "icon-fullscreen-exit");
      toggleClass(utilities_toggleFullscreen_icon, "icon-fullscreen");
    } else {
      cancelFullScreen.call(root);
      toggleClass(utilities_toggleFullscreen, "active");
      toggleClass(utilities_toggleFullscreen_icon, "icon-fullscreen-exit");
      toggleClass(utilities_toggleFullscreen_icon, "icon-fullscreen");
    }
  };

  // make list active when it has content
  function checkListColumnState() {
    if (element_resultHistory_list.firstChild) {
      element_columnResults.classList.add("active");
    } else {
      element_columnResults.classList.remove("active");
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

  // toggle drop lowest
  function toggleDropLowest() {
    toggleClass(utilities_toggleDropLowest, "active");
    toggleClass(utilities_toggleDropLowest_icon, "icon-check-box");
    toggleClass(utilities_toggleDropLowest_icon, "icon-check-box-outline-blank");
    var readDataSet = utilities_toggleDropLowest.dataset.active;
    if (readDataSet == "false") {
      utilities_toggleDropLowest.dataset.active = "true";
    } else if (readDataSet == "true") {
      utilities_toggleDropLowest.dataset.active = "false";
    };
  };

  // go roll
  element_goRoll.addEventListener("click", function() {
    roll(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    localStoreAdd("savedHistory", element_resultHistory_list);
  }, false);

  // utilities
  utilities_toggleDropLowest.addEventListener("click", function() {
    toggleDropLowest();
  }, false);

  utilities_clearAll.addEventListener("click", function() {
    clearAllFields();
    localStoreAdd("savedHistory", element_resultHistory_list);
  }, false);

  utilities_saveCurrentFormula.addEventListener("click", function() {
    saveCurrentFormulaString();
    localStoreAdd("savedRolls", element_savedFormulas_list);
  }, false);

  utilities_toggleFullscreen.addEventListener("click", function() {
    toggleFullScreen();
  }, false);
  
  // dice select
  function addListenerTo_element_diceForm_label() {
    for (var i = 0; i < element_diceForm_label.length; i++) {
      element_diceForm_label[i].addEventListener("click", function() {
        makeSelectedRadioActive(element_diceForm, "dice-select");
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
    var formula_savedFormula_deleteConfirm = eA(".savedFormula .deleteConfirm");

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
        localStoreAdd("savedRolls", element_savedFormulas_list);
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
        localStoreAdd("savedRolls", element_savedFormulas_list);
      }, false);
      formula_savedFormula_name[i].addEventListener("keyup", dropFocus, false);
    };
  };

  modifiers_numberOfBonus_clear.addEventListener("click", function() {
    modifiers_plusMinus(0, formula_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  modifiers_numberOfDice_clear.addEventListener("click", function() {
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
    toggleClass(element_columnResults, "fullsize");
    toggleClass(element_results_toggleFullscreen, "active");
    toggleClass(element_results_toggleFullscreen_icon, "icon-unfold-more");
    toggleClass(element_results_toggleFullscreen_icon, "icon-unfold-less");
  }, false);

  modifiers_readAmountOfBonus();

  modifiers_readAmountOfDice();

  addListenerTo_element_diceForm_label();

  getRadioValue(element_diceForm, "dice-select");

  makeSelectedRadioActive(element_diceForm, "dice-select");

  localStoreRead("savedRolls", element_savedFormulas_list);

  localStoreRead("savedHistory", element_resultHistory_list);

  addListenerTo_saveCurrentFormula();

  checkListColumnState();

};

diceRollerama();
