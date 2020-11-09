import debounce from 'lodash.debounce';
import api from './js/api/apiService.js'
import './css/styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
api.page=1;
api.getTrends()
