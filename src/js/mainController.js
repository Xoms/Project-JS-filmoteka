import debounce from 'lodash.debounce';
import api from './api/apiService';
import render from './main.js';
import genres from './api/genresDb';
import refs from './refs.js';
import renderTrailer from './trailer.js'
import modalCard from '../partials/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import toWatchedObj from './buttonWatched';
import addToQueue from './buttonAddToQueue';
import 'basicLightbox/dist/basicLightbox.min.css'
import paginationControl from './components/pagination.js';
import shareMovie from './telega.js'
import goToLibrary from './library.js';
import getSearсhArr from './search';
 

class MainController {

  lang = localStorage.getItem('lang') || 'en';
  mode = 'default';
  constructor() {
    window.addEventListener('load', this.onLoad);
    refs.ul.addEventListener('click', this.onModalOpen);
    refs.homeBtn.addEventListener('click', this.onLoad);
    refs.langSwitch.addEventListener('change', this.onLangSwitch)
  }

  onLangSwitch = (e) => {
    console.log(refs.langSwitch.checked);
    if (refs.langSwitch.checked) {
      this.lang = 'en';
      console.log('en');
    } else {
      this.lang = 'ru';
    }
    localStorage.setItem('lang', this.lang);
    api.lang = this.lang;
    this.mode = localStorage.getItem('mode');
    this.redrawLangChenge();    
    console.log(this.mode);
    if (this.mode === 'library'){
      return;
    }
    
    if (paginationControl.mode === 'default'){
      paginationControl.renderDefault(paginationControl.activePage || 1);

    } else { //если не дефолт - значит поиск
      getSearсhArr()
    }
  }

  redrawLangChenge(){
    console.log('switching to ',this.lang);
    console.log('mode = ', this.mode );
    switch(this.lang){
      case 'ru':
        refs.homeBtn.innerHTML = "ГЛАВНАЯ";
        refs.libraryBtn.innerHTML = "БИБЛИОТЕКА";
        if (this.mode === 'library'){
          document.querySelector('.header-bottom-library .watched').innerHTML = "Просмотрено";
          document.querySelector('.header-bottom-library .queue').innerHTML = "К просмотру";
        }
        if (this.modalIsOpen){
          document.querySelector('.overlay .go-home').innerHTML = "ГЛАВНАЯ";
          document.querySelector('.overlay .go-lab').innerHTML = "БИБЛИОТЕКА";
          document.querySelector('.overlay #watched').innerHTML = "Просмотрено";
          document.querySelector('.overlay #queue').innerHTML = "К просмотру";
          document.querySelector('.overlay #watched-tailer').innerHTML = "Трейлер";
          document.querySelector('.overlay #modalVotes').innerHTML = "Оценка / Голосов";
          document.querySelector('.overlay #modalPopularity').innerHTML = "Популярность";
          document.querySelector('.overlay #modalOriginalTitle').innerHTML = "Оригинал";
          document.querySelector('.overlay #modalGenre').innerHTML = "Жанры";
          document.querySelector('.overlay #modalAbout').innerHTML = "Описание";
        }
        break;
      case 'en':
        refs.homeBtn.innerHTML = "HOME";
        refs.libraryBtn.innerHTML = "MY LIBRARY";
        if (this.mode === 'library'){
          document.querySelector('.header-bottom-library .watched').innerHTML = "Watched";
          document.querySelector('.header-bottom-library .queue').innerHTML = "queue";
        }
        if (this.modalIsOpen){
          document.querySelector('.overlay .go-home').innerHTML = "HOME";
          document.querySelector('.overlay .go-lab').innerHTML = "MY LIBRARY";
          document.querySelector('.overlay #watched').innerHTML = "add to Watched";
          document.querySelector('.overlay #queue').innerHTML = "add to queue";
          document.querySelector('.overlay #watched-tailer').innerHTML = "WATCH TRAILER";
          document.querySelector('.overlay #modalVotes').innerHTML = "Vote / Votes";
          document.querySelector('.overlay #modalPopularity').innerHTML = "Popularity";
          document.querySelector('.overlay #modalOriginalTitle').innerHTML = "Original Title";
          document.querySelector('.overlay #modalGenre').innerHTML = "Genre";
          document.querySelector('.overlay #modalAbout').innerHTML = "About";
        }
        break;
    }
  }

 
  onModalOpen = e => {
    e.preventDefault();
    // console.log("go to", goToLibrary);
    // console.log("onModalOpen");
    // console.log(e.target.parentNode);
    
    if (e.target.parentNode.nodeName !== 'A' || e.target.className === 'btn delete') {
      return;
    }
    
    this.modalIsOpen = true;
    
    let item = e.target.parentNode.querySelector('.data');
    // console.dir(item);
    const objPossibilities = {
        "title" : item.dataset.title,
        "voteAverage": item.dataset.voteaverage,
        "voteCount" : item.dataset.votecount,
        "overview" : item.dataset.overview,
        "popularity" : item.dataset.popularity,
        "originalTitle": item.dataset.originaltitle,
        "genres" : JSON.parse(item.dataset.genres),
        "poster" : item.dataset.poster,
    };
    // console.log(typeof objPossibilities.genres);
    localStorage.setItem('currentFilm', JSON.stringify(objPossibilities));
    const itemCard = modalCard(objPossibilities);
    this.instanceBox = basicLightbox.create(itemCard);
    this.instanceBox.show();

    this.redrawLangChenge();
    console.dir(this.instanceBox);
    const closeBtn = document.querySelector('.close-button');
    closeBtn.addEventListener('click', this.closeModal);
    const divButton = document.querySelector('#watched');
    divButton.addEventListener('click', toWatchedObj.toWatched);
    divButton.addEventListener('click', () => {
      toWatchedObj.toWatched();
      divButton.classList.add('green');
   }
   );
    const button = document.querySelector('#queue');
    button.addEventListener('click', () => {
      addToQueue.addToQueueE();
      button.classList.add('green');
   }
   );

   function chengColorAdd() {
     let addToQueueArr = JSON.parse(localStorage.getItem('addToQueue')) || [];
     if (addToQueueArr.length) {
       addToQueueArr.some(
         e =>
           e.title === JSON.parse(localStorage.getItem('currentFilm')).title,
       )
         ? button.classList.add('green')
         : '';
     }
   }
   chengColorAdd();

   function chengColorWatched() {
     let watchedArr = JSON.parse(localStorage.getItem('watchedList')) || [];
     if (watchedArr.length) {
       watchedArr.some(
         e =>
           e.title === JSON.parse(localStorage.getItem('currentFilm')).title,
       )
         ? divButton.classList.add('green')
         : '';
     }
   }
   chengColorWatched();
    button.addEventListener('click', addToQueue.addToQueueE);
    const trailerBtn = document.querySelector('#watched-tailer');
    trailerBtn.addEventListener('click', renderTrailer);
    const telegaBtn = document.querySelector('.telega-btn');
    telegaBtn.addEventListener('click', shareMovie);
    const movieCard = document.querySelector(".movie_card");
    movieCard.scrollIntoView(top)
    const btnToLibrary = document.querySelector('#library-btn');
    // console.log(btnToLibrary);
    btnToLibrary.addEventListener('click', goToLibrary);
    btnToLibrary.addEventListener('click', this.closeModal);
    document.body.classList.toggle('scroll-hidden');
    // window.scrollTo(0, 1000);

  };

  closeModal = (e) => {
    this.instanceBox.close()
    this.modalIsOpen = false;
    document.body.classList.toggle('scroll-hidden')
    console.dir(this.instanceBox);
    }
  
  onLoad = () => {   
    if (this.lang == 'en'){
      refs.langSwitch.checked = true;
    }
    render(1);
    this.redrawLangChenge()    
    paginationControl.renderPagination();
  };

}

const main = new MainController();
