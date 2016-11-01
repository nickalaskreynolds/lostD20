var roller = (function() {

  function render(numberOfDice, whichDice, bonusModifier, rollName) {

    console.log('numberOfDice', numberOfDice);
    console.log('dice', whichDice);
    console.log('bonusModifier', bonusModifier);

    // make array
    var randomDiceResults = [];
    // populate array with natural rolls
    for (var i = 0; i < numberOfDice; i++) {
      randomDiceResults.push(Math.floor(Math.random() * whichDice) + 1)
    };
    console.log(randomDiceResults);
    // make lowest index var
    var lowestRollIndex;
    // find lowest number index in array
    var indexOfSmallestValue = function(array) {
      lowestRollIndex = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i] < array[lowestRollIndex]) {
          lowestRollIndex = i;
        };
      };
      return lowestRollIndex;
    };
    // run find the lowest value function passing in the array of rolls
    indexOfSmallestValue(randomDiceResults);
    // sum all array numbers
    var naturalMultipleRolls = randomDiceResults.reduce(function(a, b) {
      return a + b;
    });
    // check if drop lowest toggle is true or false
    // var toggleDropLowestState = nav_toggleDropLowest.dataset.active;
    // make a lowest subtract var
    var lowestToSubtract;
    if (numberOfDice > 1) {
    // if (toggleDropLowestState == "true" && numberOfDice > 1) {
      // ser var lowestToSubtract value to the index in randomDiceResults with the lowest value
      lowestToSubtract = randomDiceResults[lowestRollIndex];
      // wrap the content in the lowest value index with a span
      randomDiceResults[lowestRollIndex] = '<span class="strike">' + randomDiceResults[lowestRollIndex] + '</span>';
    } else {
      lowestToSubtract = 0;
    };
    // add bonus to final total
    var finalResult = naturalMultipleRolls + bonusModifier - lowestToSubtract;
    // make array with spaces for history
    var randomDiceResultsWithSpaces = randomDiceResults.join(", ");
    // pass arguments to roll function
    // createRollResult(numberOfDice, whichDice, bonusModifier, rollName, randomDiceResultsWithSpaces, lowestRollIndex, finalResult);
    // checkListListState();
    console.log(finalResult);
  };

  // exposed methods
  return {
    render: render
  };

})();
