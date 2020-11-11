import debounce from 'lodash.debounce';
import api from './api/apiService';
import render from './main.js';
import genres from './api/genresDb';
import refs from './refs.js'
import modalCard from '../partials/modal.hbs';
import * as basicLightbox from 'basiclightbox';

class MainController {

    state = {};
    toWatch = [];
    watched = [];

    constructor(){
        
        window.addEventListener('load', this.onLoad);
        window.addEventListener('beforeunload', this.onClose);
        refs.ul.addEventListener('click', this.onModalOpen)
        
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
            "genres" : JSON.parse(item.dataset.genres),
            "poster" : item.dataset.poster
        }
        const itemCard = modalCard(objPossibilities);
        const instanceBox = basicLightbox.create(
           itemCard
        ).show()
    }

    getState(){
        this.state = JSON.parse(localStorage.getItem('state')) || [];
    }
    getWidth(){
        this.width = document.screen.width; 
    }

    onLoad = () => {
       render(3);
    }

    onClose(){
        this.state.toWatch = this.toWatch;
        this.state.watched = this.watched;
        localStorage.setItem('state', JSON.stringify(this.state))
    }

  
    
}

const main = new MainController