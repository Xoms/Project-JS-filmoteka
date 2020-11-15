const shareMovie = function() {
  const q = JSON.parse(localStorage.getItem('currentFilm'))
  const title = q.title;
  const voteAverage = q.voteAverage;
  const poster = q.poster;
  const genres = q.genres;
  const url = 'https://gal4enock.github.io/Project-JS-filmoteka/';
  document.querySelector('.telega-link').setAttribute('href', 
  `https://telegram.me/share/url?text=${poster}      
  Смотри какой фильм : "${title}" ===>>> 
  Жанр: ${genres} ===>>> 
  Оценка: ${voteAverage} ===>>> 
  Больше читай тут ===>>> ${url}&url=${url}`);
}
 export default shareMovie;
