import debounce from "lodash.debounce"
import refs from "./refs.js"
import genresMap from "./api/genresDb"
import api from "./api/apiService"
import main from "../partials/main.hbs"
import renderCards from "./render"




let query;



refs.userInputField.addEventListener("input", debounce( ()=>{  
     let userInput = refs.userInputField.value;  

    const validInputRegex = /^[a-zA-Z0-9а-яА-Я\s]+$/;
    if(userInput.match(validInputRegex)) {
      refs.errorMessage.classList.add("hidden")
      console.log(userInput);
      query = userInput; 

      api.getMoviesByQuery(query)
      .then(({movies, posters}) => {
        console.log(movies, posters);
        const res = movies.results.map((movie, i) => {
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
console.log("Movie", movie);
console.log("movie", movie);      
console.log("genre ids", movie.genre_ids);
          movie.genre_ids.forEach(id => {

let genreSets = genresMap.find(props => props.id === id);
let genreName = genreSets ? genreSets.name : "";
       obj.genres.push(genreName);
          })
          console.log("Our obj", obj);  
          return obj;
        }) 
        console.log(res);

        return res;
        
      })
      .then (res=>  renderCards(res))
    }
    else {
    refs.errorMessage.classList.remove("hidden")
    
    }
       }, 500))
