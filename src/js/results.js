var results = (function() {

  var resultHistory = [];

  var checkForPreviousSession = (function() {
    if (helper.read('result-history')) {
      resultHistory = JSON.parse(helper.read('result-history'));
      _render_previousResultHistory();
    };
  })();

  function bind() {
    var resultsExpand = helper.e('.js-results-expand');
    var resultsClear = helper.e('.js-results-clear');
    resultsExpand.addEventListener('click', function() {
      _toggle_history();
    }, false);
    resultsClear.addEventListener('click', function() {
      destroy();
      session.remove();
    }, false);
  };

  function set(numberOfDice, dice, numberOfBonus, name, results, total) {
    var newResult = new _createResultObject(numberOfDice, dice, numberOfBonus, name, results, total);
    resultHistory.push(newResult);
  };

  function history() {
    return resultHistory
  };

  function update() {
    var resultsHistory = helper.e('.js-results-history');
    var index = resultHistory.length - 1;
    resultsHistory.insertBefore(_make_resultHistoryItem(resultHistory[index].numberOfDice, resultHistory[index].dice, resultHistory[index].numberOfBonus, resultHistory[index].name, resultHistory[index].results, resultHistory[index].total), resultsHistory.firstChild);
    _render_resultCurrent();
  };

  function render() {
    _render_previousResultHistory();
    _render_resultCurrent();
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

  function _render_resultCurrent() {
    if (resultHistory.length > 0) {
      var resultsCurrent = helper.e('.js-results-current');
      while (resultsCurrent.lastChild) {
        resultsCurrent.removeChild(resultsCurrent.lastChild);
      };
      var index = resultHistory.length - 1;
      resultsCurrent.appendChild(_make_resultCurrentItem(resultHistory[index].numberOfDice, resultHistory[index].dice, resultHistory[index].numberOfBonus, resultHistory[index].name, resultHistory[index].results, resultHistory[index].total), resultsCurrent.firstChild);
    };
  };

  function _render_previousResultHistory() {
    if (resultHistory.length > 0) {
      var resultsHistory = helper.e('.js-results-history');
      for (var i in resultHistory) {
        resultsHistory.insertBefore(_make_resultHistoryItem(resultHistory[i].numberOfDice, resultHistory[i].dice, resultHistory[i].numberOfBonus, resultHistory[i].name, resultHistory[i].results, resultHistory[i].total), resultsHistory.firstChild);
      };
    };
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

  function _make_resultCurrentItem(numberOfDice, dice, numberOfBonus, name, results, total) {
    var p = document.createElement("p");
    p.setAttribute("class", "m-result-item");
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
    p.appendChild(spanResultWrapperDetails);
    p.appendChild(spanResultWrapperTotal);
    return p;
  };

  function _make_resultHistoryItem(numberOfDice, dice, numberOfBonus, name, results, total) {
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
    render: render,
    update: update
  };

})();
