import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ForgeItems from './ForgeItems.jsx';

export default class ForgeWrapper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section id="forge">
				<ReactCSSTransitionGroup 
					transitionName="fade"
					transitionAppear={true}
					transitionEnterTimeout={1000}
					transitionAppearTimeout={1000}
					transitionLeaveTimeout={1000}
				>
					<div className="title">
						<h2>Roletar Adds</h2>
					</div>
				</ReactCSSTransitionGroup>
				<ForgeItems items={this.props.items} handler={this.props.handleItems}/>
			</section>
		)
	}
};