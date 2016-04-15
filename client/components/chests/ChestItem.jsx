import React, {Component} from 'react';

const placeholder = {
	infos: {infos: []}
}

export default class ChestItem extends Component {
	constructor() {
		super();

		this.lazyLoad = this.lazyLoad.bind(this);
	}
	
	showFloatingText(e) {
		let target = e.currentTarget.getElementsByClassName('floating__text')[0];
		target.classList.add('show');
	}

	hideFloatingText(e) {
		let target = e.currentTarget.getElementsByClassName('floating__text')[0];
		target.classList.remove('show');
	}

	lazyLoad() {
		$(this.refs.itemIcon).removeAttr('data-lazy');
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	render() {
		let item = this.props.item;
		let itemInfo = ItemInfo.findOne({id: item.id}) || placeholder.infos;
		let path = '//static.pwsimulator.com/' + item.id + '.png';

		return (
			<div 
				className="chests__bag__container__inner__item floating chest"
				onMouseEnter={this.showFloatingText}
				onMouseLeave={this.hideFloatingText}
			>
				<img 
					src={path}
					data-lazy={true}
					onLoad={this.lazyLoad}
					alt={item.name}
					ref="itemIcon"
				/>
				<span className="chests__bag__container__inner__item__amount">{item.amount}</span>
				<div className="floating__text">
					<span>{item.name}</span>
					<p>
						{itemInfo.infos.map((info, i) => (
							<span style={{color: info.color}} key={'desc' + i} dangerouslySetInnerHTML={this.createMarkup(info.text)}></span>
						))}
					</p>
				</div>
			</div>
		)
	}
}