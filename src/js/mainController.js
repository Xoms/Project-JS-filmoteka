import debounce from 'lodash.debounce';
import api from './api/apiService';
import render from './main.js';
import genres from './api/genresDb';
import refs from './refs.js'
import modalCard from '../partials/modal.hbs'
import * as basicLightbox from 'basiclightbox';

class MainController {
    infiniteScroll = true;
    perPage = 5;
    wth = 320;

    state = {};
    toWatch = [];
    watched = [];
;
    constructor(){
        window.addEventListener('resize', debounce(this.onResize, 500));
        window.addEventListener('load', this.onLoad);
        window.addEventListener('beforeunload', this.onClose);
        refs.ul.addEventListener('click', this.onModalOpen)
        
        this.getWidth();
        api.getTrends();
        this.state = JSON.parse(localStorage.getItem('state'))
    }
    onModalOpen = (e) => {
        e.preventDefault()
    console.log(e.target.parentNode);
        if (e.target.parentNode.nodeName !== "A") {
            return
        }

        let item = e.target.parentNode.querySelector(".data");
        // console.dir(item);
        const objPossibilities = {
            "title" : item.dataset.title,
            "voteAverage": item.dataset.voteaverage,
            "voteCount" : item.dataset.votecount,
            "overview" : item.dataset.overview,
            "popularity" : item.dataset.popularity,
            "originalTitle": item.dataset.originaltitle,
            "genres" : item.dataset.genres,
            "poster" : item.dataset.poster
        }
        const itemCard = modalCard(objPossibilities);
        const instanceBox = basicLightbox.create(
           itemCard
        ).show()
    }
    buttonModalClick = () => {
        //тут событие кнопки модалки - в очередь или просмторено
    }

    getState(){
        this.state = JSON.parse(localStorage.getItem('state'))
    }
    getWidth(){
        // this.wth = document.screen.width; 
    }

    onLoad = () => {
       render();
    }

    onResize = (e)=>{
        this.wth = window.screen.width;
        if (this.wth < 768){
            this.perPage = 5;
            this.infiniteScroll = true;
        } else if (this.wth < 1024 && wth > 768){
            this.perPage = 8;
            this.infiniteScroll = false;
        } else if (this.wth >= 1024) {
            this.perPage = 9;
            this.infiniteScroll = false
        }
    }

    onClose(){
        this.state.toWatch = this.toWatch;
        this.state.watched = this.watched;
        localStorage.setItem('state', JSON.stringify(this.state))
    }

  
    
}

const main = new MainController