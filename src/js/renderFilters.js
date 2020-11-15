import refs from "./refs.js"
import filters from "../partials/filters.hbs"

const renderFilters = (filtersList) => {
    refs.genresSelect.innerHTML = "";
    //console.log(filtersList);
    refs.genresSelect.insertAdjacentHTML('beforeend', filters(filtersList));
    let lang = localStorage.getItem('lang');
    if (lang === 'ru') {
      document.querySelectorAll('#genresSelect option')[0].innerHTML = "Все жанры";
    } else {
      document.querySelectorAll('#genresSelect option')[0].innerHTML = "Any genre"
    }
  }

  export default renderFilters