var currentFormula = (function() {

  function render() {
    var diceSet = helper.e('.js-dice-set');
    var currentFormula = helper.e('.js-current-formula');
    var currentFormulaNumberOfDice = helper.e('.js-current-formula-number-of-dice');
    var currentFormulaDice = helper.e('.js-current-formula-dice');
    var currentFormulaNumberOfBonus = helper.e('.js-current-formula-number-of-bonus');
    var numberOfDiceInput = helper.e('.js-number-of-dice-input');
    var numberOfBonusInput = helper.e('.js-number-of-bonus-input');
    currentFormulaNumberOfDice.textContent = numberOfDiceInput.value;
    currentFormulaDice.textContent = 'd' + helper.getRadioValue(diceSet, 'dice-set-group').dataset.dice;
    currentFormulaNumberOfBonus.textContent = numberOfBonusInput.value;
    currentFormula.dataset.numberOfDice = parseInt(numberOfDiceInput.value, 10 || 0);
    currentFormula.dataset.dice = parseInt(helper.getRadioValue(diceSet, 'dice-set-group').dataset.dice, 10 || 0);
    currentFormula.dataset.numberOfBonus = parseInt(numberOfBonusInput.value, 10 || 0);
  };

  // exposed methods
  return {
    render: render
  };

})();
