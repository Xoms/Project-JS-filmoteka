import GENRES from './genresDb.js';
import debounce from 'lodash.debounce';
const API_KEY_V3 = '1c82be463eec2d8b6de50f5ad36006eb'; //на всякий случай - ключ в строку если добавлять, а так везде тулим options (v4 key)
const API_KEY_V4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgyYmU0NjNlZWMyZDhiNmRlNTBmNWFkMzYwMDZlYiIsInN1YiI6IjVmOWZiYTFmY2EwZTE3MDAzYjRkZTljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pioIw9ZjnLVCSLXXsSHDarKErsdPXcQ3JCynCs6jkII'

const BASE_URL = 'https://api.themoviedb.org/3/'
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/'



const options = {
    headers: {
        'Authorization': `Bearer ${API_KEY_V4}`,
    }
}


 class FilmotekaApi {
    _page = 1;

    infiniteScroll = true;
    width = window.screen.width;

    constructor(){
        this.onResize();
        window.addEventListener('resize', debounce(this.onResize, 500));
    }
    
    onResize = () => { //тут получим ширину экрана при ресайзе вьюпорта
        this.width = window.screen.width;
        console.log(this.width)
        if (this.width < 768){
            this.perPage = 5;
            this.infiniteScroll = true;

        } else if (this.width < 1024 && this.width > 768){
            this.perPage = 8;
            this.infiniteScroll = false;

        } else if (this.width >= 1024) {
            this.perPage = 9;
            this.infiniteScroll = false
        }
        console.log(this.perPage)
    }

    ckeckPerPage(viewPage){ //viewPage - страница пагинации

        let startDiap = this._page * 20 - 20; //начало элементов ответа
        let endDiap = this._page * 20; //конец элементов ответа

        let factStart = viewPage * this.perPage - this.perPage; //Фактически отображаеме старт
        let factEnd = viewPage * this.perPage; //последний из фактически отображаемых фильмов
    
        console.log("factEnd = ", factEnd)
        console.log('viewPage: ', viewPage);

        //ниже рассчет нужной страницы запроса - если наши фильмов больше, чем в текущем запросе - 
        //то сделать еще запрос, чтоб достал страницу с нужными фильмами О_о 
        let neededPage = (endDiap <= factEnd) ? this._page : this._page + 1; 
        
        console.log('Needed_page: ', neededPage);
        return (neededPage === this._page) 
            //true все ок, нужные фильмы есть в запросе
            //false тогда надо сделать еще 1 запрос т.к. нужные фильмы не вместились 
    }

    set page(val) { //сет страницы в запросе
        this._page = val;
    }

    get page (){ //получение страницы в запросе
        return this._page;
    }

    async getTrends(viewPage) { 
        let res = await fetch(`${BASE_URL}discover/movie?sort_by=popularity.desc&page=${this._page}&language=en`, options)
            .then( res => res.json() )
            .then(res => {
                const imgArr = res.results.map( (el, i) => `${IMG_BASE_URL}w500${el.poster_path}`)
                return {movies: res, 'posters': imgArr}
            })

        console.log(res)
        console.log(this.ckeckPerPage(viewPage))
        return res;
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        //получает ответ в виде объекта с ключом movies, и массива адресов картинок posters,
        //movies - объект с page = 1; total_pages = 1000; total_results = 20000;
        //а так же с массивом таких объектов в results:
        /*
        adult: false
        backdrop_path: "/hbrXbVoE0NuA1ORoSGGYNASagrl.jpg"
        genre_ids: [35]
        id: 740985
        media_type: "movie"
        original_language: "en"
        original_title: "Borat Subsequent Moviefilm"
        overview: "14 years after making a film about his journey across the USA, Borat risks life and limb when he returns to the United States with his young daughter, and reveals more about the culture, the COVID-19 pandemic, and the political elections."
        popularity: 774.843
        poster_path: "/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg"
        release_date: "2020-10-23"
        title: "Borat Subsequent Moviefilm"
        video: false
        vote_average: 6.7
        vote_count: 707

        */

    getMoviesByQuery(query){
        return fetch(`${BASE_URL}search/multi?language=ru&query=${query}&page=${this._page}`, options)
            .then(res => res.json())
            .then(res => {
                const imgArr = res.results.map( el => `${IMG_BASE_URL}w500${el.poster_path}`)
                //console.dir(res, imgArr);
                return {movies: res, 'posters': imgArr}
            })
    }
}
 const api = new FilmotekaApi;

 export default api

 //api.getMoviesByQuery(query);
 //api.getTrends()