import React, {Component} from 'react';

export default class ChestItem extends Component {
	constructor() {
		super();
	}

	showFloatingText(e) {
		let $target = $(e.currentTarget);
		let $curTarget = $target.find('.floating__text').addClass('show');
	}

	hideFloatingText(e) {
		let $target = $(e.currentTarget);
		$target.find('.floating__text').removeClass('show');
	}

	lazyLoad() {
		$(this.refs.itemIcon).removeAttr('data-lazy');
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	render() {
		let item = this.props.item;
		let itemInfo = ItemInfo.findOne({id: item.id}) || {infos: []};
		let path = '//127.0.0.1:8181/' + item.id + '.png';
		// let path = '//static.pwsimulator.com/' + item.id + '.png';

		return (
			<div 
				className="chests__bag__container__inner__item floating chest"
				onMouseEnter={this.showFloatingText}
				onMouseLeave={this.hideFloatingText}
			>
				<img 
					src={path}
					data-lazy={true}
					onLoad={this.lazyLoad.bind(this)}
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