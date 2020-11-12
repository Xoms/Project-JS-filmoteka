import debounce from "lodash.debounce"
import refs from "./refs.js"
import genresMap from "./api/genresDb"
import api from "./api/apiService"
import main from "../partials/main.hbs"
import renderCards from "./render"

let query;

refs.userSearchForm.addEventListener("submit", e => {
  e.preventDefault();
  let userInput = refs.userInputField.value;  

  const validInputRegex = /^[a-zA-Z0-9а-яА-Я\s]+$/;
  if (userInput.match(validInputRegex)) {
    refs.onInvalidSearch.classList.add("hidden")
    refs.onNoResult.classList.add("hidden")
    console.log(userInput);
    query = userInput; 
    
    const allMoviesList = [];
    api
      .getAllResults(query)
      .then(searchResult => { 
        searchResult.forEach(({movies, posters}) => {
          movies.results.forEach((movie, i) => {
            let obj = {};
            obj.title = "name" in movie ? movie.name : movie.title;
            obj.releaseDate = "first_air_date" in movie ? movie.first_air_date : movie.release_date;
            obj.popularity = movie.popularity;
            obj.voteAverage = movie.vote_average;
            obj.voteCount = movie.vote_count;
            obj.overview = movie.overview;
            obj.originalTitle = "original_name" in movie ? movie.original_name : movie.original_title; 
            obj.poster = posters[i];          

            obj.genres = [];
            movie.genre_ids.forEach(id => {
              let genreSets = genresMap.find(props => props.id === id);
              let genreName = genreSets ? genreSets.name : "";
              obj.genres.push(genreName);
            })
            obj.dataGenres = JSON.stringify(obj.genres);

            allMoviesList.push(obj);
          })
        })
        // sort by popularity descending
        return allMoviesList.sort((m1, m2) => (m1.popularity < m2.popularity) ? 1 : -1);
      })
      .then(moviesList => {
        if (moviesList.length > 0) {
          renderCards(moviesList)
        } else { 
          refs.onNoResult.classList.remove("hidden")
        }
      });
  } else {
    refs.errorMessage.classList.remove("hidden")
  }
})
