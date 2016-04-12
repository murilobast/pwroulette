import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestBag from './ChestBag.jsx';
import ChestDrops from './ChestDrops.jsx';

export default class FullChest extends Component {
	render() {
		let chest = this.props.chest;
		
		return (
			<section id="chests-list">
				<div className="title">
					<h2>{chest.name}</h2>
				</div>
				<div className="chests">
					<ReactCSSTransitionGroup 
						transitionName="shake"
						transitionAppear={true}
						transitionEnterTimeout={1000}
						transitionAppearTimeout={1000}
						transitionLeaveTimeout={1000}
					>
						<ChestBag chest={chest}/>
					</ReactCSSTransitionGroup>
					<ChestDrops chest={chest} />
				</div>
			</section>
		)
	}
}
