var controls = (function() {

  function bind() {
    var all_diceSetDie = helper.eA('.js-dice-set-die');
    var numberOfDiceClear = helper.e('.js-number-of-dice-clear');
    var numberOfDicePlusOne = helper.e('.js-number-of-dice-plus-one');
    var numberOfDiceMinusOne = helper.e('.js-number-of-dice-minus-one');
    var numberOfBonusClear = helper.e('.js-number-of-bonus-clear');
    var numberOfBonusPlusOne = helper.e('.js-number-of-bonus-plus-one');
    var numberOfBonusMinusOne = helper.e('.js-number-of-bonus-minus-one');
    var numberOfDiceInput = helper.e('.js-number-of-dice-input');
    var numberOfBonusInput = helper.e('.js-number-of-bonus-input');
    var fabButton = helper.e('.js-fab-button');
    for (var i = 0; i < all_diceSetDie.length; i++) {
      all_diceSetDie[i].addEventListener('change', function() {
        currentFormula.render();
      }, false);
    };
    numberOfDiceClear.addEventListener('click', function() {
      _changeInputValue(numberOfDiceInput, 0, true);
      currentFormula.render();
    }, false);
    numberOfDicePlusOne.addEventListener('click', function() {
      _changeInputValue(numberOfDiceInput, 1, true);
      currentFormula.render();
    }, false);
    numberOfDiceMinusOne.addEventListener('click', function() {
      _changeInputValue(numberOfDiceInput, -1, true);
      currentFormula.render();
    }, false);
    numberOfBonusClear.addEventListener('click', function() {
      _changeInputValue(numberOfBonusInput, 0);
      currentFormula.render();
    }, false);
    numberOfBonusPlusOne.addEventListener('click', function() {
      _changeInputValue(numberOfBonusInput, 1);
      currentFormula.render();
    }, false);
    numberOfBonusMinusOne.addEventListener('click', function() {
      _changeInputValue(numberOfBonusInput, -1);
      currentFormula.render();
    }, false);
    fabButton.addEventListener('click', function() {
      _roll();
    }, false);
  };

  function _roll() {
    roller.render(
      currentFormula.get("numberOfDice"),
      currentFormula.get("dice"),
      currentFormula.get("numberOfBonus")
    );
  };

  // plus or minus modifier or clear
  function _changeInputValue(input, ammount, minimum) {
    var newValue = (parseInt(input.value, 10) || 0) + ammount;
    if (minimum) {
      if (newValue < 1) {
        newValue = 1;
      };
    };
    input.value = newValue;
    if (ammount == 0) {
      input.value = "0";
    };
  };

  // exposed methods
  return {
    bind: bind
  };

})();
