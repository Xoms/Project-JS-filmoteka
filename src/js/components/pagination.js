import paginationTpl from '../../partials/pagination.hbs';
import refs from '../refs.js';
import api from '../api/apiService.js';
import render from '../main.js'; //этот рисует карточки популярных фильмов
import renderCards from '../renderCards'; //этот рисует карточки поиска

class PaginationController {
    _searchList = [];
    constructor() {
        refs.pagination.addEventListener('click', this.onPaginationClick);
        api.onResize();
    }

    onPaginationClick = (e) =>{
        e.preventDefault();
        
        if (e.target.nodeName !=='A'){
            return;
        }

        this.perPage = localStorage.getItem('perPage');
        const current = e.target;
        let curentFirst;
        let currentActive;

        switch (current.dataset.content){
            case "First": 
                this.changePages(1);
                this.onPaginationBtn();
                break;

            case "Prev":
                curentFirst = +this.pageBtns[0].dataset.content - 1
                this.changePages(curentFirst);

                this.onPaginationBtn();
                break; 

            case "Next": 
                curentFirst = +this.pageBtns[0].dataset.content + 1
                this.changePages(curentFirst);

                this.onPaginationBtn();
                break;

            case "Last": 
                this.changePages(this.pagesToView - 2);
                
                this.onPaginationBtn();
                break;

            default: //значит попали в кнопу со страницей
                currentActive = refs.pagination.querySelector(".active");
                currentActive.classList.remove('active');
                current.parentNode.classList.add('active');

                this.onPaginationBtn();
                break;
        }
    }
    onPaginationBtn(){
        let currentActive = refs.pagination.querySelector(".active");
        let page = currentActive.children[0].dataset.content
        console.log(this.searchList);
        
        if (!this.searchList.length){
            this.renderDefault(page)
        } else {
            this.renderSearch(page)
        }        
    }

    renderDefault(vPage){ //Страницы из дефолта
        this.pagesToView = localStorage.getItem('pagesToView');
        refs.ul.innerHTML = '';
        render(vPage);
    }

    renderSearch(vPage){ //Страница пагинации из поиска
        this.perPage = localStorage.getItem('perPage'); //там в зависимотси от ширины экрана кол-во фильмов на странице
        this.pagesToView = Math.floor(this.searchList.length / this.perPage); //общее кол-во страниц
        localStorage.setItem ('pagesToView', this.pagesToView); //надо переписать, т.к., оно может браться также из апи)
        this.checkPagesQnt(); 
        let start = vPage * this.perPage - this.perPage;
        let end = vPage * this.perPage;

        let snapshot = this.searchList.slice(start, end);
        renderCards(snapshot);
    }

    checkPagesQnt(){ //Убирает ненужные элементы управления пагинации, если запрос < 3х страницы пагинации
        this.pagesToView = localStorage.getItem('pagesToView');
        console.log(this.pagesToView);
        console.log(this.pageBtns.length);
        if (this.pagesToView < this.pageBtns.length){
            refs.pagination.removeChild(this.prevBtn.parentNode);
            refs.pagination.removeChild(this.nextBtn.parentNode);
            refs.pagination.removeChild(this.firstBtn.parentNode);
            refs.pagination.removeChild(this.lastBtn.parentNode);
            while (this.pagesToView < this.pageBtns.length){
                let cur = this.pageBtns.pop();
                refs.pagination.removeChild(cur.parentNode);
            }
        }
        
    }

    get searchList(){
        return this._searchList
    }

    set searchList(val) {
        this._searchList = val; 
    }

    changePages(startVal) { //переписывает цифры на страницах и блокирует не нужные эл-ты управления
        // console.log(this.pageBtns[0].dataset.content);
        if (startVal + 2 >= this.pagesToView){
            startVal = this.pagesToView - 2;
            this.lastBtn.parentNode.classList.add('disabled');
            this.nextBtn.parentNode.classList.add('disabled');
            
            this.firstBtn.parentNode.classList.remove('disabled');
            this.prevBtn.parentNode.classList.remove('disabled');       
        }

        if (startVal == 1){
            this.firstBtn.parentNode.classList.add('disabled');
            this.prevBtn.parentNode.classList.add('disabled');

            this.lastBtn.parentNode.classList.remove('disabled');
            this.nextBtn.parentNode.classList.remove('disabled');
        } else {
            this.firstBtn.parentNode.classList.remove('disabled');
            this.prevBtn.parentNode.classList.remove('disabled');
            this.lastBtn.parentNode.classList.remove('disabled');
            this.nextBtn.parentNode.classList.remove('disabled');
        }
        this.pageBtns.forEach(el => {
            el.dataset.content = startVal;
            el.innerHTML = startVal;
            startVal++;
        })
    }

    renderPagination() {
        refs.pagination.innerHTML = paginationTpl();
        this.pageBtns = Array.from(refs.pagination.querySelectorAll('[data-page]'));
        this.prevBtn = refs.pagination.querySelector('[data-content="Prev"]');
        this.nextBtn = refs.pagination.querySelector('[data-content="Next"]');
        this.firstBtn = refs.pagination.querySelector('[data-content="First"]');
        this.lastBtn = refs.pagination.querySelector('[data-content="Last"]');

        this.pagesToView = localStorage.getItem('pagesToView');
        this.perPage = localStorage.getItem('perPage');
        this.checkPagesQnt();
    }
}
export default new PaginationController