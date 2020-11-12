import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css'

const API_KEY_TRAILER = 'AIzaSyBqR_xZyTugU-WGd-2fjTioyG04DKQLh-4';

const fetchTrailer = function() {
  let id;
  const q = JSON.parse(localStorage.getItem('currentFilm')).title + ' trailer';
  console.log(q);
  // const q = 'Pirates of the Caribbean'; // в q нужно передать title объекта 
  return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${API_KEY_TRAILER}`)
  .then(res => res.json())
  .then(res => {
    (res.items).find(el => {
      if (el.id.kind === 'youtube#video') {
        id = el.id.videoId;
      }
    })
    // console.log(id);
    return id;
  })
} // запрос на поиск айдишника

const renderTrailer = function() {
  fetchTrailer()
  .then
  (id => {
    // console.log(id);
    const instance = basicLightbox.create(
    `<iframe class="modal-trailer" 
    src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
).show()
})

} // для рендера трейлера

export default renderTrailer