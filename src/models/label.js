import Model from 'ampersand-model';
import githubMixin from '../helpers/github-mixin';
import xhr from 'xhr';
import app from 'ampersand-app';

export default Model.extend(githubMixin, {
	ajaxConfig: function () {
		return {
			headers: {
				Authorization: 'token ' + app.me.token
			}
		};
	},

	idAttribute: 'name',

	props: {
		name: 'string',
		color: 'string'
	},

	session: {
		editing: {
			type: 'boolean',
			default: false
		},
		saved: {
			type: 'boolean',
			default: true
		}
	},

	isNew () {
		return !this.saved;
	},

	update (attributes) {
		const oldAttributes = this.getAttributes({
			props: true,
			session: false
		});

		xhr({
			url: this.url(),
			json: attributes,
			method: 'PATCH'
		}, (err, req, body) => {
			if (err) {
				this.set(oldAttributes);
				console.log('Error');
			}
		});
		this.set(attributes);
	}
});
