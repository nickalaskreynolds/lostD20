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
      _render_resultHistory();
    } else {
      _render_all_resultHistory();
    };
  };

  function _render_all_resultHistory() {
    var resultsHistory = helper.e('.js-results-history');
    for (var i in resultHistory) {
      resultsHistory.insertBefore(_makeResultHistoryItem(resultHistory[i].numberOfDice, resultHistory[i].dice, resultHistory[i].numberOfBonus, resultHistory[i].name, resultHistory[i].results, resultHistory[i].total), resultsHistory.firstChild);
    };
  };

  function _render_resultHistory() {
    var resultsHistory = helper.e('.js-results-history');
    var index = resultHistory.length - 1;
    resultsHistory.insertBefore(_makeResultHistoryItem(resultHistory[index].numberOfDice, resultHistory[index].dice, resultHistory[index].numberOfBonus, resultHistory[index].name, resultHistory[index].results, resultHistory[index].total), resultsHistory.firstChild);
  };

  function _render_resultCurrent(argument) {
    // body...
  }

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

  function _makeResultCurrentItem(numberOfDice, dice, numberOfBonus, name, results, total) {
    var p = document.createElement("p");
    p.setAttribute("class", "m-result-item");






    
  };

  function _makeResultHistoryItem(numberOfDice, dice, numberOfBonus, name, results, total) {
    var li = document.createElement("li");
    li.setAttribute("class", "m-result-item");
    var spanResultWrapperDetails = document.createElement("span");
    spanResultWrapperDetails.setAttribute("class", "m-result-item-wrapper-details");
    var spanResultWrapperTotal = document.createElement("span");
    spanResultWrapperTotal.setAttribute("class", "m-result-item-wrapper-total");
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
      spanResultWrapperDetails.appendChild(spanName);
    };
    spanResultWrapperDetails.appendChild(spanFormula);
    if (results.length > 1 || numberOfBonus != 0) {
      spanResultWrapperDetails.appendChild(spanResults);
    };
    spanResultWrapperTotal.appendChild(spanTotal);
    li.appendChild(spanResultWrapperDetails);
    li.appendChild(spanResultWrapperTotal);
    return li;
  };

  // exposed methods
  return {
    set: set,
    history: history,
    render: render
  };

})();
