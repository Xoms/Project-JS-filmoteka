import api from './api/apiService.js';
import main from '../partials/main.hbs'
import genres from './api/genresDb.js';
import genresRu from './api/genresDbRu.js';
import refs from './refs.js';
import ioController from './components/infiniteScroll';

function render(viewPage){

api.getTrends(viewPage)
.then(({movies, posters}) => {
  //console.log(movies, posters)
  const res = movies.results.map((el, i) => {
    let obj = {};
    obj.title = el.title;
    obj.releaseDate = Number.parseInt(el.release_date);
    obj.popularity = el.popularity;
    obj.voteAverage = el.vote_average;
    obj.voteCount = el.vote_count;
    obj.overview = el.overview;
    obj.originalTitle = el.original_title;
    obj.poster = posters[i];
    obj.genres = [];
    el.genre_ids.forEach(el => {
      let lang = localStorage.getItem('lang');
      if (lang === 'ru') {
        genresRu.forEach(({id, name}) => {
          if(el === id) {
            obj.genres.push(name);
          }
        })
      } else {
        genres.forEach(({id, name}) => {
          if(el === id) {
            obj.genres.push(name);
          }
        })
      }
    })
    obj.dataGenres = JSON.stringify(obj.genres);

    return obj;
  }) 
  return res;
})
.then(res => {
  refs.ul.insertAdjacentHTML('beforeend', main(res));
  localStorage.setItem('mode', 'default')
  //console.log(res);
  if(api.width < 768) {
    // localStorage.setItem('mode', 'scroll')
    ioController.createObserver(); //если мобилка - создаст инфинит скролл
  }
});
}

export default render