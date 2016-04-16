import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestBag from './ChestBag.jsx';
import ChestDrops from './ChestDrops.jsx';

const placeholder = {
	items: []
}

export default class FullChest extends Component {
	constructor(props) {
		super(props);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {		
		let chest = this.props.chest;
		let items = (chest.avatar) ? placeholder.items : chest.items;

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
					<ChestDrops list={chest.items} items={items} key="chestDrops"/>
				</div>
			</section>
		)
	}
}
