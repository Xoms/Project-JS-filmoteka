import GENRES from './genresDb.js';

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

    constructor(){
        
    }

    set page(val) {
        this._page = val;
    }

    get page (){
        return this._page;
    }

    getTrends() { 
        return fetch(`${BASE_URL}discover/movie?sort_by=popularity.desc&page=${this._page}&language=ru`, options)
            .then( res => res.json() )
            .then(res => {
                const imgArr = res.results.map( el => `${IMG_BASE_URL}w500${el.poster_path}`)
                return {movies: res, 'posters': imgArr}
            }).then(res => console.log(res))
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
                console.dir(res, imgArr);
                return {movies: res, 'posters': imgArr}
            })
    }
}
 const api = new FilmotekaApi
 export default api

 /*api.getMoviesByQuery(query)
 /*api.getTrends()*/