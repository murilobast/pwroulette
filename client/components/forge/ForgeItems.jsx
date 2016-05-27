import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ForgeTabs from './ForgeTabs.jsx';
import ForgeItem from './ForgeItem.jsx';
import ForgeRequiredItem from './ForgeRequiredItem.jsx';

export default class ForgeItems extends Component {
	constructor(props) {
		super(props);
		this.clicked = this.clicked.bind(this);
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
					<div className="forge centered">
						<div className="forge-window">
							<ForgeTabs/>
							<form action="" id="roulette">
								<button className="forge-window__start" type="submit">Iniciar</button>
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
				</div>
			</ReactCSSTransitionGroup>
		)
	}
};