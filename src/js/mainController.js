import debounce from 'lodash.debounce';
import api from './api/apiService';
import render from './main.js';
import genres from './api/genresDb';

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
        
        this.getWidth();
        api.getTrends();
        this.state = JSON.parse(localStorage.getItem('state'))
    }

    buttonModalClick = () => {
        //тут событие кнопки модалки - в очередь или просмторено
    }

    getState(){
        this.state = JSON.parse(localStorage.getItem('state'))
    }
    getWidth(){
        this.wth = document.screen.width;
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