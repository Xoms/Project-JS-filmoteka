import api from './apiService.js';
import main from '../main.js';

const btn = document.querySelector('.queue-btn')
const goToLibrary = function () {
  const filmArr = JSON.parse(localStorage.getItem('toWatch'));

}
console.log(JSON.parse(localStorage.getItem('toWatch')));
console.log(api.getTrends());

// btn, orange, white