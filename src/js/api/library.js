import api from './apiService.js'

const btn = document.querySelector('.queue-btn')
const goToLibrary = function () {
  const filmArr = JSON.parse(localStorage.getItem('toWatch'));

}
console.log(api.getTrends());