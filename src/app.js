import app from 'ampersand-app';
import Router from './router';
import Me from './models/me';

window.app = app;

require('./styles/main.styl');
require('octicons/octicons/octicons.css');

app.extend({
	init () {
		this.me = new Me();
		this.me.fetchInitialData();
		this.router = new Router();
		this.router.history.start();
	}
});

app.init();
