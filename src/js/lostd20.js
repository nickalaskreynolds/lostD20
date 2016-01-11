function diceRollerama() {

  // elements
  var element_columnControls = e(".main-column.controls");
  var element_columnResults = e(".main-column.results");
  var element_columnFormulas = e(".main-column.formulas");
  var element_diceForm = e(".dice-form");
  var element_diceForm_label = eA(".dice-form label");
  var element_goRoll = e(".go-roll");
  var element_formulas_list = e(".formulas .list");
  var element_currentDice = e(".current-dice span");
  // var element_results = e(".results");
  var element_results_list = e(".results .list");
  var element_results_toggleFullscreen = e(".results .toggle-fullscreen");
  var element_results_toggleFullscreen_icon = e(".results .toggle-fullscreen span");
  // controls
  var controls_numberOfDiceSides_value;

  var controls_numberOfBonus = e(".controls .number-of-bonus");
  var controls_numberOfBonus_input = e(".controls .number-of-bonus input");
  var controls_numberOfBonus_input_value
  var controls_numberOfBonus_clear = e(".controls .number-of-bonus .clear");

  var controls_numberOfDice = e(".controls .number-of-dice");
  var controls_numberOfDice_input = e(".controls .number-of-dice input");
  var controls_numberOfDice_input_value
  var controls_numberOfDice_clear = e(".controls .number-of-dice .clear");
  // bonus
  var controls_numberOfBonus_plusOne = e(".controls .number-of-bonus .plus-one");
  var controls_numberOfBonus_minusOne = e(".controls .number-of-bonus .minus-one");
  // number of dice
  var controls_numberOfDice_plusOne = e(".controls .number-of-dice .plus-one");
  var controls_numberOfDice_minusOne = e(".controls .number-of-dice .minus-one");
  // utilities
  var nav_toggleDropLowest = e("nav .toggle-drop-lowest");
  var nav_toggleDropLowest_icon = e("nav .toggle-drop-lowest span");
  var nav_saveCurrentFormula = e("nav .save-current-formula");
  var nav_toggleFullscreen = e("nav .toggle-fullscreen");
  var nav_toggleFullscreen_icon = e("nav .toggle-fullscreen span");
  var nav_clearAll = e("nav .clear-all");
  // snack bar
  var element_snacks = e(".snacks");

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

  // loose focus when enter is pressed
  function dropFocusOnEnter() {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      this.blur();
    };
  };

  // resize input to text lenght
  function storeInputName(element) {
    element.setAttribute("value", element.value);
    var savedFormula = getClosest(element, ".saved-formula");
    savedFormula.dataset.rollName = element.value;
  };

  // roll current settings/formula
  function rollCurrentFormula(numberOfDice, whichDice, bonusModifier, rollName) {
    // console.log(numberOfDice);
    // console.log(whichDice);
    // console.log(bonusModifier);
    // console.log(rollName);
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
    if (rollName) {
      savedRollName = rollName + " = ";
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
    element_results_list.innerHTML =
      '<p class="cf' + critical20Or1 + '">' + '<span class="total">' + finalResult + '</span> ' + '<span class="breakdown">' + savedRollName + numberOfDice + ' <span class="dice">D' + whichDice + '</span>' + ' <span class="multiple-dice-results">' + '(Rolled: ' + multipleDiceResultsWithSpaces + ')</span>' + bonusOrNoBonus + '</span>' + '</p>' + element_results_list.innerHTML;
    checkListColumnState();
    // console.log("---------------------------------------------------");
    // console.log("roll \t \t dice selected is d  \t \t " + whichDice);
    // console.log("roll \t \t bonus passed to me is   \t " + bonusModifier);
    // console.log("roll \t \t natural rolls are   \t \t " + multipleDiceResultsWithSpaces);
    // console.log("roll \t \t total roll is   \t \t \t " + finalResult);
    // console.log("roll \t \t name is   \t \t \t \t \t " + savedRollName);
  };

  // save current formula
  function saveCurrentFormula(numberOfDice, whichDice, bonusModifier, rollName) {
    // console.log(numberOfDice);
    // console.log(whichDice);
    // console.log(bonusModifier);
    // console.log(rollName);
    var formulaNamesOfJoy = ["Aieee!", "Aiieee!", "Arrgh!", "Awk!", "Awkkkkkk!", "Bam!", "Bang!", "Bang!", "Biff!", "Bloop!", "Blurp!", "Boff!", "Bonk!", "Clank!", "Clank!", "Clash!", "Clunk!", "Clunk!", "Crraack!", "Crash!", "Crraack!", "Crunch!", "Crunch!", "Eee-yow!", "Flrbbbbb!", "Glipp!", "Glurpp!", "Kapow!", "Kayo!", "Ker-sploosh!", "Kerplop!", "Klonk!", "Klunk!", "Krunch!", "Oooff!", "Ooooff!", "Ouch!", "Ouch!", "Owww!", "Ow", "Pam!", "Plop!", "Pow!", "Powie!", "Qunckkk!", "Rakkk!", "Rip!", "Slosh!", "Sock!", "Splats!", "Splatt!", "Sploosh!", "Swaap!", "Swish!", "Swoosh!", "Thunk!", "Thwack!", "Thwacke!", "Thwape!", "Thwapp!", "Uggh!", "Urkkk!", "Vronk!", "Whack!", "Whack!", "Wham!", "Whamm!", "Whammm!", "Whap!", "Z-zwap!", "Zam!", "Zamm!", "Zammm!", "Zap!", "Zap", "Zgruppp!", "Zlonk!", "Zlopp!", "Zlott!", "Zok!", "Zowie!", "Zwapp!", "Zzwap!", "Zzzzwap!", "Zzzzzwap!", "Pepper-Pow!"];
    var saveName = function() {
      if (rollName) {
        saveName = rollName;
      } else {
        saveName = formulaNamesOfJoy[Math.floor(Math.random() * formulaNamesOfJoy.length)];
      };
    };
    // is the bonus more than or less than 0
    var plusOrMinus = function() {
      if (controls_numberOfBonus_input_value > 0) {
        plusOrMinus = controls_numberOfBonus_input_value;
      } else if (controls_numberOfBonus_input_value < 0) {
        plusOrMinus = controls_numberOfBonus_input_value;
      } else {
        plusOrMinus = "";
      };
    };
    // if number of dice is 1
    var oneDiceOrMore = function() {
      if (controls_numberOfDice_input_value == 1) {
        oneDiceOrMore = " hidden";
      } else {
        oneDiceOrMore = "";
      };
    };
    var writeSavedRoll = function() {
      plusOrMinus();
      oneDiceOrMore();
      saveName();
      element_formulas_list.innerHTML =
        '<div class="saved-formula" data-roll-name="' + saveName + '" data-ammount-of-dice="' + controls_numberOfDice_input_value + '" data-dice="' + controls_numberOfDiceSides_value + '" data-ammount-of-bonus="' + controls_numberOfBonus_input_value + '">' + '<div class="row">' + '<div class="col-12">' + '<div class="name">' + '<input class="dark" type="text" placeholder="Who am I?" value="' + saveName + '" tabindex="1">' + '</div>' + '<div class="row">' + '<div class="col-4">' + '<div class="formula-record">' + '<span class="amount-of-dice' + oneDiceOrMore + '">' + controls_numberOfDice_input_value + '</span> ' + '<span class="which-dice">d' + controls_numberOfDiceSides_value + '</span> ' + '<span class="amount-of-bonus">' + plusOrMinus + '</span>' + '</div>' + '</div>' + '<div class="col-8">' + '<div class="formula-controls">' + '<a href="javascript:void(0)" class="button button-dark button-small move-up" tabindex="1"><span class="icon-expand-less"></span></a>' + '<a href="javascript:void(0)" class="button button-dark button-small move-down" tabindex="1"><span class="icon-expand-more"></span></a>' + '<a href="javascript:void(0)" class="button button-dark button-small clear" tabindex="1"><span class="icon-close"></span></a>' + '<a href="javascript:void(0)" class="button button-dark button-small roll" tabindex="1">Roll</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + element_formulas_list.innerHTML;
    };
    writeSavedRoll();
    addListenerTo_savedFormulas();
    // addClass(document.querySelector(".saved-formula"), "flash-dark");
    // var removeFlash = function() {
    //   removeClass(document.querySelector(".saved-formula"), "flash-dark");
    // };
    // delayFunction(removeFlash, 1000);
  };

  // roll saved formula
  function rollSavedFormula(element) {
    var savedFormula = getClosest(element, ".saved-formula");
    var readSaved_name = savedFormula.dataset.rollName;
    var readSaved_amountOfDice = parseInt(savedFormula.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(savedFormula.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(savedFormula.dataset.ammountOfBonus, 10);
    // console.log("name = " + readSaved_name);
    // console.log("amount of dice = " + readSaved_amountOfDice);
    // console.log("dice sides = " + readSaved_diceSides);
    // console.log("amount of bonus = " + readSaved_amountOfBonus);
    // selecting formula dice
    e("#d" + readSaved_diceSides).checked = true;
    // if input or var value is less than 0
    if (readSaved_amountOfDice <= 1) {
      controls_numberOfDice_input.value = "";
    } else {
      controls_numberOfDice_input.value = readSaved_amountOfDice;
    };
    // if input or var value is less than 0
    if (readSaved_amountOfBonus == 0) {
      controls_numberOfBonus_input.value = "";
    } else if (readSaved_amountOfBonus > 0) {
      controls_numberOfBonus_input.value = "+" + readSaved_amountOfBonus;
    } else {
      controls_numberOfBonus_input.value = readSaved_amountOfBonus;
    };
    modifiers_readAmountOfBonus();
    modifiers_readAmountOfDice();
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
    var snackPrompt =
      '<div id="snack-' + timestamp + '" class="snack-bar" data-roll-name="' + readSaved_name + '" data-ammount-of-dice="' + readSaved_amountOfDice + '" data-dice="' + readSaved_diceSides + '" data-ammount-of-bonus="' + readSaved_amountOfBonus + '">' + '<div class="row">' + '<div class="col-6">' + '<p class="message">' + readSaved_name + ' removed.</p>' + '</div>' + '<div class="col-6">' + '<a href="javascript:void(0)" class="button button-dark button-small clear">' + '<span class="icon-close"></span>' + '</a>' + '<a href="javascript:void(0)" class="button button-dark button-small undo">Undo</a>' + '</div>' + '</div>' + '</div>';
    element_snacks.innerHTML = element_snacks.innerHTML + snackPrompt;
    var newSnackBar = e("#snack-" + timestamp);
    var reveal = function() {
      addClass(newSnackBar, "reveal");
    };
    delayFunction(reveal, 10);
    addListenerTo_snackBars();
    // clear snack bars
    var autoClearSnackBar = function() {
      snackBarToClear = e("#snack-" + timestamp);
      // if the snack bar hasn't been dismised or undone
      if (snackBarToClear) {
        clearSackBar(snackBarToClear);
      };

    };
    delayFunction(autoClearSnackBar, 6000);
    newSnackBar.addEventListener("mouseover", function() {
      clearTimeout(delayFunction);
    }, false);
  };

  // snack bar clear
  function clearSackBar(element) {
    var snackBar = getClosest(element, ".snack-bar");
    var removeReveal = function() {
      removeClass(snackBar, "reveal");
    };
    delayFunction(removeReveal, 10);
    var deleteSackBar = function() {
      snackBar.remove();
    };
    delayFunction(deleteSackBar, 500);
  };

  // snack bar undo
  function undoSackBar(element) {
    var snackBar = getClosest(element, ".snack-bar");
    var readSaved_name = snackBar.dataset.rollName;
    var readSaved_amountOfDice = parseInt(snackBar.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(snackBar.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(snackBar.dataset.ammountOfBonus, 10);
    saveCurrentFormula(readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
    clearSackBar(element);
  };

  // delay function
  function delayFunction(functionToDelay, time) {
    window.setTimeout(functionToDelay, time);
  };

  // clear all
  function clearAllFields() {
    element_results_list.innerHTML = "";
    // modifiers_plusMinus(0, controls_numberOfBonus_input);
    // modifiers_readAmountOfBonus();
    // modifiers_plusMinus(0, controls_numberOfDice_input);
    // modifiers_readAmountOfDice();
    checkListColumnState();
    removeClass(element_columnResults, "active");
    removeClass(element_columnResults, "fullsize");
  };

  // read multiple dice input field
  function modifiers_readAmountOfDice() {
    controls_numberOfDice_input_value = parseInt(controls_numberOfDice_input.value, 10) || 0;
    // if input or var value is less than 0 
    if (controls_numberOfDice_input.value <= 0 || controls_numberOfDice_input.value == "") {
      controls_numberOfDice_input.value = "";
    } else if (controls_numberOfDice_input.value >= 999) {
      controls_numberOfDice_input.value = "999";
    };
    return controls_numberOfDice_input_value;
  };

  function modifiers_readAmountOfDice_blur() {
    controls_numberOfDice_input_value = parseInt(controls_numberOfDice_input.value, 10) || 0;
    if (controls_numberOfDice_input_value == 0) {
      controls_numberOfDice_input.value = "1";
    };
  };

  // read bonus input field
  function modifiers_readAmountOfBonus() {
    controls_numberOfBonus_input_value = parseInt(controls_numberOfBonus_input.value, 10) || 0;
    // if input or var value is less than 0 
    if (controls_numberOfBonus_input_value > 0) {
      controls_numberOfBonus_input.value = "+" + controls_numberOfBonus_input_value;
    };
    if (controls_numberOfBonus_input_value >= 999) {
      controls_numberOfBonus_input.value = "+999";
    };
    // console.log("modifiers_readAmountOfBonus \t \t \t input bonus is " + controls_numberOfBonus_input_value);
    return controls_numberOfBonus_input_value;
  };

  function modifiers_readAmountOfBonus_blur() {
    controls_numberOfBonus_input_value = parseInt(controls_numberOfBonus_input.value, 10) || 0;
    if (controls_numberOfBonus_input_value == 0) {
      controls_numberOfBonus_input.value = "+0";
    };
  };

  // plus or minus modifier or clear
  function modifiers_plusMinus(changeBy, whichInputField) {
    whichInputField.value = whichInputField.value * 1 + changeBy;
    if (changeBy == 0) {
      whichInputField.value = "0";
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

  // make list active when it has content
  function checkListColumnState() {
    if (element_formulas_list.firstChild) {
      element_columnFormulas.classList.add("active");
    } else {
      element_columnFormulas.classList.remove("active");
    };
    if (element_results_list.firstChild) {
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
      // console.log(key + " was deleted");
    } else if (localStorage.getItem(key)) {
      data.innerHTML = localStorage.getItem(key);
      // console.log("read and displayed " + key + " + " + data);
    };
  };

  // toggle drop lowest
  function toggleDropLowest() {
    toggleClass(nav_toggleDropLowest, "active");
    toggleClass(nav_toggleDropLowest_icon, "icon-check-box");
    toggleClass(nav_toggleDropLowest_icon, "icon-check-box-outline-blank");
    var readDataSet = nav_toggleDropLowest.dataset.active;
    if (readDataSet == "false") {
      nav_toggleDropLowest.dataset.active = "true";
    } else if (readDataSet == "true") {
      nav_toggleDropLowest.dataset.active = "false";
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

  // go roll
  element_goRoll.addEventListener("click", function() {
    rollCurrentFormula(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    localStoreAdd("saved-history", element_results_list);
  }, false);

  // utilities
  nav_toggleDropLowest.addEventListener("click", function() {
    toggleDropLowest();
  }, false);

  nav_clearAll.addEventListener("click", function() {
    clearAllFields();
    localStoreAdd("saved-history", element_results_list);
  }, false);

  nav_saveCurrentFormula.addEventListener("click", function() {
    saveCurrentFormula(modifiers_readAmountOfDice(), getRadioValue(element_diceForm, "dice-select"), modifiers_readAmountOfBonus());
    localStoreAdd("saved-formulas", element_formulas_list);
    checkListColumnState();
  }, false);

  nav_toggleFullscreen.addEventListener("click", function() {
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

  // add listeners to snack bar buttons
  function addListenerTo_snackBars() {
    var formula_savedFormula = eA(".snack-bar");
    var formula_savedFormula_clear = eA(".snack-bar .clear");
    var formula_savedFormula_undo = eA(".snack-bar .undo");

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_clear[i].addEventListener("click", function() {
        clearSackBar(this);
      }, false);
    };

    for (var i = 0; i < formula_savedFormula.length; i++) {
      formula_savedFormula_undo[i].addEventListener("click", function() {
        undoSackBar(this);
        localStoreAdd("saved-formulas", element_formulas_list);
        checkListColumnState();
      }, false);
    };

  };

  // add listeners to saved formula buttons and inputs
  function addListenerTo_savedFormulas() {
    var formula_savedFormula = eA(".saved-formula");
    var formula_savedFormula_roll = eA(".saved-formula .roll");
    var formula_savedFormula_moveUp = eA(".saved-formula .move-up");
    var formula_savedFormula_moveDown = eA(".saved-formula .move-down");
    var formula_savedFormula_clear = eA(".saved-formula .clear");
    var formula_savedFormula_name = eA(".saved-formula .name input");

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
        checkListColumnState();
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

  controls_numberOfBonus_input.addEventListener("keypress", dropFocusOnEnter, false);

  controls_numberOfBonus_input.addEventListener("keydown", function() {
    keystroke_modifiers_plusMinus(controls_numberOfBonus_input);
    modifiers_readAmountOfBonus();
  }, false);

  controls_numberOfBonus_input.addEventListener("click", function() {
    this.select();
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

  controls_numberOfDice_input.addEventListener("click", function() {
    this.select();
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

  localStoreRead("saved-formulas", element_formulas_list);

  localStoreRead("saved-history", element_results_list);

  addListenerTo_savedFormulas();

  checkListColumnState();

};

diceRollerama();
