import React, {Component} from 'react';

export default class ForgeCost extends Component {
	constructor(props) {
		super(props);
	}

	format(num) {
		let n = num.toString();
		let p = n.indexOf('.');
		return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
			return p < 0 || i < p ? ($0+'.') : $0;
		});
	}

	render() {
		let item = this.props.item;
		let count = Session.get('count-' + item.id) || 0;
		let cost = (typeof item.cost === 'number')
			? this.format(count * item.cost)
			: 0;

		return (
			<div className="itemCost">
				<div className="itemCost__items">
					{item.require.map((rItem) => (
						<div className="itemCost__items__item" key={'cost-' + rItem.id}>
							<div className="itemCost__items__item__icon floating">
									<img src={'/icons/items/' + rItem.id + '.png'} alt={rItem.name}/>
									<div className="floating__text">{rItem.name}</div> 
								<div className="itemCost__items__item__amount">{count * rItem.amount}</div>
							</div>
						</div>
					))}
				</div>
				<form action="" id="roulette">
					<input type="submit" value="Roletar" className="itemCost__roulette" onClick={this.props.roulette}/>
				</form>
				<div className="itemCost__total">
					<span>{cost}</span>
				</div>
			</div>
		)
	}
}