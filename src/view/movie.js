import { $html } from '../utils';
import BaseView from './base';

export default class MovieView extends BaseView {

    /**
     * @inheritDoc
     */
    constructor() {
        super(...arguments);
    }

    /**
     * @inheritDoc
     */
    init(hash) {
        super.init(...arguments);

        this.showMovie(hash);
    }

    /**
     * @inheritDoc
     */
    static getTemplate(movie) {
        if (!movie) {
            return '<h4>Sorry, movie was not found.</h4>';
        }

        const descriptionKeys = {
            'Language': 'Language',
            'Actors': 'Actors',
            'Country': 'Country',
            'Director': 'Director',
            'Genre': 'Genre',
            'Writer': 'Writer',
            'imdbRating': 'IMDB Rating'
        };

        let descriptionList = '';

        for (const key in descriptionKeys) {
            descriptionList += `
                <dt class="col-sm-3 text-truncate">${descriptionKeys[key]}</dt>
                <dd class="col-sm-9">${movie[key]}</dd>
            `;
        }

        const poster = this.getPoster(movie['Poster']);
        const output = `
            <div class="col-3">
                <img class="w-100 movie-poster" src="${poster}" data-toggle="tooltip" data-placement="top" title="${movie['Title']}">
            </div>
            <div class="col-9 card">
                <div class="card-body">
                    <h3 class="card-title">${movie['Title']} (${movie['Year']})</h3>
                    <h5 class="card-text">${movie['Plot']}</h5>
                    <dl class="row pt-3">
                        ${descriptionList}
                    </dl>
                </div>
            </div>
        `;

        return $html`${output}`;
    }

    /**
     * @param {String} movieId
     */
    showMovie(movieId) {
        fetch(`https://www.omdbapi.com/?apikey=${this.constructor.getApiKey()}&i=${movieId}`)
            .then(response => response.json())
            .then((data) => this.render(data))
            .catch(error => console.error(error));
    }
}
