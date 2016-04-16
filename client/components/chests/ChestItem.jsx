import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const placeholder = {
	infos: {infos: []}
}

export default class ChestItem extends Component {
	constructor() {
		super();

		this.lazyLoad = this.lazyLoad.bind(this);
		this.showFloatingText = this.showFloatingText.bind(this);
		this.hideFloatingText = this.hideFloatingText.bind(this);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	// change
	showFloatingText(e) {
		let target = e.currentTarget.getElementsByClassName('floating__text')[0];
		target.classList.add('show');

		if (typeof this.refs.avatar !== 'undefined') {
			let img = this.refs.avatar;
			let dataset = img.dataset;

			if (typeof dataset.avatar !== 'undefined') {
				img.src = dataset.avatar;
				delete dataset.avatar;
			}
		}
	}

	// change
	hideFloatingText(e) {
		let target = e.currentTarget.getElementsByClassName('floating__text')[0];
		target.classList.remove('show');
	}

	lazyLoad() {
		for (prop in this.refs) {
			delete this.refs[prop].dataset.lazy;			
		}
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	render() {
		let item = this.props.item;
		let itemInfo = ItemInfo.findOne({id: item.id}) || placeholder.infos;
		let path = '//static.pwsimulator.com/' + item.id + '.png';
		let avatar = (
			<span>{/* not avatar */}</span>
		);

		if (item.avatar) {
			avatar = (
				<img 
					ref="avatar"
					data-lazy={true}
					data-avatar={'//static.pwsimulator.com/cards/' + item.id + '.jpg'}
					onLoad={this.lazyLoad}
					alt={item.name}
					title={item.name}
				/>
			);
		}

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
					title={item.name}
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
					{avatar}
				</div>
			</div>
		)
	}
}