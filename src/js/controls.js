var controls = (function() {

  function bind() {
    var all_diceSetDie = helper.eA('.js-dice-set-die');
    var controlsNumberOfDiceClear = helper.e('.js-controls-number-of-dice-clear');
    var controlsNumberOfDicePlusOne = helper.e('.js-controls-number-of-dice-plus-one');
    var controlsNumberOfDiceMinusOne = helper.e('.js-controls-number-of-dice-minus-one');
    var controlsNumberOfBonusClear = helper.e('.js-controls-number-of-bonus-clear');
    var controlsNumberOfBonusPlusOne = helper.e('.js-controls-number-of-bonus-plus-one');
    var controlsNumberOfBonusMinusOne = helper.e('.js-controls-number-of-bonus-minus-one');
    var controlsRoll = helper.e('.js-controls-roll');
    var controlsNumberOfDiceInput = helper.e('.js-controls-number-of-dice-input');
    var controlsNumberOfBonusInput = helper.e('.js-controls-number-of-bonus-input');

    for (var i = 0; i < all_diceSetDie.length; i++) {
      all_diceSetDie[i].addEventListener('change', function() {
        _getDiceSelection();
        render();
      }, false);
      all_diceSetDie[i].addEventListener('dblclick', function() {
        roller.render(currentFormula.get("numberOfDice"), currentFormula.get("dice"), currentFormula.get("numberOfBonus"));
        results.render(true);
      }, false);
    };

    controlsNumberOfDiceInput.addEventListener('input', function() {
      _changeDiceOrBonusNumber("numberOfDice", this.value, true);
    }, false);

    controlsNumberOfDiceInput.addEventListener('blur', function() {
      _render_minimum();
    }, false);

    controlsNumberOfBonusInput.addEventListener('input', function() {
      _changeDiceOrBonusNumber("numberOfBonus", this.value);
    }, false);

    controlsNumberOfBonusInput.addEventListener('focus', function() {
      _render_removePlusSymbol();
    }, false);

    controlsNumberOfBonusInput.addEventListener('blur', function() {
      _render_addPlusSymbol();
    }, false);

    controlsNumberOfDiceClear.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfDice", 0, true);
      render();
    }, false);

    controlsNumberOfDicePlusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfDice", 1, true);
      render();
    }, false);

    controlsNumberOfDiceMinusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfDice", -1, true);
      render();
    }, false);

    controlsNumberOfBonusClear.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfBonus", 0);
      render();
      _render_addPlusSymbol();
    }, false);

    controlsNumberOfBonusPlusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfBonus", 1);
      render();
      _render_addPlusSymbol();
    }, false);

    controlsNumberOfBonusMinusOne.addEventListener('click', function() {
      _incrementDiceOrBonusNumber("numberOfBonus", -1);
      render();
      _render_addPlusSymbol();
    }, false);

    controlsRoll.addEventListener('click', function() {
      roller.render(currentFormula.get("numberOfDice"), currentFormula.get("dice"), currentFormula.get("numberOfBonus"));
      results.render(true);
    }, false);

  };

  function _getDiceSelection() {
    currentFormula.set("dice", helper.getRadioValue(helper.e('.js-dice-set'), "dice-set-group").dataset.dice);
  };

  function _render_minimum() {
    var controlsNumberOfDiceInput = helper.e('.js-controls-number-of-dice-input');
    if (controlsNumberOfDiceInput.value == "") {
      controlsNumberOfDiceInput.value = currentFormula.get('numberOfDice');
    };
  };

  function _render_removePlusSymbol() {
    var controlsNumberOfBonusInput = helper.e('.js-controls-number-of-bonus-input');
    controlsNumberOfBonusInput.value = currentFormula.get('numberOfBonus');
    controlsNumberOfBonusInput.maxLength = 3;
  };

  function _render_addPlusSymbol() {
    var controlsNumberOfBonusInput = helper.e('.js-controls-number-of-bonus-input');
    controlsNumberOfBonusInput.maxLength = 4;
    if (currentFormula.get("numberOfBonus") > -1) {
      controlsNumberOfBonusInput.value = "+" + currentFormula.get("numberOfBonus");
    } else {
      controlsNumberOfBonusInput.value = currentFormula.get("numberOfBonus");
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

  function render() {
    var controlsDice = helper.e('.js-controls-dice');
    var controlsNumberOfDiceInput = helper.e('.js-controls-number-of-dice-input');
    var controlsNumberOfBonusInput = helper.e('.js-controls-number-of-bonus-input');
    controlsDice.textContent = 'd' + currentFormula.get("dice");
    if (currentFormula.get("numberOfDice") == 0) {
      controlsNumberOfDiceInput.value = 1;
    } else {
      controlsNumberOfDiceInput.value = currentFormula.get("numberOfDice");
    };
    if (currentFormula.get("numberOfBonus") == 0) {
      controlsNumberOfBonusInput.value = "+0";
    } else if (currentFormula.get("numberOfBonus") > 0) {
      controlsNumberOfBonusInput.value = "+" + currentFormula.get("numberOfBonus");
    } else {
      controlsNumberOfBonusInput.value = currentFormula.get("numberOfBonus");
    };
  };

  // exposed methods
  return {
    bind: bind,
    render: render
  };

})();
