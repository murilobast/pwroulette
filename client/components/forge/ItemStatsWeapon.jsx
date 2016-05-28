import React, {Component} from 'react';

export default class ItemStatsWeapon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let item = this.props.item;
		let mAtq = (typeof item.mAtq === 'string')
			? <p className="item__desc__atq">Ataque mágico {item.mAtq}</p> : '';

		return (
			<div className="weapon-stats-wrapper">
				<p className="item__desc__rate">Frequência de ataque (vezes/s) {item.freq}</p>
				<p className="item__desc__range">Alcance {item.alcan}</p>
				<p className="item__desc__atq">Ataque físico {item.pAtq}</p>
				{mAtq}
			</div>
		)
	}
}