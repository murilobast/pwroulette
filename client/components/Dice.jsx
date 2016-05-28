import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Blaze} from 'meteor/blaze';

export default class Dice extends Component {
	componentDidMount() {
		this.view = Blaze.render(
			Template.dice,
			ReactDOM.findDOMNode(this.refs.container)
		);
	}

	componentWillUnmount() {
		Blaze.remove(this.view);
	}
	
	render() {
		return <span ref="container" />
	}
};