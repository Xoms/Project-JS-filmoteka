import api from './api/apiService.js';
import main from '../partials/main.hbs';
import refs from './refs.js';
import buttonLibrary from '../partials/header.hbs';


const goToLibrary = function (e) {
  e.preventDefault();
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
  
  const showWathed = function () {
    const arrWatched = JSON.parse(localStorage.getItem('watchedList'));
    if (arrWatched) {
      arrWatched.map(el => el.dataGenres = JSON.stringify(el.genres));
    }
    btnWatched.classList.add('is-active');
    btnQueue.classList.remove('is-active');
    refs.mainSection.innerHTML = main(arrWatched);
      document.querySelectorAll('.delete').forEach(el => {
        el.removeAttribute('hidden');
        
      });
    refs.mainSection.addEventListener('click', (e) => {
      let item = JSON.parse(localStorage.getItem('watchedList'));
      item.map(el => el.dataGenres = JSON.stringify(el.genres));
      console.log("item", item);
      const nameFilm = e.target.parentNode.dataset.title;
          const newList = JSON.stringify(item.filter(el => el.title !== nameFilm));
          localStorage.setItem('watchedList', newList);
          refs.mainSection.innerHTML = main(JSON.parse(newList));
          document.querySelectorAll('.delete').forEach(el => el.removeAttribute('hidden'));
         
          
          console.log(e);
          // console.log(e.target.parentNode.dataset.title);
        })
  }

  showWathed();
  
  const showQueue = function () {
    const arrQueue = JSON.parse(localStorage.getItem('addToQueue'));
    if (arrQueue) {
      arrQueue.map(el => el.dataGenres = JSON.stringify(el.genres));
    } 
    btnQueue.classList.add('is-active');
    btnWatched.classList.remove('is-active');
    refs.mainSection.innerHTML = main(arrQueue);
     document.querySelectorAll('.delete').forEach(el =>el.removeAttribute('hidden'))
    // del.removeAttribute
     refs.mainSection.addEventListener('click', (e) => {
          let item = JSON.parse(localStorage.getItem('addToQueue'));
          item.map(el => el.dataGenres = JSON.stringify(el.genres));
          const nameFilm = e.target.parentNode.dataset.title
          const newList = JSON.stringify(item.filter(el => el.title !== nameFilm));
          localStorage.setItem('addToQueue', newList);
          refs.mainSection.innerHTML = main(JSON.parse(newList));
          document.querySelectorAll('.delete').forEach(el => el.removeAttribute('hidden'));
         
          console.log(newList);
          console.log(e);
          console.log(e.target.parentNode.dataset.title);
        })
  }
  
  btnQueue.addEventListener('click', showQueue);
  btnWatched.addEventListener('click', showWathed);
}

refs.libraryBtn.addEventListener('click', goToLibrary);

export default goToLibrary;

