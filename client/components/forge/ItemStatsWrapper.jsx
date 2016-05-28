import React, {Component} from 'react';
import ItemStatsWeapon from './ItemStatsWeapon.jsx';
import ItemStatsDefault from './ItemStatsDefault.jsx';

export default class ItemStatsWrapper extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let item = this.props.item;
		let addons = Session.get('add-' + item.id) || [];

		let stats = (item.itemType === 0)
			? <ItemStatsWeapon item={item}/>
			: <ItemStatsDefault item={item}/>;

		let attr = (typeof Session.get('add-' + item.id) === 'undefined')
			? <p className="item__desc__adic">Atributo adicional.</p>
			: '';

		return (
			<div className="item">
				<div className="item__desc">
					<h3 className="item__desc__name">{item.name}</h3>
					<p className="item__desc__type">{item.type}</p>
					<p className="item__desc__grade">Nv. {item.grade}</p>
					{stats}
					<p className="item__desc__dur">Durabilidade {item.dur}</p>
					<p className="item__desc__req">Restrição de classe {item.rest}</p>
					{item.req.map((text, i) => (
						<p className="item__desc__req" key={'req-' + i}>{text}</p>
					))}
					{addons.map((text, i) => (
						<p  className="item__desc__attr" key={'add-' + i} dangerouslySetInnerHTML={{__html: text}}></p>
					))}
					{attr}
				</div>
			</div>
		)
	}
}