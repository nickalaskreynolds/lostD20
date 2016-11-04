var results = (function() {

  var resultHistory = [];

  function bind() {
    var resultsExpand = helper.e('.js-results-expand');
    var resultsClear = helper.e('.js-results-clear');
    resultsExpand.addEventListener('click', function() {
      _toggle_history();
    }, false);
    resultsClear.addEventListener('click', function() {
      destroy();
    }, false);
  };

  function _toggle_history(force) {
    var resultsExpand = helper.e('.js-results-expand');
    var sectionResults = helper.e('.js-section-results');
    if (force) {
      if (force == 'open') {
        resultsExpand.dataset.expand = "true";
        helper.addClass(sectionResults, 'is-open');
        helper.removeClass(sectionResults, 'is-closed');
      };
      if (force == 'close') {
        resultsExpand.dataset.expand = "false";
        helper.removeClass(sectionResults, 'is-open');
        helper.addClass(sectionResults, 'is-closed');
      };
    } else {
      if (resultsExpand.dataset.expand == "true") {
        resultsExpand.dataset.expand = "false";
        helper.removeClass(sectionResults, 'is-open');
        helper.addClass(sectionResults, 'is-closed');
      } else {
        resultsExpand.dataset.expand = "true";
        helper.addClass(sectionResults, 'is-open');
        helper.removeClass(sectionResults, 'is-closed');
      };
    };
  };

  function _checkResultsHistory() {
    var resultsHistory = helper.e('.js-results-history');
    if (resultsHistory.children.length > 0) {
      return true;
    } else {
      return false;
    };
  };

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
      _render_resultCurrent();
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
    var resultsCurrent = helper.e('.js-results-current');
    var resultsHistory = helper.e('.js-results-history');
    var index = resultHistory.length - 1;
    resultsHistory.insertBefore(_makeResultHistoryItem(resultHistory[index].numberOfDice, resultHistory[index].dice, resultHistory[index].numberOfBonus, resultHistory[index].name, resultHistory[index].results, resultHistory[index].total), resultsHistory.firstChild);
  };

  function _render_resultCurrent() {
    var resultsCurrent = helper.e('.js-results-current');
    while (resultsCurrent.lastChild) {
      resultsCurrent.removeChild(resultsCurrent.lastChild);
    };
    var index = resultHistory.length - 1;
    resultsCurrent.appendChild(_makeResultCurrentItem(resultHistory[index].results, resultHistory[index].total), resultsCurrent.firstChild);
  };

  function destroy() {
    var resultsHistory = helper.e('.js-results-history');
    var clearhistory = function() {
      while (resultsHistory.lastChild) {
        resultsHistory.removeChild(resultsHistory.lastChild);
      };
      _toggle_history("close");
      snack.render('Roll history cleared');
    };
    if (_checkResultsHistory()) {
      prompt.render("Clear history?", "Are you sure you want to clear the roll history?", "Clear", clearhistory);
    };
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

  function _makeResultCurrentItem(results, total) {
    var p = document.createElement("p");
    p.setAttribute("class", "m-result-item");
    var spanResultWrapperDetails = document.createElement("span");
    spanResultWrapperDetails.setAttribute("class", "m-result-item-wrapper-details");
    var spanResultWrapperTotal = document.createElement("span");
    spanResultWrapperTotal.setAttribute("class", "m-result-item-wrapper-total");
    var spanResults = document.createElement("span");
    spanResults.setAttribute("class", "m-result-item-results");
    spanResults.textContent = "Rolled: " + results.join(", ");
    var spanTotal = document.createElement("span");
    spanTotal.setAttribute("class", "m-result-item-total");
    spanTotal.textContent = total;
    if (results.length > 1) {
      spanResultWrapperDetails.appendChild(spanResults);
    };
    spanResultWrapperTotal.appendChild(spanTotal);
    p.appendChild(spanResultWrapperDetails);
    p.appendChild(spanResultWrapperTotal);
    return p;
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
    bind: bind,
    set: set,
    history: history,
    destroy: destroy,
    render: render
  };

})();
