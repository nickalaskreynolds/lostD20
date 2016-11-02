var controls = (function() {

  function bind() {
    var all_diceSetDie = helper.eA('.js-dice-set-die');
    var numberOfDiceClear = helper.e('.js-number-of-dice-clear');
    var numberOfDicePlusOne = helper.e('.js-number-of-dice-plus-one');
    var numberOfDiceMinusOne = helper.e('.js-number-of-dice-minus-one');
    var numberOfBonusClear = helper.e('.js-number-of-bonus-clear');
    var numberOfBonusPlusOne = helper.e('.js-number-of-bonus-plus-one');
    var numberOfBonusMinusOne = helper.e('.js-number-of-bonus-minus-one');
    var fabButton = helper.e('.js-fab-button');
    var currentFormulaNumberOfDiceInput = helper.e('.js-current-formula-number-of-dice-input');
    var currentFormulaNumberOfBonusInput = helper.e('.js-current-formula-number-of-bonus-input');

    for (var i = 0; i < all_diceSetDie.length; i++) {
      all_diceSetDie[i].addEventListener('change', function() {
        _getDiceSelection();
        currentFormula.render();
      }, false);
      all_diceSetDie[i].addEventListener('dblclick', function() {
        roller.render(currentFormula.get("numberOfDice"), currentFormula.get("dice"), currentFormula.get("numberOfBonus"));
        results.render(true);
      }, false);
    };

    currentFormulaNumberOfDiceInput.addEventListener('input', function() {
      _changeDiceOrBonusNumber("numberOfDice", this.value, true);
    }, false);

    currentFormulaNumberOfDiceInput.addEventListener('blur', function() {
      _render_minimum();
    }, false);

    currentFormulaNumberOfBonusInput.addEventListener('input', function() {
      _changeDiceOrBonusNumber("numberOfBonus", this.value);
    }, false);

    currentFormulaNumberOfBonusInput.addEventListener('focus', function() {
      _render_removePlusSymbol();
    }, false);

    currentFormulaNumberOfBonusInput.addEventListener('blur', function() {
      _render_addPlusSymbol();
    }, false);

    numberOfDiceClear.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfDice", 0, true);
      currentFormula.render();
    }, false);

    numberOfDicePlusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfDice", 1, true);
      currentFormula.render();
    }, false);

    numberOfDiceMinusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfDice", -1, true);
      currentFormula.render();
    }, false);

    numberOfBonusClear.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfBonus", 0);
      currentFormula.render();
      _render_addPlusSymbol();
    }, false);

    numberOfBonusPlusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfBonus", 1);
      currentFormula.render();
      _render_addPlusSymbol();
    }, false);

    numberOfBonusMinusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfBonus", -1);
      currentFormula.render();
      _render_addPlusSymbol();
    }, false);

    fabButton.addEventListener('click', function() {
      roller.render(currentFormula.get("numberOfDice"), currentFormula.get("dice"), currentFormula.get("numberOfBonus"));
      results.render(true);
    }, false);

  };

  function _getDiceSelection() {
    currentFormula.set("dice", helper.getRadioValue(helper.e('.js-dice-set'), "dice-set-group").dataset.dice);
  };

  function _render_minimum() {
    var currentFormulaNumberOfDiceInput = helper.e('.js-current-formula-number-of-dice-input');
    if (currentFormulaNumberOfDiceInput.value == "") {
      currentFormulaNumberOfDiceInput.value = currentFormula.get('numberOfDice');
    };
  };

  function _render_removePlusSymbol() {
    var currentFormulaNumberOfBonusInput = helper.e('.js-current-formula-number-of-bonus-input');
    currentFormulaNumberOfBonusInput.value = currentFormula.get('numberOfBonus');
    currentFormulaNumberOfBonusInput.maxLength = 3;
  };

  function _render_addPlusSymbol() {
    var currentFormulaNumberOfBonusInput = helper.e('.js-current-formula-number-of-bonus-input');
    currentFormulaNumberOfBonusInput.maxLength = 4;
    if (currentFormula.get("numberOfBonus") > -1) {
      currentFormulaNumberOfBonusInput.value = "+" + currentFormula.get("numberOfBonus");
    } else {
      currentFormulaNumberOfBonusInput.value = currentFormula.get("numberOfBonus");
    };
  };

  function _changeDiceOrBonusNumber(type, changeAmmount, minimum) {
    var newValue = parseInt(changeAmmount, 10 || 0);
    if (changeAmmount == 0 && minimum) {
      newValue = 1;
    }
    currentFormula.set(type, newValue);
  };

  function _incrementDiceOrBonusNumber(type, changeAmmount, minimum) {
    var newValue;
    if (changeAmmount == 0) {
      if (minimum) {
        newValue = 1;
      } else {
        newValue = 0;
      };
    } else {
      newValue = currentFormula.get(type) + parseInt(changeAmmount, 10 || 0);
      if (minimum && newValue < 1) {
        newValue = 1;
      };
    };
    currentFormula.set(type, newValue);
  };

  // exposed methods
  return {
    bind: bind
  };

})();
