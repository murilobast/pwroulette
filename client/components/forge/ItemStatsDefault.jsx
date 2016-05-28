import React, {Component} from 'react';

export default class ItemStatsDefault extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let item = this.props.item;

		return (
			<div className="default-stats-wrapper">
				<p className="item__desc__def">Def {item.pAtq}</p>
				<p className="item__desc__mdef">Def Metal {item.mAtq}</p>
				<p className="item__desc__mdef">Def Madeira {item.mAtq}</p>
				<p className="item__desc__mdef">Def Água {item.mAtq}</p>
				<p className="item__desc__mdef">Def Fogo {item.mAtq}</p>
				<p className="item__desc__mdef">Def Terra {item.mAtq}</p>
			</div>
		)
	}
}