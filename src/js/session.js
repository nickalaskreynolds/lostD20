var session = (function() {

  var resultHistoryKey = 'result-history';

  function save() {
    helper.store(resultHistoryKey, JSON.stringify(results.history()));
  };

  function load() {
    return JSON.parse(helper.read(resultHistoryKey));
  };

  function remove() {
    helper.remove(resultHistoryKey);
  };

  // if (helper.read("allCharacters")) {
  //   allCharacters = JSON.parse(helper.read("allCharacters"));
  // } else if (typeof hardCodedCharacters !== "undefined") {
  //   allCharacters = JSON.parse(JSON.stringify(hardCodedCharacters.demo)); // for demo load sample characters
  //   // allCharacters = [blank.data]; // for production load blank character
  // };

  // exposed methods
  return {
    save: save,
    load: load,
    remove: remove
  };

})();
