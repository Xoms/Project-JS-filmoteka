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
import 'basicLightbox/dist/basicLightbox.min.css';
import paginationControl from './components/pagination.js';
import shareMovie from './telega.js'
import goToLibrary from './library.js';


class MainController {
  state = {};
  toWatch = [];
  watched = [];

  constructor() {
    window.addEventListener('load', this.onLoad);
    window.addEventListener('beforeunload', this.onClose);
    refs.ul.addEventListener('click', this.onModalOpen);

    this.state = JSON.parse(localStorage.getItem('state'));
  }

  onModalOpen = e => {
    e.preventDefault();
    // console.log("go to", goToLibrary);
    // console.log("onModalOpen");
    // console.log(e.target.parentNode);
    if (e.target.parentNode.nodeName !== 'A' || e.target.className === 'btn delete') {
      return;
    }

    let item = e.target.parentNode.querySelector('.data');
    // console.dir(item);
    const objPossibilities = {
      title: item.dataset.title,
      voteAverage: item.dataset.voteaverage,
      voteCount: item.dataset.votecount,
      overview: item.dataset.overview,
      popularity: item.dataset.popularity,
      originalTitle: item.dataset.originaltitle,
      genres: JSON.parse(item.dataset.genres),
      poster: item.dataset.poster,
    };
    // console.log(typeof objPossibilities.genres);
    localStorage.setItem('currentFilm', JSON.stringify(objPossibilities));
    const itemCard = modalCard(objPossibilities);
    this.instanceBox = basicLightbox.create(itemCard);
    this.instanceBox.show();
    const closeBtn = document.querySelector('.close-button');
    closeBtn.addEventListener('click', this.closeModal);
    const divButton = document.querySelector('#watched');
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

    const trailerBtn = document.querySelector('#watched-tailer');
    trailerBtn.addEventListener('click', renderTrailer);
    const telegaBtn = document.querySelector('.telega-btn');
    telegaBtn.addEventListener('click', shareMovie);
  
    const btnToLibrary = document.querySelector('#library-btn');
    // console.log(btnToLibrary);
    btnToLibrary.addEventListener('click', goToLibrary);
    btnToLibrary.addEventListener('click', this.closeModal);
    document.body.classList.toggle('scroll-hidden')

  };
  closeModal = (e) => {
    this.instanceBox.close()
    document.body.classList.toggle('scroll-hidden')
    }
    
  buttonModalClick = () => {
    //тут событие кнопки модалки - в очередь или просмторено
  };

  getState() {
    this.state = JSON.parse(localStorage.getItem('state'));
  }

  onLoad = () => {   
    render(1);
    paginationControl.renderPagination();
  };

  onClose() {
    this.state.toWatch = this.toWatch;
    this.state.watched = this.watched;
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}

const main = new MainController();
