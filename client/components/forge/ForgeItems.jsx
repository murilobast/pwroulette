import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ForgeTabs from './ForgeTabs.jsx';
import ForgeItem from './ForgeItem.jsx';
import ForgeRequiredItem from './ForgeRequiredItem.jsx';
import ItemStatsWrapper from './ItemStatsWrapper.jsx';
import ForgeCost from './ForgeCost.jsx';
import Rouletter from '/client/lib/Rouletter.jsx';

export default class ForgeItems extends Component {
	constructor(props) {
		super(props);
		this.clicked = this.clicked.bind(this);
		this.roulette = this.roulette.bind(this);
	}

	roulette(e) {
		e.preventDefault();
		let item = Session.get('selectedItem');

		if (typeof item === 'undefined') {
			Session.set('selectedItem', this.props.items[0]);
			item = Session.get('selectedItem');
		}

		let adds = Addons.findOne({id: item.addType});
		let count = Session.get('count-' + item.id) || 0;
		let addons = [];

		if (Session.get('currentTab') < 3) {
			addons = new Rouletter(adds, 1);
		} else {
			addons = new Rouletter(adds, 0);
		}

		count++;
		Session.set('count-' + item.id, count);
		Session.set('add-' + item.id, addons);
	}

	clicked() {
		// Dirty fix
		this.forceUpdate();
	}

	render() {
		let items = this.props.items.filter(function (value) {
			return value.tab === this.tab;
		}, {tab: Session.get('currentTab') || 0});

		let selected = Session.get('selectedItem') || items[0];
		
		return (
			<ReactCSSTransitionGroup 
				transitionName="fade"
				transitionAppear={true}
				transitionEnterTimeout={1000}
				transitionAppearTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				<div className="window">
					<div className="forge">
						<div className="forge-window">
							<ForgeTabs clicked={this.clicked}/>
							<form id="roulette" onSubmit={this.roulette}>
								<button
									className="forge-window__start" type="submit">Iniciar</button>
							</form>
							<div className="forge-window__items">
								{items.map((item) => (
									<ForgeItem item={item} key={item.id} selected={selected.id === item.id} clicked={this.clicked}/>
								))}
							</div>
							<div className="forge-window__require">
								{selected.require.map((item) => (
									<ForgeRequiredItem key={item.id} item={item}/>
								))}
							</div>
							<div className="forge-window__selected">
								<img src={'/icons/' + selected.id + '.png'} alt=""/>
							</div>
						</div>
					</div>
					<div className="info">
						<ForgeCost item={selected} roulette={this.roulette}/>
						<ItemStatsWrapper item={selected}/>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
};