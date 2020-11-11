import refs from "./refs.js"
import main from "../partials/main.hbs"

const renderCards = (res) => {
    refs.ul.innerHTML = "";
    console.log(res);
    refs.ul.insertAdjacentHTML('beforeend', main(res));
  }

  export default renderCards