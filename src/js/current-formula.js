var currentFormula = (function() {

  var lostD20Formula = {
    numberOfDice: 1,
    dice: 20,
    numberOfBonus: 0
  };

  function show() {
    return lostD20Formula
  };

  function get(key) {
    return lostD20Formula[key];
  };

  function set(key, value) {
    if (key == "dice") {
      var diceCheck = parseInt(value, 10 || 0);
      if (diceCheck != 2 || diceCheck != 3 || diceCheck != 4 || diceCheck != 6 || diceCheck != 8 || diceCheck != 10 || diceCheck != 12 || diceCheck != 20 || diceCheck != 100) {
        lostD20Formula[key] = 20;
      } else {
        lostD20Formula[key] = parseInt(value, 10 || 0);
      };
    } else {
      lostD20Formula[key] = parseInt(value, 10 || 0);
    };
  };

  function render() {
    var diceSet = helper.e('.js-dice-set');
    var currentFormula = helper.e('.js-current-formula');
    // var currentFormulaNumberOfDice = helper.e('.js-current-formula-number-of-dice');
    var currentFormulaDice = helper.e('.js-current-formula-dice');
    // var currentFormulaNumberOfBonus = helper.e('.js-current-formula-number-of-bonus');
    var numberOfDiceInput = helper.e('.js-number-of-dice-input');
    var numberOfBonusInput = helper.e('.js-number-of-bonus-input');
    // currentFormulaNumberOfDice.textContent = numberOfDiceInput.value;
    currentFormulaDice.textContent = 'd' + helper.getRadioValue(diceSet, 'dice-set-group').dataset.dice;
    // currentFormulaNumberOfBonus.textContent = numberOfBonusInput.value;
    currentFormula.dataset.numberOfDice = parseInt(numberOfDiceInput.value, 10 || 0);
    currentFormula.dataset.dice = parseInt(helper.getRadioValue(diceSet, 'dice-set-group').dataset.dice, 10 || 0);
    currentFormula.dataset.numberOfBonus = parseInt(numberOfBonusInput.value, 10 || 0);
  };

  // exposed methods
  return {
    show: show,
    get: get,
    set: set,
    render: render
  };

})();
