import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
	displayName: 'LabelItem',

	mixins: [ampersandMixin],

	getInitialState () {
		const {name, color} = this.props.label;

		return {name, color};
	},

	onEditClick (e) {
		e.preventDefault();
		this.props.label.editing = true;
	},

	onCancelClick (e) {
		e.preventDefault();
		const {label} = this.props;

		if (label.saved) {
			label.editing = false;
			this.setState(this.getInitialState());
		} else {
			label.destroy();
		}
	},

	onDeleteClick (e) {
		e.preventDefault();
		this.props.label.destroy({
			success () {
				console.log('success');
			},
			error () {
				console.log('error');
			},
			wait: true
		});
	},

	onNameChange (e) {
		this.setState({
			name: e.target.value
		});
	},

	onColorChange (e) {
		this.setState({
			color: e.target.value.slice(1)
		});
	},

	onSubmit (e) {
		e.preventDefault();
		const {label} = this.props;

		if (label.saved) {
			label.update(this.state);
		} else {
			label.save(this.state, {
				success () {
					label.saved = true;
					label.editing = false;
				},
				error () {
					console.log('Please try again');
				}
			});
		}
	},

	render () {
		const {label} = this.props;
		const {color} = this.state;
		const cssColor = `#${color}`;

		let content;

		if (label.editing) {
			content = (
				<form className='label' onSubmit={this.onSubmit}>
					<span className='label-color avatar avatar-small avatar-rounded' style={{backgroundColor: cssColor}}>&nbsp;</span>
					<input name='name' onChange={this.onNameChange} value={this.state.name}/>
					<input name='color' onChange={this.onColorChange} value={cssColor}/>
					<button type='submit' className='button button-small'>Save</button>
					<button type='button' className='button button-small button-unstyled' onClick={this.onCancelClick}>cancel</button>
				</form>
			);
		} else {
			content = (
				<div className='label'>
					<span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
					<span>{label.name}</span>
					<span className='octicon octicon-pencil' onClick={this.onEditClick}></span>
					<span className='octicon octicon-x' onClick={this.onDeleteClick}></span>
				</div>
			);
		}

		return (
			<div>{content}</div>
		);
	}
});

