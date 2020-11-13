let itemArray = JSON.parse(localStorage.getItem('addToQueue')) || [];

const addToQueueE = function () {
  const obj = JSON.parse(localStorage.getItem('currentFilm'));
  if (
    itemArray.find(e => 
      e.title === obj.title)
  ) {
    return;
  }
    itemArray.push(obj);
    localStorage.setItem('addToQueue', JSON.stringify(itemArray));
    console.log(itemArray);
};

export default {
  itemArray: itemArray,
  addToQueueE: addToQueueE
};
