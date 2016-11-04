var currentFormula = (function() {

  var lostD20Formula = {
    numberOfDice: 1,
    dice: 20,
    numberOfBonus: 0,
    name: "",
  };

  function show() {
    return lostD20Formula
  };

  function get(key) {
    return lostD20Formula[key];
  };

  function set(key, value) {
    if (key == "numberOfDice" || key == "dice" || key == "numberOfBonus") {
      if (key == "dice") {
        var validDice = [2, 3, 4, 6, 8, 10, 12, 20, 100];
        var diceCheck = parseInt(value, 10 || 0);
        if (validDice.includes(diceCheck)) {
          lostD20Formula[key] = diceCheck;
        } else {
          lostD20Formula.dice = 20;
        };
      } else {
        if (isNaN(parseInt(value, 10 || 0))) {
          lostD20Formula[key] = 0;
        } else {
          lostD20Formula[key] = parseInt(value, 10 || 0);
        };
      };
    };
    // console.log("lostD20Formula = ", lostD20Formula);
  };

  // exposed methods
  return {
    show: show,
    get: get,
    set: set
  };

})();
