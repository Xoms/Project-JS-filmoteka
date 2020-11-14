import refs from "./refs.js"
import genresMap from "./api/genresDb"
import api from "./api/apiService"
import renderCards from "./renderCards"
import renderFilters from "./renderFilters"
import getAllUniqueMoviesGenres from "./filterByGenre"
import pagination from "./components/pagination"
import ioController from './components/infiniteScroll';

let query;

const searchFormHandle =  e => {
  // refs.addText.removeAttribute('hidden');
  // refs.addForm.removeAttribute('hidden');
  if (e) {
    e.preventDefault();
  } 
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
        pagination.searchList = moviesList;
        pagination.renderPagination();

        localStorage.setItem('searchResults', JSON.stringify(moviesList))
        localStorage.removeItem('filteredSearchResults')

        if (moviesList.length > 0) {
          // renderCards(moviesList)
          pagination.renderSearch(1);

          const allUniqueMoviesGenres = getAllUniqueMoviesGenres(moviesList)
          renderFilters(allUniqueMoviesGenres)
          if(api.width < 768) {
            ioController.searchList = moviesList;
            ioController.createObserver(); //если мобилка - создаст инфинит скролл
          }
        } else { 
          refs.onNoResult.classList.remove("hidden");
          refs.filterWrapper.classList.add('hidden');

          refs.ul.innerHTML = (`<li><img class="nothingFoundImg" 
          src='https://st2.depositphotos.com/8029582/12255/v/600/depositphotos_122553578-stock-illustration-emoticon-throws-up-his-hands.jpg'>
          </li>`);
          refs.pagination.innerHTML = '';
        }
      });
  } else {
    refs.filterWrapper.classList.add('hidden');
    refs.onNoResult.classList.add("hidden")
    refs.onInvalidSearch.classList.remove("hidden")
    refs.ul.innerHTML = (`<li><img class="nothingFoundImg" 
          src='https://st2.depositphotos.com/8029582/12255/v/600/depositphotos_122553578-stock-illustration-emoticon-throws-up-his-hands.jpg'>
          </li>`);
    refs.pagination.innerHTML = '';
  }
} 

refs.userSearchForm.addEventListener("submit", searchFormHandle);
refs.userInputField.addEventListener("change", searchFormHandle);

 let moviesToRender

refs.genresSelect.addEventListener("change", e => {
  
  const filterValue = refs.genresSelect.value;
  const moviesList = JSON.parse(localStorage.getItem('searchResults'))

 
  if (filterValue === 'Any genre') {
    localStorage.removeItem('filteredSearchResults')
    moviesToRender = moviesList;
  } else {
    moviesToRender = moviesList.filter(movie => {
      console.log(movie.genres + ' contains ' + filterValue);
      return movie.genres.includes(filterValue);
    })

    localStorage.setItem('filteredSearchResults', JSON.stringify(moviesToRender))
  }

  if (refs.yearSelect.value !== "All years range"){
    secondFilterHandler();
    return
  }

  pagination.searchList = moviesToRender;
  pagination.renderPagination();
  
  pagination.renderSearch(1);

  console.log("this is", moviesToRender);

  // renderPagination(moviesToRender);
})

function secondFilterHandler (e) {

  let secondFilterResult
  const filterValue = refs.yearSelect.value;
  console.log(filterValue);

  if (!moviesToRender) {
    moviesToRender = JSON.parse(localStorage.getItem('searchResults'))
  } 

  if (filterValue === "All years range"){
    secondFilterResult = moviesToRender;
  } else {
    let startYear = filterValue.split(" ")[0];
    let endYear = filterValue.split(" ")[2];
    secondFilterResult = moviesToRender.filter(movie =>
       movie.releaseDate.split('-')[0] >= startYear && movie.releaseDate.split('-')[0] <=endYear)
 
  }

  pagination.searchList = secondFilterResult;
  pagination.renderSearch(1);

  console.log("this is sec filter", secondFilterResult);
  pagination.renderPagination();
}

refs.yearSelect.addEventListener('change', secondFilterHandler)

export default searchFormHandle;