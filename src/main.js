import { $on } from './utils';
import Controller from './controller';

class App {

    constructor() {
        this.controller = new Controller();
    };
}

const app = new App();

const setView = () => {
    app.controller.setView(document.location.hash);
};

$on(window, 'load', setView);
$on(window, 'hashchange', setView);
