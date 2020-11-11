let itemsArray = JSON.parse(localStorage.getItem('watchedList')) || [];

const toWatched = function () {
  const obj = JSON.parse(localStorage.getItem('currentFilm'));
  console.log(obj);
  if (
    itemsArray.find(e => 
      e.title === obj.title)
  ) {
    return;
  }
    itemsArray.push(obj);
    localStorage.setItem('watchedList', JSON.stringify(itemsArray));
    console.log(itemsArray);
};

export default {
  itemsArray: itemsArray,
  toWatched: toWatched
};
