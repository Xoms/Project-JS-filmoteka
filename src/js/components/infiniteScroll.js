import render from '../main.js'; //этот рисует карточки популярных фильмов
import refs from '../refs.js';
import main from '../../partials/main.hbs'; //Шаблон картотеки

class InfiniteScroll {
    options = {}
    page = 2
    searchPage = 2
    constructor() {

    }

    createObserver(){
        this.mode = localStorage.getItem('mode') //search || trends || library || undefined;

        if (!this.mode || this.mode === 'library') {
            return
        }

        this.images = document.querySelectorAll('.movies img');
        
        if (this.mode === 'default') {
            this.imageObserver = new IntersectionObserver(this.onTrends, this.options);
            this.imageObserver.observe(this.images[this.images.length - 1]);
        } else {
            this.imageObserver = new IntersectionObserver(this.onSearch, this.options);
            this.imageObserver.observe(this.images[this.images.length - 1]);
        }
    }

    onTrends = (entries, observer) => {

        entries.forEach( entry => {
            if (entry.isIntersecting) {        
                render(this.page);
                console.log(this.page)
                this.page++;                
                this.images = document.querySelectorAll('.movies img');
                this.imageObserver.observe(this.images[this.images.length - 1]);
                this.imageObserver.unobserve(entry.target);
                console.log(this.images[this.images.length - 1]);
            }
        })
    }

    onSearch = (entries, observer) => {
        let start = this.searchPage * 5 - 5;
        let end = this.searchPage  * 5;

        entries.forEach( entry => {
            if (entry.isIntersecting) {                
                let snapshot = this.searchList.slice(start, end);
                refs.ul.insertAdjacentHTML('beforeend', main(snapshot));
                
                this.images = document.querySelectorAll('.movies img');
                this.imageObserver.observe(this.images[this.images.length - 1]);
                this.imageObserver.unobserve(entry.target);
                this.searchPage++;
                    
            }
        })
    }

    get searchList(){
        return this._searchList;
    }

    set searchList(val){
        this._searchList = val; 
    }

    destroyObserver(){
        if (this.imageObserver){
            this.imageObserver.disconnect();
            this.page = 1;
        }
    }
}

export default new InfiniteScroll;