import React, {Component} from 'react';

export default class ForgeItem extends Component {
	constructor(props) {
		super(props);

		this.setSelected = this.setSelected.bind(this);
		this.showFloatingText = this.showFloatingText.bind(this);
		this.hideFloatingText = this.hideFloatingText.bind(this);
	}

	showFloatingText(e) {
		this.refs.floatingText.classList.add('show');		
	}

	hideFloatingText(e) {
		this.refs.floatingText.classList.remove('show');
	}

	setSelected() {
		this.props.clicked();
		Session.set('selectedItem', this.props.item);
	}

	render() {
		let item = this.props.item;
		let active = (this.props.selected) ? 'active' : '';

		return (
			<div 
				key={item.id}
				className={'forge-window__items__item floating ' + active}
				id="item"
				onClick={this.setSelected}
				onMouseEnter={this.showFloatingText}
				onMouseLeave={this.hideFloatingText}
			>
				<img src={'/icons/' + item.id + '.png'} alt=""/>
				<div className="floating__text" ref="floatingText">{item.name}</div>
			</div>
		)
	}
}