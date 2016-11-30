import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
	mixins: [ampersandMixin],

	render () {
		const {repos} = this.props;

		return (
			<div>
				<h2>Repos</h2>
				<ul className="list-unstyled">
					{repos.map((repo) => {
						return (
							<li key={repo.id}>
								<a href={repo.appUrl}>
									<span className="octicon octicon-repo"> {repo.full_name}</span>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
});
