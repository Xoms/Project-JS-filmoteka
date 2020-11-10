import api from './api/apiService.js';
import main from './main.js';
import refs from './refs.js';
import buttonLibrary from '../partials/header.hbs';
const btn = document.querySelector('.queue-btn')


const goToLibrary = function (e) {
  e.preventDefault();
  refs.inputContainer.classList.add('hidden');
  refs.headerLibrary.classList.add('header-library');
  refs.homeBtn.classList.remove('is-active-btn');
  refs.libraryBtn.classList.add('is-active-btn');
  refs.headerContainer.insertAdjacentHTML('beforeend', buttonLibrary());
  refs.mainSection.textContent = '';
  // const filmArr = JSON.parse(localStorage.getItem('toWatch'));

}
// console.log(JSON.parse(localStorage.getItem('toWatch')));
// console.log(api.getTrends());
console.log(refs.mainSection);
refs.libraryBtn.addEventListener('click', goToLibrary)
// btn, orange, white