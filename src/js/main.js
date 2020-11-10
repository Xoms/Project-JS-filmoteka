import api from './api/apiService.js';
import main from '../partials/main.hbs'
import genres from './api/genresDb.js';
import refs from './refs.js';

function render(){

api.getTrends()
.then(({movies, posters}) => {
  const res = movies.results.map((el, i) => {
    let obj = {};
    obj.title = el.title;
    obj.releaseDate = el.release_date;
    obj.popularity = el.popularity;
    obj.voteAverage = el.vote_average;
    obj.voteCount = el.vote_count;
    obj.overview = el.overview;
    obj.originalTitle = el.original_title;
    obj.poster = posters[i];
    obj.genres = [];
    el.genre_ids.forEach(el => {
      genres.forEach(({id, name}) => {
        if(el === id) {
          obj.genres.push(name);
        }
      })
    })
    obj.dataGenres = JSON.stringify(obj.genres);

    // console.log(obj);  
    return obj;
  }) 
  return res;
})
.then(res => refs.ul.insertAdjacentHTML('beforeend', main(res)));

}
export default render