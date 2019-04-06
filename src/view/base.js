//<debug>
import { $assert } from '../utils';
//</debug>

export default class BaseView {

    constructor() {
        this.el = document.getElementById('target');

        //<debug>
        $assert(this.el, 'HTML element with the ID "target" was not found.');
        //</debug>
    }

    /**
     * @param {String} hash
     */
    init(hash) {
        this.constructor.setLoadingMask();
    }

    /**
     * @param {Object} data
     */
    render(data) {
        if (data['Response'] === 'True') {
            this.el.innerHTML = this.constructor.getTemplate(data);
        } else {
            //<debug>
            console.log(data);
            //</debug>

            this.el.innerHTML = `<h5>Sorry. ${data['Error'] || ''}</h5>`;
        }

        this.constructor.removeLoadingMask();
    }

    /**
     * @return {String}
     */
    static getApiKey() {
        return '338f9a63';
    }

    /**
     * @param {String} id
     * @return {Element}
     */
    static getElementById(id) {
        const element = document.getElementById(id);

        //<debug>
        $assert(element, `HTML element with the ID "${id}" was not found.`);
        //</debug>

        return element;
    }

    /**
     * @param {String} poster
     * @return {String}
     */
    static getPoster(poster) {
        return poster === 'N/A' ? '' : poster;
    }

    /**
     * @param {Object} data
     * @return {String}
     */
    static getTemplate(data){
        return '';
    }

    static setLoadingMask() {
        document.body.insertAdjacentHTML('beforeend', '<div id="loadingMask"><div class="loading-indicator"></div></div>');
    }

    static removeLoadingMask() {
        const element = document.getElementById('loadingMask');

        if (element) {
            element.parentNode.removeChild(element);
        }
    }
}
