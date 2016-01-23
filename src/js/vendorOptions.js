function vendorOptions() {

  var element_formulas_list = document.querySelector(".formulas .list");
  var sortable = Sortable.create(element_formulas_list, {
    animation: 500,
    onSort: function(event) {
      localStorage.setItem("saved-formulas", element_formulas_list.innerHTML);
    }
  });

};

vendorOptions();
