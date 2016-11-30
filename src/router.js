import app from 'ampersand-app';
import React from 'react';
import Router from 'ampersand-router';
import qs from 'qs';
import xhr from 'xhr';
import Layout from './layout';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import RepoDetail from './pages/repo-detail';

export default Router.extend({
	renderPage (page, opts = {layout: true}) {
		if (opts.layout) {
			page = (
				<Layout me={app.me}>
					{page}
				</Layout>
			);
		}

		React.render(page, document.body);
	},

	routes: {
		'': 'public',
		'repos': 'repos',
		'login': 'login',
		'auth/callback?:query': 'authCallback',
		'logout': 'logout',
		'repo/:owner/:name': 'repoDetail'
	},

	public () {
		this.renderPage(<PublicPage/>, {layout: false});
	},

	repos () {
		this.renderPage(<ReposPage repos={app.me.repos}/>);
	},

	login () {
		window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
			scope: 'user,repo',
			redirect_uri: window.location.origin + '/auth/callback',
			client_id: 'f8dd69187841cdd22a26'
		});
	},

	authCallback (query) {
		query = qs.parse(query);
		console.log(query);

		xhr({
			url: 'http://labelr-dev.herokuapp.com/authenticate/' + query.code,
			json: true
		}, (error, req, body) => {
			console.log(body);
			app.me.token = body.token;

			this.redirectTo('repos');
		});
	},

	logout () {
		window.localStorage.clear();
		window.location = '/';
	},

	repoDetail (owner, name) {
		const model = app.me.repos.getByFullName(owner + '/' + name);
		this.renderPage(<RepoDetail repo={model} labels={model.labels}/>);
	}
});
