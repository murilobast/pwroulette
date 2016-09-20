import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestBag from './ChestBag.jsx';
import ChestDrops from './ChestDrops.jsx';
import GoogleAd from 'react-google-ad';

const placeholder = {
	items: []
}

export default class FullChest extends Component {
	constructor(props) {
		super(props);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		
		// SEO
		prerenderReady = true;
		let desc = (props.chest.desc)
			? props.chest.desc
			: 'Simule a abertura de ' + props.chest.name;
			
		SEO.set({
			title: props.chest.name + ' - PW Simulator',
			description: desc + ' - Simulador de drops de báus para Perfect World',
			meta: {
				'property="og:title"': props.chest.name + ' - PW Simulator'
			}
		});
	}

	render() {		
		let chest = this.props.chest;
		let items = (chest.avatar) ? placeholder.items : chest.items;

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
						<h2>{chest.name}</h2>
					</div>
				</ReactCSSTransitionGroup>
				<div className="chests">
					<ReactCSSTransitionGroup 
						transitionName="fade"
						transitionAppear={true}
						transitionEnterTimeout={1000}
						transitionAppearTimeout={1000}
						transitionLeaveTimeout={1000}
					>
						<ChestBag chest={chest}/>
					</ReactCSSTransitionGroup>
					<GoogleAd client="ca-pub-9211196233969408" slot="4229088511" format="auto" />
					<ChestDrops list={chest.items} items={items} key="chestDrops"/>
				</div>
			</section>
		)
	}
}
