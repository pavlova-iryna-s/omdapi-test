import MoviesListView from'./view/moviesList';
import MovieView from './view/movie';

export default class Controller {

    /**
     * @param {String} hash
     */
    init(hash) {
        this.currentView.init(hash);
    }

    renderMovie() {
        if (!(this.currentView instanceof MovieView)) {
            this.currentView = new MovieView();
        }
    }

    renderMoviesList() {
        if (!(this.currentView instanceof MoviesListView)) {
            this.currentView = new MoviesListView();
        }
    }

    /**
     * @param {String} hash
     */
    setView(hash) {
        hash = hash.substring(1);

        if ( /^.*\/index.html$/.test(window.location.pathname)) {
            this.renderMoviesList();
        } else {
            this.renderMovie();
        }

        this.init(hash);
    }
}
