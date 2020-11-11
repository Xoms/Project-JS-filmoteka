import api from './api/apiService.js';
import main from './main.js';
import refs from './refs.js';
import buttonLibrary from '../partials/header.hbs';


const goToLibrary = function (e) {
  e.preventDefault();
  refs.inputContainer.classList.add('hidden');
  refs.headerLibrary.classList.add('header-library');
  refs.homeBtn.classList.remove('is-active-btn');
  refs.libraryBtn.classList.add('is-active-btn');
  refs.headerContainer.insertAdjacentHTML('beforeend', buttonLibrary());
  refs.mainSection.textContent = '';
  
  const btnQueue = document.querySelector('.queue');
  const btnWatched = document.querySelector('.watched');
  console.log(btnQueue);
  
  const showWathed = function () {
    const arrwatched = JSON.parse(localStorage.getItem('watchedList'));
    btnWatched.classList.add('is-active');
    btnQueue.classList.remove('is-active');
  }
  
  const showQueue = function () {
    const arrQueue = JSON.parse(localStorage.getItem('addToQueue')); 
    btnQueue.classList.add('is-active');
    btnWatched.classList.remove('is-active');
  }
  
  btnQueue.addEventListener('click', showQueue);
  btnWatched.addEventListener('click', showWathed);
}

refs.libraryBtn.addEventListener('click', goToLibrary);

