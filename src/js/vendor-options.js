(function() {

  if (document.querySelector(".js-quick-nav")) {
    var quickNavHeight = parseInt(getComputedStyle(document.querySelector(".js-quick-nav")).height, 10);
  };

  smoothScroll.init({
    speed: 600,
    offset: quickNavHeight
  });

  // var element_formulas_list = document.querySelector(".formulas .list");
  // var sortable = Sortable.create(element_formulas_list, {
  //   animation: 150,
  //   onSort: function(event) {
  //     localStorage.setItem("saved-formulas", element_formulas_list.innerHTML);
  //   }
  // });

})();
