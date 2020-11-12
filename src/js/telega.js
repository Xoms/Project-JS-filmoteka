const shareMovie = function() {
  const q = JSON.parse(localStorage.getItem('currentFilm'))
  console.log(q);
  const title = q.title;
  const voteAverage = q.voteAverage;
  const poster = q.poster;
  const genres = q.genres;
  const url = 'https://vink92.github.io/goit-js-hw-13';
  document.querySelector('.telega-link').setAttribute('href', 
  `https://telegram.me/share/url?text=${poster}      
  Смотри какой фильм : "${title}" ===>>> 
  Жанр: ${genres} ===>>> 
  Оценка: ${voteAverage} ===>>> 
  Больше читай тут ===>>> ${url}&url=https://vink92.github.io/goit-js-hw-13`);
}
 export default shareMovie;
