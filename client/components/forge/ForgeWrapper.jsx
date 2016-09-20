import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ForgeItems from './ForgeItems.jsx';
import GoogleAd from 'react-google-ad';

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
				<GoogleAd client="ca-pub-9211196233969408" slot="4229088511" format="auto" />
				<ForgeItems items={this.props.items}/>
			</section>
		)
	}
};