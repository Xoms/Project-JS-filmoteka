import paginationTpl from '../../partials/pagination.hbs';
import refs from '../refs.js';

class PaginationController {
    pagesToView = localStorage.getItem('pagesToView')
    constructor() {
        refs.pagination.addEventListener('click', this.onPaginationClick);
    }
    onPaginationClick = (e) =>{
        e.preventDefault();
        console.log(e.target);
    }

    renderPagination() {
        refs.pagination.innerHTML = paginationTpl();
    }
}
export default new PaginationController