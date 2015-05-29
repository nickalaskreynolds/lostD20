function diceRollerama() {

  // elements
  var element_html =                                e("html");
  var element_d =                                   e("#d #diceForm");
  var element_diceRollClicker =                     e("#diceRollClicker");
  var element_goRoll =                              e("#goRoll");
  var element_currentResult =                       e("#currentResult");
  var element_savedRolls =                          e("#savedRolls");
  var element_savedRollsList =                      e("#savedRolls .list");
  var element_resultHistory =                       e("#resultHistory");
  var element_resultHistoryList =                   e("#resultHistory .list");
  var element_diceSelectLabels =                    eA("#diceForm label");
  // formula
  var formula_numberOfDiceSides;
  var formula_numberOfBonus =                       e("#formula .number.ofBonus");
  var formula_numberOfBonusInput =                  e("#formula .number.ofBonus input");
  var formula_numberOfBonusInput_value
  var formula_numberOfDice =                        e("#formula .number.ofDice");
  var formula_numberOfDiceInput =                   e("#formula .number.ofDice input");
  var formula_numberOfDiceInput_value
  var formula_changeAmountOfBonus_clear =           e("#formula .number.ofBonus .clear");
  var formula_changeAmountOfDice_clear =            e("#formula .number.ofDice .clear");
  var formula_currentDice =                         e("#formula .currentDice h1");
  // modifiers
  var modifiers_changeAmountOfBonus_plusFive =      e("#modifiers .changeAmount.ofBonus .plusFive");
  var modifiers_changeAmountOfBonus_plusOne =       e("#modifiers .changeAmount.ofBonus .plusOne");
  var modifiers_changeAmountOfBonus_minusFive =     e("#modifiers .changeAmount.ofBonus .minusFive");
  var modifiers_changeAmountOfBonus_minusOne =      e("#modifiers .changeAmount.ofBonus .minusOne");
  var modifiers_changeAmountOfDice_plusFive =       e("#modifiers .changeAmount.ofDice .plusFive");
  var modifiers_changeAmountOfDice_plusOne =        e("#modifiers .changeAmount.ofDice .plusOne");
  var modifiers_changeAmountOfDice_minusFive =      e("#modifiers .changeAmount.ofDice .minusFive");
  var modifiers_changeAmountOfDice_minusOne =       e("#modifiers .changeAmount.ofDice .minusOne");
  // utilities
  var utilities_saveCurrentFormula =                e("#utilities .tool.saveCurrentFormula");
  var utilities_goFullscreen =                      e("#utilities .tool.toggleFullscreen");
  var utilities_goFullscreenIcon =                  e("#utilities .tool.toggleFullscreen .icon");
  var utilities_clearAll =                          e("#utilities .tool.clearAll");

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
      if ( radios[i].checked ) { // radio checked?
        formula_numberOfDiceSides = radios[i].value; // if so, hold its value in formula_numberOfDiceSides
      };
    };
    return formula_numberOfDiceSides;
  };

  // formula current dice
  function formula_readCurrentDice() {
    getRadioValue(element_d,"diceSelect");
    formula_currentDice.innerHTML = "d" + formula_numberOfDiceSides;
  };

  // dice active state 
  function makeActive(form, radioGroupName) {
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if ( radios[i].checked ) { // radio checked?
        element_diceSelectLabels[i].classList.add("active");
      } else {
        element_diceSelectLabels[i].classList.remove("active");
      };
    };
  };

  // dice select
  function activateChosenDice() {
    for (var i = 0; i < element_diceSelectLabels.length; i++) {
      element_diceSelectLabels[i].addEventListener("click", function(){ makeActive(element_d,"diceSelect"); formula_readCurrentDice(); }, false);
    };
  };

  // save current formula
  function saveRollString() {
    getRadioValue(element_d,"diceSelect");
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
    var formulaNamesOfJoy = ["Bonk", "Bash", "Blam", "Boink", "Crash", "Smash", "Donk", "Ponk", "Slonk", "Slash", "Whoosh", "Meep", "Beep", "Boop", "Ow", "Slap", "Hick", "Eep", "Kink", "Wack", "Wonk", "Bork", "Wee"]; 
    // var formulaNamesOfJoyValue = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    var saveName = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    // var saveName = prompt("Name this roll or leave blank for Auto-Awesome name generation.");
    // is the bonus more than or less than 0
    var plusOrMinus;
    if (formula_numberOfBonusInput_value > 0) {
      plusOrMinus = "+" + formula_numberOfBonusInput_value;
    } else if (formula_numberOfBonusInput_value < 0) {
      plusOrMinus = formula_numberOfBonusInput_value
    } else {
      plusOrMinus = "";
    };
    var writeSavedRoll = function(){
      element_savedRollsList.innerHTML = 
      "<p class=\"savedFormula\">" 
      // + "<span class=\"name\">" + saveName + " =</span>"
      + " <button class=\"roll\"><span class=\"icon diceIcon-save\"></span> Roll</button>"
      + " <input class=\"name\" type=\"text\" value=\"" + saveName + "\">"
      + " <span class=\"amountOfDice\">" + formula_numberOfDiceInput_value + "</span>"
      + " <span class=\"d\"><span class=\"icon diceIcon-d" + formula_numberOfDiceSides + "\" data-dice-sides=\"" + formula_numberOfDiceSides + "\"></span></span>" 
      + " <span class=\"amountOfBonus\">" + plusOrMinus + "</span>"
      + " <button class=\"clear\"><span class=\"icon diceIcon-close\"></span></button>"
      + element_savedRollsList.innerHTML;
    };
    if (saveName === "") {
      saveName = formulaNamesOfJoyValue;
      writeSavedRoll();
    } else if (saveName) {
      writeSavedRoll();
    };
    saveRollListeners();
    checkListActiveState();
  };

  // add listeners to saved formula buttons and inputs
  function saveRollListeners() {
    var savedFormula = eA(".savedFormula");
    var savedFormula_roll = eA(".savedFormula .roll");
    for (var i = 0; i < savedFormula.length; i++) {
      savedFormula_roll[i].addEventListener("click", runSavedFormula, false);
    };
    var savedFormula_clear = eA(".savedFormula .clear");
    for (var i = 0; i < savedFormula.length; i++) {
      savedFormula_clear[i].addEventListener("click", function(){ clearSavedFormula(this); localStoreAdd(); }, false);
    };
    var savedFormula_name = eA(".savedFormula .name");
    for (var i = 0; i < savedFormula.length; i++) {
      savedFormula_name[i].addEventListener("focus", function(){ maxWidth(this); }, false);
      savedFormula_name[i].addEventListener("focus", function(){ this.select(); }, false);
      savedFormula_name[i].addEventListener("focusout", function(){ autoWidth(this); }, false);
      savedFormula_name[i].addEventListener("keyup", function(){ storeInputName(this); localStoreAdd(); }, false);
      savedFormula_name[i].addEventListener("keyup", dropFocus, false);
      savedFormula_name[i].style.width = parseInt(savedFormula_name[i].value.length, 10) * 5.6 + 20 + "px";
    };
  };

  // loose focus when enter is pressed
  function dropFocus() {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      this.blur();
    };
  };

  // resize input to text lenght
  function storeInputName(e) {
    e.setAttribute("value", e.value);
  };

  // resize input to text lenght
  function maxWidth(e) {
    e.style.width = "50%";
  };

  // resize input to text lenght
  function autoWidth(e) {
    e.style.width = parseInt(e.value.length, 10) * 5.6 + 20 + "px";
  };

  // get parent element
  var getClosest = function(elem, selector) {
    var firstChar = selector.charAt(0);
    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
      // If selector is a class
      if (firstChar === '.') {
        if (elem.classList.contains(selector.substr(1))) {
          return elem;
        };
      };
      // If selector is an ID
      if (firstChar === '#') {
        if (elem.id === selector.substr(1)) {
          return elem;
        };
      };
      // If selector is a data attribute
      if (firstChar === '[') {
        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
          return elem;
        };
      };
      // If selector is a tag
      if (elem.tagName.toLowerCase() === selector) {
        return elem;
      };
    };
    return false;
  };

  // remove saved formula
  function clearSavedFormula(elem) {
    var toRemove = getClosest(elem, ".savedFormula");
    var confirm = window.confirm("Delete this formula?");
    if (confirm) {
      toRemove.parentNode.removeChild(toRemove);
    };
    checkListActiveState();
  };

  // roll saved formula
  function runSavedFormula() {
    var readSavedAmountOfDice = parseInt(this.parentNode.querySelector(".amountOfDice").textContent, 10) || 0;
    var readSavedDiceSides = this.parentNode.querySelector(".d .icon");
    var readSavedDiceSidesValue = parseInt(readSavedDiceSides.dataset.diceSides, 10) || 0;
    var readSavedAmountOfBonus = parseInt(this.parentNode.querySelector(".amountOfBonus").textContent, 10) || 0;
    var readSavedName = this.parentNode.querySelector(".name").value;
    console.log(readSavedName);
    // selecting formula dice
    e("#d" + readSavedDiceSidesValue).checked = true;
    // if input or var value is less than 0
    if (readSavedAmountOfDice <= 1) {
      formula_numberOfDiceInput.value = "";
    } else {
      formula_numberOfDiceInput.value = readSavedAmountOfDice;
    };
    // if input or var value is less than 0
    if (readSavedAmountOfBonus == 0) {
      formula_numberOfBonusInput.value = "";
    } else if (readSavedAmountOfBonus > 0) {
      formula_numberOfBonusInput.value = "+" + readSavedAmountOfBonus;
    } else {
      formula_numberOfBonusInput.value = readSavedAmountOfBonus;
    };
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
    makeActive(element_d,"diceSelect");
    formula_readCurrentDice();
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
    var naturalMultipleRolls = multipleDiceResults.reduce(function(a, b) { return a + b; });
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
        critical20Or1 = " class=\"critical20\"";
        element_diceRollClicker.classList.add("critical20");
        element_diceRollClicker.classList.remove("critical1");
      } else if (naturalMultipleRolls == 1) {
        // if natural 1
        critical20Or1 = " class=\"critical1\"";
        element_diceRollClicker.classList.remove("critical20");
        element_diceRollClicker.classList.add("critical1");
      } else {
        critical20Or1 = "";
        element_diceRollClicker.classList.remove("critical20");
        element_diceRollClicker.classList.remove("critical1");
      }
    } else {
      critical20Or1 = "";
      element_diceRollClicker.classList.remove("critical20");
      element_diceRollClicker.classList.remove("critical1");
    };
    // print results to history
      element_resultHistoryList.innerHTML = 
        "<p" + critical20Or1 + ">" 
        + savedRollName
        + numberOfDice 
        + " <span class=\"icon diceIcon-d" + whichDice + "\"></span>" 
        + " <span class=\"multipleDiceResults\">" + "(Rolls: " + multipleDiceResultsWithSpaces + ")</span>" 
        + bonusOrNoBonus 
        + " = <span class=\"hostoryTotal\">" + finalResult + "</span>" 
        + "</p>" 
        + element_resultHistoryList.innerHTML;

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
    element_resultHistoryList.innerHTML = "";
    element_currentResult.innerHTML = "<p>0</p>";
    modifiers_plusMinus(0, formula_numberOfBonusInput);
    modifiers_readAmountOfBonus();
    modifiers_plusMinus(0, formula_numberOfDiceInput);
    modifiers_readAmountOfDice();
    element_diceRollClicker.classList.remove("critical20");
    element_diceRollClicker.classList.remove("critical1");
    checkListActiveState();
  };

  // read bonus input field
  function modifiers_readAmountOfBonus(){
    formula_numberOfBonusInput_value = parseInt(formula_numberOfBonusInput.value, 10) || 0;
    // if input or var value is less than 0 
    if (formula_numberOfBonusInput_value == 0 || formula_numberOfBonusInput.value == "") {
      formula_numberOfBonusInput.value = "";
    } else if (formula_numberOfBonusInput_value > 0) {
      formula_numberOfBonusInput.value = "+" + formula_numberOfBonusInput_value;
    };
    if (formula_numberOfBonusInput_value >= 999) {
      formula_numberOfBonusInput.value = "+999";
    };
    // if input bonus is 0 hide the clear button
    if (formula_numberOfBonusInput_value == 0 || formula_numberOfBonusInput_value == "") {
      formula_numberOfBonus.classList.remove("active");
    } else {
      formula_numberOfBonus.classList.add("active");
    };
    // console.log("modifiers_readAmountOfBonus \t \t \t input bonus is " + formula_numberOfBonusInput_value);
    return formula_numberOfBonusInput_value;
  };

  // read multiple dice input field
  function modifiers_readAmountOfDice(){
    formula_numberOfDiceInput_value = parseInt(formula_numberOfDiceInput.value, 10) || 0;
    // if input or var value is less than 0 
    if (formula_numberOfDiceInput.value <= 0 || formula_numberOfDiceInput.value == "") {
      formula_numberOfDiceInput_value = 1;
      formula_numberOfDiceInput.value = "";
    } else if (formula_numberOfDiceInput.value >= 999) {
      formula_numberOfDiceInput.value = "999";
    };
    // if input bonus is 1 hide the clear button
    if (formula_numberOfDiceInput.value == 0 || formula_numberOfDiceInput.value == "") {
      formula_numberOfDice.classList.remove("active");
    } else {
      formula_numberOfDice.classList.add("active");
    };
    // console.log("modifiers_readAmountOfDice \t \t multiple dice is " + formula_numberOfDiceInput_value);
    return formula_numberOfDiceInput_value;
  };

  // plus or minus modifier or clear
  function modifiers_plusMinus(changeBy, whichInputField) {
    whichInputField.value = whichInputField.value * 1 + changeBy;
    // console.log("above or below 0");
    if (whichInputField.value == "0" || changeBy == 0 || whichInputField.value == "NaN") {
      whichInputField.value = "";
    };
  };



    
  function toggleFullScreen() {
  var doc = window.document;
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (doc.mozRequestFullScreen) {
        doc.mozRequestFullScreen();
      } else {
        doc.webkitRequestFullScreen();
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }
  
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      toggleFullScreen();
    }
  }, false);



  // request fullscreen
  function xxxx() {

    var doc = window.document;

    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
      utilities_goFullscreen.classList.add("active");
      utilities_goFullscreenIcon.classList.remove("diceIcon-expand");
      utilities_goFullscreenIcon.classList.add("diceIcon-compress");
      element_html.classList.add("fullscreen");
    }
    else {
      cancelFullScreen.call(doc);
      utilities_goFullscreen.classList.remove("active");
      utilities_goFullscreenIcon.classList.remove("diceIcon-compress");
      utilities_goFullscreenIcon.classList.add("diceIcon-expand");
      element_html.classList.remove("fullscreen");
    }
  };

  // make list active when it has content
  function checkListActiveState() {
    if (element_savedRollsList.firstChild) {
      element_savedRolls.classList.add("active");
    } else {
      element_savedRolls.classList.remove("active");
    };
    if (element_resultHistoryList.firstChild) {
      element_resultHistory.classList.add("active");
    } else {
      element_resultHistory.classList.remove("active");
    };
  };

  // resize element_savedRolls and history list on desktop to window height
  function listMaxHeight() {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    var parent = getClosest(element_savedRolls, ".columns");
    var children = parent.childNodes;
    var childrenHeight = children[1].clientHeight + children[3].clientHeight + children[5].clientHeight + children[7].clientHeight;
    var savedRollListHeight = height - childrenHeight - 100;
    // console.log(height);
    // console.log(width);
    if (width > 750) {
      height = height - 60;
      // element_savedRolls.style.maxHeight = savedRollListHeight + "px";
      element_resultHistory.style.maxHeight = height + "px";
    };
  };

  // add fixed class when scrolling
  function fixedelement_DiceRollClicker() {
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
      localStorage.setItem("savedRolls", element_savedRollsList.innerHTML);
      // console.log("added");
    };
  };

  // local storage read
  function localStoreRead() {
    if (localStorage.getItem("savedRolls") == "") {
      localStorage.clear("savedRolls");
    } else if (localStorage.getItem("savedRolls")) {
      element_savedRollsList.innerHTML = localStorage.getItem("savedRolls");
      // console.log("read and displayed");
    };
  };

  // listeners
  window.addEventListener("resize", function(){ listMaxHeight(); }, false);
  window.addEventListener("scroll", fixedelement_DiceRollClicker, false);
  element_goRoll.addEventListener("click", function(){ roll( modifiers_readAmountOfDice(), getRadioValue(element_d,"diceSelect"), modifiers_readAmountOfBonus()); }, false);
  utilities_goFullscreen.addEventListener("click", function(){ toggleFullScreen() }, false);
  utilities_clearAll.addEventListener("click", clearAllFields, false);
  utilities_saveCurrentFormula.addEventListener("click", function() { saveRollString(); localStoreAdd(); }, false);

  // formula_currentDice.addEventListener("click", function(){ roll( modifiers_readAmountOfDice(), getRadioValue(element_d,"diceSelect"), modifiers_readAmountOfBonus()); }, false);
  formula_changeAmountOfBonus_clear.addEventListener("click", function(){ modifiers_plusMinus(0, formula_numberOfBonusInput); modifiers_readAmountOfBonus(); }, false);
  formula_changeAmountOfDice_clear.addEventListener("click", function(){ modifiers_plusMinus(0, formula_numberOfDiceInput); modifiers_readAmountOfDice(); }, false);

  // bonusModifiers
  formula_numberOfBonusInput.addEventListener("input", function(){ modifiers_readAmountOfBonus(); }, false);

  formula_numberOfBonusInput.addEventListener("focus", function(){ this.select(); }, false);
  modifiers_changeAmountOfBonus_plusFive.addEventListener("click", function(){ modifiers_plusMinus(5, formula_numberOfBonusInput); modifiers_readAmountOfBonus(); }, false);
  modifiers_changeAmountOfBonus_plusOne.addEventListener("click", function(){ modifiers_plusMinus(1, formula_numberOfBonusInput); modifiers_readAmountOfBonus(); }, false);
  modifiers_changeAmountOfBonus_minusOne.addEventListener("click", function(){ modifiers_plusMinus(-1, formula_numberOfBonusInput); modifiers_readAmountOfBonus(); }, false);
  modifiers_changeAmountOfBonus_minusFive.addEventListener("click", function(){ modifiers_plusMinus(-5, formula_numberOfBonusInput); modifiers_readAmountOfBonus(); }, false);

  // multipleDice
  formula_numberOfDiceInput.addEventListener("input", function(){ modifiers_readAmountOfDice(); }, false);

  formula_numberOfDiceInput.addEventListener("focus", function(){ this.select(); }, false);
  modifiers_changeAmountOfDice_plusFive.addEventListener("click", function(){ modifiers_plusMinus(5, formula_numberOfDiceInput); modifiers_readAmountOfDice(); }, false);
  modifiers_changeAmountOfDice_plusOne.addEventListener("click", function(){ modifiers_plusMinus(1, formula_numberOfDiceInput); modifiers_readAmountOfDice(); }, false);
  modifiers_changeAmountOfDice_minusOne.addEventListener("click", function(){ modifiers_plusMinus(-1, formula_numberOfDiceInput); modifiers_readAmountOfDice(); }, false);
  modifiers_changeAmountOfDice_minusFive.addEventListener("click", function(){ modifiers_plusMinus(-5, formula_numberOfDiceInput); modifiers_readAmountOfDice(); }, false);

  modifiers_readAmountOfBonus();
  modifiers_readAmountOfDice();
  activateChosenDice();
  getRadioValue(element_d,"diceSelect");
  makeActive(element_d,"diceSelect");
  formula_readCurrentDice();
  listMaxHeight();
  localStoreRead();
  saveRollListeners();
  checkListActiveState();

};

diceRollerama();