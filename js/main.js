function diceRollerama() {

  // variables
  var d =                                           e("#d #diceForm");
  var diceRollClicker =                             e("#diceRollClicker");
  var goRoll =                                      e("#goRoll");
  var currentResult =                               e("#rollResult");
  var saveCurrentFormula =                          e(".saveCurrentFormula");

  var savedRolls =                                  e("#savedRolls");
  var savedRollsList =                              e("#savedRolls .list");

  var resultHistory =                               e("#resultHistory");
  var resultHistoryList =                           e("#resultHistory .list");

  var goFullscreen =                                e(".toggleFullscreen");
  var goFullscreenIcon =                            e(".toggleFullscreen .icon");
  var clearAll =                                    e(".clearAll");
  var diceSelectLabel =                             eA("#diceForm label");
  var numberOfDiceSides;
  var multipleDiceResults =                         [];
  // formula
  var formula_numberOfBonus =                       e("#formula .number.ofBonus");
  var formula_numberOfBonusInput =                  e("#formula .number.ofBonus input");
  var formula_numberOfBonusInputValue;
  var formula_numberOfDice =                        e("#formula .number.ofDice");
  var formula_numberOfDiceInput =                   e("#formula .number.ofDice input");
  var formula_numberOfDiceInputValue;
  var formula_changeAmountOfBonus_clear =           e("#formula .number.ofBonus .clear");
  var formula_changeAmountOfDice_clear =            e("#formula .number.ofDice .clear");
  var formula_currentDice =                         e("#formula .currentDice h1");
  // bonus
  var modifiers_changeAmountOfBonus_plusFive =      e("#modifiers .changeAmount.ofBonus .plusFive");
  var modifiers_changeAmountOfBonus_plusOne =       e("#modifiers .changeAmount.ofBonus .plusOne");
  var modifiers_changeAmountOfBonus_minusFive =     e("#modifiers .changeAmount.ofBonus .minusFive");
  var modifiers_changeAmountOfBonus_minusOne =      e("#modifiers .changeAmount.ofBonus .minusOne");
  // number of dice
  var modifiers_changeAmountOfDice_plusFive =       e("#modifiers .changeAmount.ofDice .plusFive");
  var modifiers_changeAmountOfDice_plusOne =        e("#modifiers .changeAmount.ofDice .plusOne");
  var modifiers_changeAmountOfDice_minusFive =      e("#modifiers .changeAmount.ofDice .minusFive");
  var modifiers_changeAmountOfDice_minusOne =       e("#modifiers .changeAmount.ofDice .minusOne");

  // get element by class or id
  function e(selectors) {
    return document.querySelector(selectors);
  };

  // get all elements by class or id
  function eA(selectors) {
    return document.querySelectorAll(selectors);
  };

  // get checked radio val 
  function getRadioVal(form, radioGroupName) {
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if ( radios[i].checked ) { // radio checked?
        numberOfDiceSides = radios[i].value; // if so, hold its value in numberOfDiceSides
      };
    };
    return numberOfDiceSides;
  };

  // formula current dice
  function formula_readCurrentDice() {
    getRadioVal(d,"diceSelect");
    formula_currentDice.innerHTML = "d" + numberOfDiceSides;
  };

  // dice active state 
  function makeActive(form, radioGroupName) {
    // get list of radio buttons with specified name
    var radios = form[radioGroupName];
    // loop through list of radio buttons
    for (var i = 0; i < radios.length; i++) {
      if ( radios[i].checked ) { // radio checked?
        diceSelectLabel[i].classList.add("active");
      } else {
        diceSelectLabel[i].classList.remove("active");
      };
    };
  };

  // dice select
  function activateChosenDice() {
    for (var i = 0; i < diceSelectLabel.length; i++) {
      diceSelectLabel[i].addEventListener("click", function(){ makeActive(d,"diceSelect"); formula_readCurrentDice(); }, false);
    };
  };

  // save current formula
  function saveRollString() {
    getRadioVal(d,"diceSelect");
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
    var formulaNamesOfJoy = ["Bonk", "Bash", "Blam", "Boink", "Crash", "Smash", "Donk", "Ponk", "Slonk", "Slash", "Whoosh", "Meep", "Beep", "Boop", "Ow", "Slap", "Hick", "Eep", "Kink", "Wack", "Wonk", "Bork", "Wee"]; 
    // var formulaNamesOfJoyValue = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    var saveName = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
    // var saveName = prompt("Name this roll or leave blank for Auto-Awesome name generation.");
    // is the bonus more than or less than 0
    var plusOrMinus;
    if (formula_numberOfBonusInputValue > 0) {
      plusOrMinus = "+" + formula_numberOfBonusInputValue;
    } else if (formula_numberOfBonusInputValue < 0) {
      plusOrMinus = formula_numberOfBonusInputValue
    } else {
      plusOrMinus = "";
    };
    var writeSavedRoll = function(){
      savedRollsList.innerHTML = 
      "<p class=\"savedFormula\">" 
      // + "<span class=\"name\">" + saveName + " =</span>"
      + " <button class=\"roll\"><span class=\"icon diceIcon-save\"></span> Roll</button>"
      + " <input class=\"name\" type=\"text\" value=\"" + saveName + "\">"
      + " <span class=\"amountOfDice\">" + formula_numberOfDiceInputValue + "</span>"
      + " <span class=\"d\"><span class=\"icon diceIcon-d" + numberOfDiceSides + "\" data-dice-sides=\"" + numberOfDiceSides + "\"></span></span>" 
      + " <span class=\"amountOfBonus\">" + plusOrMinus + "</span>"
      + " <button class=\"clear\"><span class=\"icon diceIcon-close\"></span></button>"
      + savedRollsList.innerHTML;
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
    makeActive(d,"diceSelect");
    formula_readCurrentDice();
    roll(readSavedAmountOfDice, readSavedDiceSidesValue, readSavedAmountOfBonus, readSavedName);
  };

  function roll(numberOfDice, whichDice, bonusModifier, name) {
    // console.log(numberOfDice);
    // console.log(whichDice);
    // console.log(bonusModifier);
    // console.log(name);

    // clear array
    multipleDiceResults = [];
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
    currentResult.innerHTML = "<p>" + finalResult + "</p>";
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
        diceRollClicker.classList.add("critical20");
        diceRollClicker.classList.remove("critical1");
      } else if (naturalMultipleRolls == 1) {
        // if natural 1
        critical20Or1 = " class=\"critical1\"";
        diceRollClicker.classList.remove("critical20");
        diceRollClicker.classList.add("critical1");
      } else {
        critical20Or1 = "";
        diceRollClicker.classList.remove("critical20");
        diceRollClicker.classList.remove("critical1");
      }
    } else {
      critical20Or1 = "";
      diceRollClicker.classList.remove("critical20");
      diceRollClicker.classList.remove("critical1");
    };
    // print results to history
      resultHistoryList.innerHTML = 
        "<p" + critical20Or1 + ">" 
        + savedRollName
        + numberOfDice 
        + " <span class=\"icon diceIcon-d" + whichDice + "\"></span>" 
        + " <span class=\"multipleDiceResults\">" + "(Rolls: " + multipleDiceResultsWithSpaces + ")</span>" 
        + bonusOrNoBonus 
        + " = <span class=\"hostoryTotal\">" + finalResult + "</span>" 
        + "</p>" 
        + resultHistoryList.innerHTML;

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
    resultHistoryList.innerHTML = "";
    currentResult.innerHTML = "<p>0</p>";
    modifiers_plusMinus(0, formula_numberOfBonusInput);
    modifiers_readAmountOfBonus();
    modifiers_plusMinus(0, formula_numberOfDiceInput);
    modifiers_readAmountOfDice();
    diceRollClicker.classList.remove("critical20");
    diceRollClicker.classList.remove("critical1");
    checkListActiveState();
  };

  // read bonus input field
  function modifiers_readAmountOfBonus(){
    formula_numberOfBonusInputValue = parseInt(formula_numberOfBonusInput.value, 10) || 0;
    // if input or var value is less than 0 
    if (formula_numberOfBonusInputValue == 0 || formula_numberOfBonusInput.value == "") {
      formula_numberOfBonusInput.value = "";
    } else if (formula_numberOfBonusInputValue > 0) {
      formula_numberOfBonusInput.value = "+" + formula_numberOfBonusInputValue;
    };
    if (formula_numberOfBonusInputValue >= 999) {
      formula_numberOfBonusInput.value = "+999";
    };
    // if input bonus is 0 hide the clear button
    if (formula_numberOfBonusInputValue == 0 || formula_numberOfBonusInputValue == "") {
      formula_numberOfBonus.classList.remove("active");
    } else {
      formula_numberOfBonus.classList.add("active");
    };
    // console.log("modifiers_readAmountOfBonus \t \t \t input bonus is " + formula_numberOfBonusInputValue);
    return formula_numberOfBonusInputValue;
  };

  // read multiple dice input field
  function modifiers_readAmountOfDice(){
    formula_numberOfDiceInputValue = parseInt(formula_numberOfDiceInput.value, 10) || 0;
    // if input or var value is less than 0 
    if (formula_numberOfDiceInput.value <= 0 || formula_numberOfDiceInput.value == "") {
      formula_numberOfDiceInputValue = 1;
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
    // console.log("modifiers_readAmountOfDice \t \t multiple dice is " + formula_numberOfDiceInputValue);
    return formula_numberOfDiceInputValue;
  };

  // plus or minus modifier or clear
  function modifiers_plusMinus(changeBy, whichInputField) {
    whichInputField.value = whichInputField.value * 1 + changeBy;
    // console.log("above or below 0");
    if (whichInputField.value == "0" || changeBy == 0 || whichInputField.value == "NaN") {
      whichInputField.value = "";
    };
  };

  // request fullscreen
  function toggleFullScreen() {
    html = e("html");
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
      goFullscreen.classList.add("active");
      goFullscreenIcon.classList.remove("diceIcon-expand");
      goFullscreenIcon.classList.add("diceIcon-compress");
      html.classList.add("fullscreen");
    }
    else {
      cancelFullScreen.call(doc);
      goFullscreen.classList.remove("active");
      goFullscreenIcon.classList.remove("diceIcon-compress");
      goFullscreenIcon.classList.add("diceIcon-expand");
      html.classList.remove("fullscreen");
    }
  };

  // make list active when it has content
  function checkListActiveState() {
    if (savedRollsList.firstChild) {
      savedRolls.classList.add("active");
    } else {
      savedRolls.classList.remove("active");
    };
    if (resultHistoryList.firstChild) {
      resultHistory.classList.add("active");
    } else {
      resultHistory.classList.remove("active");
    };
  };

  // resize savedRolls and history list on desktop to window height
  function listMaxHeight() {
    var height = document.documentElement.clientHeight;
    var width = document.documentElement.clientWidth;
    var parent = getClosest(savedRolls, ".columns");
    var children = parent.childNodes;
    var childrenHeight = children[1].clientHeight + children[3].clientHeight + children[5].clientHeight + children[7].clientHeight;
    var savedRollListHeight = height - childrenHeight - 100;
    // console.log(height);
    // console.log(width);
    if (width > 750) {
      height = height - 60;
      // savedRolls.style.maxHeight = savedRollListHeight + "px";
      resultHistory.style.maxHeight = height + "px";
    };
  };

  // add fixed class when scrolling
  function fixedDiceRollClicker() {
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
      localStorage.setItem("savedRolls", savedRollsList.innerHTML);
      // console.log("added");
    };
  };

  // local storage read
  function localStoreRead() {
    if (localStorage.getItem("savedRolls") == "") {
      localStorage.clear("savedRolls");
    } else if (localStorage.getItem("savedRolls")) {
      savedRollsList.innerHTML = localStorage.getItem("savedRolls");
      // console.log("read and displayed");
    };
  };

  // listeners
  window.addEventListener("resize", function(){ listMaxHeight(); }, false);
  window.addEventListener("scroll", fixedDiceRollClicker, false);
  goRoll.addEventListener("click", function(){ roll( modifiers_readAmountOfDice(), getRadioVal(d,"diceSelect"), modifiers_readAmountOfBonus()); }, false);
  goFullscreen.addEventListener("click", function(){ toggleFullScreen() }, false);
  clearAll.addEventListener("click", clearAllFields, false);
  saveCurrentFormula.addEventListener("click", function() { saveRollString(); localStoreAdd(); }, false);

  // formula_currentDice.addEventListener("click", function(){ roll( modifiers_readAmountOfDice(), getRadioVal(d,"diceSelect"), modifiers_readAmountOfBonus()); }, false);
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
  getRadioVal(d,"diceSelect");
  makeActive(d,"diceSelect");
  formula_readCurrentDice();
  listMaxHeight();
  localStoreRead();
  saveRollListeners();
  checkListActiveState();

};

diceRollerama();