import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestItem from './ChestItem.jsx';
import ChestDropsForm from './ChestDropsForm.jsx';

export default class ChestDrops extends Component {
	constructor() {
		super();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		let chest = this.props.chest;

		return (
			<ReactCSSTransitionGroup 
				transitionName="fade"
				transitionAppear={true}
				transitionEnterTimeout={1000}
				transitionAppearTimeout={2000}
				transitionLeaveTimeout={1000}
			>
				<div className="chests__drops" id="drops">
					<ChestDropsForm items={chest.items}/>
					<ul className="chests__drops__list">

						{chest.items.map((item, i) => (
							<li className="chests__drops__list__item" key={'drop-' + i}>
								<ChestItem item={item}/>
								<span className="chests__drops__list__item__info">
									<p>{item.name}</p>
									<p>Chance: <i>{item.weight.toFixed(3)}%</i></p>
								</span>
							</li>
						))}

					</ul>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}