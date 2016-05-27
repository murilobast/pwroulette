import React, {Component} from 'react';

export default class ForgeItem extends Component {
	constructor(props) {
		super(props);

		this.setSelected = this.setSelected.bind(this);
	}

	setSelected() {
		this.props.clicked();
		Session.set('selectedItem', this.props.item);
	}

	render() {
		let item = this.props.item;
		let active = (this.props.selected) ? 'active' : '';

		return (
			<div key={item.id} className={'forge-window__items__item floating ' + active} id="item" onClick={this.setSelected}>
				<img src={'/icons/' + item.id + '.png'} alt=""/>
				<div className="floating__text">{item.name}</div>
			</div>
		)
	}
}