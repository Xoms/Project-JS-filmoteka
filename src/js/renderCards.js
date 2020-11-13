import refs from "./refs.js"
import main from "../partials/main.hbs"

const renderCards = (res) => {
  refs.ul.innerHTML = "";
  if(!res.length) {
    refs.ul.innerHTML = (`<li><img class="nothingFoundImg" 
          src='https://st2.depositphotos.com/8029582/12255/v/600/depositphotos_122553578-stock-illustration-emoticon-throws-up-his-hands.jpg'>
          </li>`);
    return;
  }
    refs.ul.insertAdjacentHTML('beforeend', main(res));
  }

  export default renderCards