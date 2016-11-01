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
    };

    numberOfDiceClear.addEventListener('click', function() {
      _changeDiceOrBonusNumber("numberOfDice", 0, true);
      currentFormula.render();
    }, false);

    numberOfDicePlusOne.addEventListener('click', function() {
      _changeDiceOrBonusNumber("numberOfDice", 1, true);
      currentFormula.render();
    }, false);

    numberOfDiceMinusOne.addEventListener('click', function() {
      _changeDiceOrBonusNumber("numberOfDice", -1, true);
      currentFormula.render();
    }, false);

    numberOfBonusClear.addEventListener('click', function() {
      _changeDiceOrBonusNumber("numberOfBonus", 0);
      currentFormula.render();
    }, false);

    numberOfBonusPlusOne.addEventListener('click', function() {
      _changeDiceOrBonusNumber("numberOfBonus", 1);
      currentFormula.render();
    }, false);

    numberOfBonusMinusOne.addEventListener('click', function() {
      _changeDiceOrBonusNumber("numberOfBonus", -1);
      currentFormula.render();
    }, false);

    fabButton.addEventListener('click', function() {
      roller.render(currentFormula.get("numberOfDice"), currentFormula.get("dice"), currentFormula.get("numberOfBonus"));
    }, false);

  };

  function _getDiceSelection() {
    currentFormula.set("dice", helper.getRadioValue(helper.e('.js-dice-set'), "dice-set-group").dataset.dice);
  };

  function _changeDiceOrBonusNumber(type, changeAmmount, minimum) {
    var newValue;
    if (changeAmmount == 0) {
      if (minimum) {
        newValue = 1;
      } else {
        newValue = 0;
      };
    } else {
      newValue = currentFormula.get(type) + changeAmmount;
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
