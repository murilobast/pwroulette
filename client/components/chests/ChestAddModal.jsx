import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Creating navbar component
export default class ChestAddModal extends React.Component {
	render() {
		if (this.props.isOpen) {

			return (
				<ReactCSSTransitionGroup 
					transitionName="fade"
					transitionAppear={true}
					transitionEnterTimeout={1000}
					transitionAppearTimeout={2500}
					transitionLeaveTimeout={10}
				>
					{this.props.children}
				</ReactCSSTransitionGroup>
			);
		} else {
			
			return (
				<ReactCSSTransitionGroup
					transitionName="fade"
					transitionAppear={true}
					transitionEnterTimeout={1000}
					transitionAppearTimeout={2500}
					transitionLeaveTimeout={10}
				/>
			);
		}
	}
}