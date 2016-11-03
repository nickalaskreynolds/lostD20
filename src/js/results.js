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
      results.insertBefore(_makeResultItem(resultHistory[i].numberOfDice, resultHistory[i].dice, resultHistory[i].numberOfBonus, resultHistory[i].name, resultHistory[i].results, resultHistory[i].total), results.firstChild);
    };
  };

  function _render_singleResult() {
    var results = helper.e('.js-results');
    var index = resultHistory.length - 1;
    results.insertBefore(_makeResultItem(resultHistory[index].numberOfDice, resultHistory[index].dice, resultHistory[index].numberOfBonus, resultHistory[index].name, resultHistory[index].results, resultHistory[index].total), results.firstChild);
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
    var spanResultDetails = document.createElement("span");
    spanResultDetails.setAttribute("class", "m-result-item-details");

    var spanName = document.createElement("span");
    spanName.setAttribute("class", "m-result-item-name");
    spanName.textContent = name || "";
    var spanFormula = document.createElement("span");
    spanFormula.setAttribute("class", "m-result-item-formula");
    var formula = "";
    if (numberOfDice > 1) {
      formula = numberOfDice + " ";
    };
    formula = formula + "d" + dice;
    if (numberOfBonus > 0) {
      formula = formula + " +" + numberOfBonus;
    } else if (numberOfBonus < 0) {
      formula = formula + " " + numberOfBonus;
    };
    spanFormula.textContent = formula;
    var spanResults = document.createElement("span");
    spanResults.setAttribute("class", "m-result-item-results");
    spanResults.textContent = "Rolled: " + results.join(", ");
    var spanTotal = document.createElement("span");
    spanTotal.setAttribute("class", "m-result-item-total");
    spanTotal.textContent = total;
    if (name) {
      spanResultDetails.appendChild(spanName);
    };
    spanResultDetails.appendChild(spanFormula);
    if (results.length > 1) {
      spanResultDetails.appendChild(spanResults);
    };
    li.appendChild(spanResultDetails);
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
