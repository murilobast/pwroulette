import React, {Component} from 'react';

export default class ForgeItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let item = this.props.item;
		return (
			<div className="forge-window__require__item">
				<div className="forge-window__require__item__icon floating">
					<img src={'/icons/items/' + item.id + '.png'}/>
					<div className="floating__text">{item.name}</div>
				</div>
				<div className="forge-window__require__item__amount">{item.amount}</div>
			</div>
		)
	}
}