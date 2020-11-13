import api from './api/apiService.js';
import main from '../partials/main.hbs';
import refs from './refs.js';
import buttonLibrary from '../partials/header.hbs';


const goToLibrary = function (e) {
  e.preventDefault();
  localStorage.setItem('mode', 'library');
  refs.pagination.innerHTML = '';
  refs.inputContainer.classList.add('hidden');
  refs.headerLibrary.classList.add('header-library');
  refs.homeBtn.classList.remove('is-active-btn');
  refs.libraryBtn.classList.add('is-active-btn');
  document.querySelector('.queue') ? '' : refs.headerContainer.insertAdjacentHTML('beforeend', buttonLibrary());
  refs.mainSection.textContent = '';
  
  const btnQueue = document.querySelector('.queue');
  const btnWatched = document.querySelector('.watched');
  btnWatched.classList.add('is-active');

  let lang = localStorage.getItem('lang');
  if (lang == 'ru'){
    btnQueue.innerHTML = 'К просмотру';
    btnWatched.innerHTML = 'Просмотрено';
  } else {
    btnQueue.innerHTML = 'queue';
    btnWatched.innerHTML = 'Watched';
  }
  let currentList = 'watchedList'
  
  const showWathed = function () {
    currentList = 'watchedList'
    const arrWatched = JSON.parse(localStorage.getItem('watchedList'));
    if (arrWatched.length === 0 || !arrWatched) {
      refs.mainSection.innerHTML = `<li><img class="nothingFoundImg" 
          src='https://st2.depositphotos.com/8029582/12255/v/600/depositphotos_122553578-stock-illustration-emoticon-throws-up-his-hands.jpg'>
          </li>`;
    }
    if (arrWatched.length > 0) {
      arrWatched.map(el => el.dataGenres = JSON.stringify(el.genres));
      refs.mainSection.innerHTML = main(arrWatched);
    }
    btnWatched.classList.add('is-active');
    btnQueue.classList.remove('is-active');
      document.querySelectorAll('.delete').forEach(el => {
        el.removeAttribute('hidden');
        
      });
  }

  showWathed();
  
  const showQueue = function () {
    currentList = 'addToQueue';
    const arrQueue = JSON.parse(localStorage.getItem('addToQueue'));
    console.log("arrQueuearrQueue", Boolean (arrQueue.length === 0));
    if (arrQueue.length === 0 || !arrQueue) {
      console.log(refs.mainSection);
      refs.mainSection.innerHTML = `<li><img class="nothingFoundImg" 
          src='https://st2.depositphotos.com/8029582/12255/v/600/depositphotos_122553578-stock-illustration-emoticon-throws-up-his-hands.jpg'>
          </li>`;
    } else if (arrQueue !== 0) {
      arrQueue.map(el => el.dataGenres = JSON.stringify(el.genres));
      refs.mainSection.innerHTML = main(arrQueue);
    } 
    btnQueue.classList.add('is-active');
    btnWatched.classList.remove('is-active');
    
     document.querySelectorAll('.delete').forEach(el =>el.removeAttribute('hidden'))
    // del.removeAttribute
    
  }

  refs.mainSection.addEventListener('click', (e) => {
    let item = JSON.parse(localStorage.getItem(currentList));
    item.map(el => el.dataGenres = JSON.stringify(el.genres));
    const nameFilm = e.target.parentNode.dataset.title
    
    const newList = JSON.stringify(item.filter(el => el.title !== nameFilm));
    localStorage.setItem(currentList, newList);
    if (JSON.parse(newList).length === 0 || item.length === 0) {
      console.log(refs.mainSection);
      refs.mainSection.innerHTML = `<li><img class="nothingFoundImg" 
            src='https://st2.depositphotos.com/8029582/12255/v/600/depositphotos_122553578-stock-illustration-emoticon-throws-up-his-hands.jpg'>
            </li>`;
    } else if (newList.length > 0) {
      refs.mainSection.innerHTML = main(JSON.parse(newList));
    }
        document.querySelectorAll('.delete').forEach(el => el.removeAttribute('hidden'));
      
        console.log(newList);
        console.log(e);
        console.log(e.target.parentNode.dataset.title);
  })
  
  btnQueue.addEventListener('click', showQueue);
  btnWatched.addEventListener('click', showWathed);
}

refs.libraryBtn.addEventListener('click', goToLibrary);

export default goToLibrary;

