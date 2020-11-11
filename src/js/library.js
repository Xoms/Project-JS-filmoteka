import api from './api/apiService.js';
import main from '../partials/main.hbs';
import refs from './refs.js';
import buttonLibrary from '../partials/header.hbs';


const goToLibrary = function (e) {
  e.preventDefault();
  refs.inputContainer.classList.add('hidden');
  refs.headerLibrary.classList.add('header-library');
  refs.homeBtn.classList.remove('is-active-btn');
  refs.libraryBtn.classList.add('is-active-btn');
  document.querySelector('.queue') ? '' : refs.headerContainer.insertAdjacentHTML('beforeend', buttonLibrary());
  refs.mainSection.textContent = '';
  
  const btnQueue = document.querySelector('.queue');
  const btnWatched = document.querySelector('.watched');
  
  
  const showWathed = function () {
    const arrWatched = JSON.parse(localStorage.getItem('watchedList'));
    arrWatched.map(el => el.dataGenres = JSON.stringify(el.genres));
    btnWatched.classList.add('is-active');
    btnQueue.classList.remove('is-active');
    refs.mainSection.innerHTML = main(arrWatched);
    
  }
  
  const showQueue = function () {
    const arrQueue = JSON.parse(localStorage.getItem('addToQueue'));
    
    arrQueue.map(el => el.dataGenres = JSON.stringify(el.genres));
    
    
    btnQueue.classList.add('is-active');
    btnWatched.classList.remove('is-active');
    refs.mainSection.innerHTML = main(arrQueue);
  }
  
  btnQueue.addEventListener('click', showQueue);
  btnWatched.addEventListener('click', showWathed);
}

refs.libraryBtn.addEventListener('click', goToLibrary);

