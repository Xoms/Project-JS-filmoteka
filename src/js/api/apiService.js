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

    }

    ckeckPerPage(viewPage){ //viewPage - страница пагинации

        let startDiap = this._page * 20 - 20; //начало элементов ответа
        let endDiap = this._page * 20; //конец элементов ответа

        let factStart = viewPage * this.perPage - this.perPage; //Фактически отображаеме старт
        let factEnd = viewPage * this.perPage; //последний из фактически отображаемых фильмов
    
        console.log("factEnd = ", factEnd)
        console.log('viewPage = ', viewPage);

        //ниже рассчет нужной страницы запроса - если наши фильмов больше, чем в текущем запросе - 
        //то сделать еще запрос, чтоб достал страницу с нужными фильмами О_о 
        let neededPage = 1;
        if (factStart < startDiap) {
            neededPage = Math.ceil(factStart / 20);
        } else if (factEnd >= endDiap) {
            neededPage = Math.ceil(factEnd / 20);
        }
        
        
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
                // if (ckeckPerPage(viewPage))
                const imgArr = res.results.map( (el, i) => 
                    (el.poster_path) ? 
                    `${IMG_BASE_URL}w500${el.poster_path}` :
                    `data:image/jpeg;base64,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`
                )
                return {movies: res, 'posters': imgArr}
            })

        console.log(res); //20 шт
        //  
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
        return fetch(`${BASE_URL}search/movie?language=ru&query=${query}&page=${this._page}`, options) //change multi to movie
            .then(res => res.json())
            .then(res => {
                const imgArr = res.results.map( el => (el.poster_path) ? 
                `${IMG_BASE_URL}w500${el.poster_path}` :
                `data:image/jpeg;base64,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`
                )
                console.dir(res, imgArr);
                return {movies: res, 'posters': imgArr}
            })
    }

    async getAllResults(query){
        this._page = 1;
        let currentRes = await this.getMoviesByQuery(query);
        let resultsArr = [currentRes];
        for (let i = 1; i < currentRes.movies.total_pages; i++) {
            this._page++;
            resultsArr.push(await this.getMoviesByQuery(query));

        }
        console.log(resultsArr);
        return resultsArr;
    }
}
 const api = new FilmotekaApi;

 export default api

 //api.getMoviesByQuery(query);
 //api.getTrends()