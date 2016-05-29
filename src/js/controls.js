var controls = (function() {

  function bind() {
    var all_diceSetDie = helper.eA('.js-dice-set-die');
    for (var i = 0; i < all_diceSetDie.length; i++) {
      all_diceSetDie[i].addEventListener('change', function() {
        currentFormula.render();
      }, false);
    };
  };

  // exposed methods
  return {
    bind: bind
  };

})();
