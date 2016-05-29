var currentFormula = (function() {

  function render() {
    var diceSet = helper.e('.js-dice-set');
    var currentFormulaNumberOfDice = helper.e('.js-current-formula-number-of-dice');
    var currentFormulaDice = helper.e('.js-current-formula-dice');
    var currentFormulaNumberOfBonus = helper.e('.js-current-formula-number-of-bonus');
    currentFormulaDice.textContent = 'd' + helper.getRadioValue(diceSet, 'dice-set-group').dataset.dice;
  };

  // exposed methods
  return {
    render: render
  };

})();
