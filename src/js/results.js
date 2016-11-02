var results = (function() {

  var resultHistory = [];

  function set(numberOfDice, dice, numberOfBonus, name, results, total) {
    var newResult = new _createResultObject(numberOfDice, dice, numberOfBonus, name, results, total);
    resultHistory.push(newResult);
  };

  function history() {
    return resultHistory
  };

  function render(singleResult) {
    if (singleResult) {
      _render_singleResult();
    } else {
      _render_allResults();
    };
  };

  function _render_allResults() {
    var results = helper.e('.js-results');
    for (var i in resultHistory) {
      results.appendChild(_makeResultItem(resultHistory[i].numberOfDice, resultHistory[i].dice, resultHistory[i].numberOfBonus, resultHistory[i].name, resultHistory[i].results, resultHistory[i].total));
    };
  };

  function _render_singleResult() {
    var results = helper.e('.js-results');
    var index = resultHistory.length - 1;
    results.appendChild(_makeResultItem(resultHistory[index].numberOfDice, resultHistory[index].dice, resultHistory[index].numberOfBonus, resultHistory[index].name, resultHistory[index].results, resultHistory[index].total));

  };

  function _createResultObject(numberOfDice, dice, numberOfBonus, name, results, total) {
    return {
      numberOfDice: this.numberOfDice = numberOfDice,
      dice: this.dice = dice,
      numberOfBonus: this.numberOfBonus = numberOfBonus,
      name: this.name = name || "",
      results: this.results = results,
      total: this.total = total
    };
  };

  function _makeResultItem(numberOfDice, dice, numberOfBonus, name, results, total) {
    var li = document.createElement("p");
    li.setAttribute("class", "m-result-item");
    var spanName = document.createElement("span");
    spanName.setAttribute("class", "m-result-item-name");
    spanName.textContent = name;
    var spanFormula = document.createElement("span");
    spanFormula.setAttribute("class", "m-result-item-formula");
    spanFormula.textContent = numberOfDice + " " + dice + " " + numberOfBonus;
    var spanResults = document.createElement("span");
    spanResults.setAttribute("class", "m-result-item-results");
    spanResults.textContent = results;
    var spanTotal = document.createElement("span");
    spanTotal.setAttribute("class", "m-result-item-totla");
    spanTotal.textContent = total;
    li.appendChild(spanName);
    li.appendChild(spanFormula);
    li.appendChild(spanResults);
    li.appendChild(spanTotal);
    return li;
  };

  // exposed methods
  return {
    set: set,
    history: history,
    render: render
  };

})();
