import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestList from './ChestList.jsx';

export default class ChestsWrapper extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<section id="chests-list">
				<ReactCSSTransitionGroup 
					transitionName="fade"
					transitionAppear={true}
					transitionEnterTimeout={1000}
					transitionAppearTimeout={2000}
					transitionLeaveTimeout={1000}
				>
					<div className="title">
						<h2>Baús</h2>
					</div>
				</ReactCSSTransitionGroup>
				<ChestList chests={this.props.chests} featured={this.props.featured}/>
			</section>
		)
	}
};