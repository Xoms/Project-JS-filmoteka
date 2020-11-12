import refs from "./refs.js"
import filters from "../partials/filters.hbs"

const renderFilters = (filtersList) => {
    refs.genresSelect.innerHTML = "";
    console.log(filtersList);
    refs.genresSelect.insertAdjacentHTML('beforeend', filters(filtersList));
  }

  export default renderFilters