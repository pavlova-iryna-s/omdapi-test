import { $html, $on } from '../utils';
import BaseView from './base';

export default class MoviesListView extends BaseView {

    /**
     * @inheritDoc
     */
    constructor() {
        super(...arguments);

        this.addListeners();
    }

    /**
     * @inheritDoc
     */
    init(hash) {
        const [searchText, pageNumber] = hash.split('/');

        this.constructor.getElementById('searchText').value = searchText;
        this.constructor.getElementById('pageNumber').value = pageNumber;

        if (searchText) {
            super.init(...arguments);

            this.searchMovies();
        }
    }

    /**
     * @inheritDoc
     */
    render(data) {
        super.render(...arguments);

        this.constructor.getElementById('pagination').innerHTML = data['Response'] === 'True' ? this.getPaginationTemplate(...arguments) : '';
    }

    /**
     * @inheritDoc
     */
    static getTemplate(data) {
        const movies = data && data['Search'];

        if (!movies) {
            return '<h4>Sorry, no movies were found.</h4>';
        }

        let output = '';

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            const poster = this.getPoster(movie['Poster']);

            output += `
                <a href="movie.html#${movie['imdbID']}" class="col-3 m-3 p-0 movie">
                    <img class="h-100 w-100 movie-poster" src="${poster}" data-toggle="tooltip" data-placement="top" title="${movie['Title']}">
                    <h4 class="m-0 text-truncate">${movie['Title']}</h4>
                </a>
            `;
        }

        const COLS_PER_ROW = 3;
        const trailingColumns = movies.length % COLS_PER_ROW;

        if (trailingColumns) {
            output += '<div class="col-3 m-3 p-0"></div>'.repeat(COLS_PER_ROW - trailingColumns);
        }

        return $html`${output}`;
    }

    /**
     * @param {Object} data
     * @return {String}
     */
    getPaginationTemplate(data) {
        const MOVIES_PER_PAGE = 10;
        const MAX_PAGES_COUNT = 15;
        const pagesCount = Math.ceil(data['totalResults'] / MOVIES_PER_PAGE);
        const searchText = this.getSearchText();
        const currentPage = this.getCurrentPageNum();
        const isFirst = currentPage === 1 ? 'disabled' : '';
        const isLast = currentPage === pagesCount ? 'disabled' : '';
        const middle = ((MAX_PAGES_COUNT - 1) / 2);

        let output = `<li class="page-item ${isFirst}"><a class="page-link" href="#${searchText}/1">First</a></li>`;
        let i = 1;

        if (pagesCount > MAX_PAGES_COUNT) {
            if (pagesCount - currentPage < middle) {
                i = pagesCount - MAX_PAGES_COUNT + 1;
            } else if (currentPage > middle) {
                i = currentPage - middle;
            }
        }

        for (let limit = 1; limit <= pagesCount && limit <= MAX_PAGES_COUNT;) {
            const isActive = currentPage === i ? 'active' : '';

            output += `<li class="page-item ${isActive}"><a class="page-link" href="#${searchText}/${i}">${i}</a></li>`;

            i++;
            limit++;
        }

        output += `<li class="page-item ${isLast}"><a class="page-link" href="#${searchText}/${pagesCount}">Last</a></li>`;

        return $html`${output}`;
    }

    addListeners() {
        $on(this.constructor.getElementById('searchForm'), 'submit', () => {
            window.location.hash = `#${this.getSearchText()}/1`;
        });
    }

    /**
     * @return {String}
     */
    getSearchText() {
        return this.constructor.getElementById('searchText').value || '';
    }

    /**
     * @return {Number}
     */
    getCurrentPageNum() {
        return +this.constructor.getElementById('pageNumber').value || 1;
    }

    searchMovies() {
        fetch(`https://www.omdbapi.com/?apikey=${this.constructor.getApiKey()}&s=${this.getSearchText()}&page=${this.getCurrentPageNum()}`)
            .then(response => response.json())
            .then((data) => this.render(data))
            .catch(error => console.error(error))
    }
}
