import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestList from './ChestList.jsx';
import GoogleAd from 'react-google-ad';

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
				<GoogleAd client="ca-pub-9211196233969408" slot="4229088511" format="auto" />
				<ChestList chests={this.props.chests} featured={this.props.featured}/>
			</section>
		)
	}
};