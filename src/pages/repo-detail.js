import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LabelItem from '../components/label-item';

export default React.createClass({
	displayName: 'RepoDetail',

	mixins: [ampersandMixin],

	onAddClick () {
		this.props.labels.add({
			name: '',
			color: '',
			editing: true,
			saved: false
		}, {at: 0});
	},

	render () {
		const {repo, labels} = this.props;

		return (
			<div>
				<h1>{repo.full_name}</h1>
				<p>
					<button onClick={this.onAddClick} className="button">Add new</button>
				</p>
				{labels.map((label) => {
					return (
						<LabelItem key={label.name} label={label} />
					);
				})}
			</div>
		);
	}
});
