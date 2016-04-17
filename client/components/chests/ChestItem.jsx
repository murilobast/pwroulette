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
	
	showFloatingText(e) {
		this.refs.floatingText.classList.add('show');

		if (typeof this.refs.avatar !== 'undefined') {
			let img = this.refs.avatar;
			let dataset = img.dataset;

			if (typeof dataset.avatar !== 'undefined') {
				img.src = dataset.avatar;
				delete dataset.avatar;
			}
		}

		this.getInfo(this.props.item.id, false);
	}

	hideFloatingText(e) {
		this.refs.floatingText.classList.remove('show');
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
				<div className="floating__text" ref="floatingText">
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

	getInfo(id, avatar = false) {
		let itemInfo = {
			id: id,
			avatar: avatar
		};

		if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {
			let url = 'http://www.pwdatabase.com/br/items/' + id;

			HTTP.call('GET', 'http://alloworigin.com/get?url=' + encodeURIComponent(url) + '&callback=?', (statusCode, result) => {
				if (result.data !== null) {
					let htmlString = result.data.contents;
					let parser = new DOMParser();
					let doc = parser.parseFromString(htmlString, 'text/html');
					let infos = doc.querySelectorAll('.iteminfo > span');
					let textArray = [];

					for (let i = 0; i < infos.length; i++) {
						let info = infos[i];
						let color = info.style.color;

						if (color === 'rgb(255, 203, 74)' || color === 'rgb(0, 255, 255)' || color === 'rgb(255, 0, 238)' || color === 'rgb(128, 128, 128)') {
							if (color === 'rgb(0, 255, 255)' || color === 'rgb(128, 128, 128)') {
								if (textArray.length > 0) {
									info.textContent = '<br>' + info.textContent + '<br>';
								} else {
									info.textContent = info.textContent + '<br>';
								}
							}

							textArray.push({
								color: color,
								text: info.textContent
							});
						}

						itemInfo['infos'] = textArray;

						if (avatar) {
							itemInfo['type'] = doc.querySelectorAll('.iteminfo a')[1].textContent;
						}
					};

					if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {

						ItemInfo.insert(itemInfo, function (err, data) {
							console.log('Inserindo informações do item', id);
						});
					}

					return;
				}
				console.log('Limite de conexões excedido!');
			});
		}
	}
}