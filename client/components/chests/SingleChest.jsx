import React, {Component} from 'react';
import {HTTP} from 'meteor/http';

const placeholder = {
	infos: {infos: []}
}

export default class ChestsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			itemInfo: ItemInfo.findOne({id: props.chest.id}) || placeholder.infos
		}

		this.lazyLoad = this.lazyLoad.bind(this);
		this.showFloatingText = this.showFloatingText.bind(this);
		this.hideFloatingText = this.hideFloatingText.bind(this);
		this.setDesc = this.setDesc.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	showFloatingText(e) {
		this.refs.floatingText.classList.add('show');

		this.getInfo(this.props.chest.id, false);

		if (typeof this.props.chest.desc === 'undefined') {
			this.setDesc();
		}
	}

	setDesc() {
		let infos = this.state.itemInfo.infos
		let desc = '';

		if (infos.length > 0) {
			infos.forEach((info, i) => {
				desc += info.text.replace(/<br>/g, '') + ' ';
			});

			Chests.update({_id: this.props.chest._id},  {$set: {desc: desc}}, (err, data) => {
				if (!err) {
					console.log('Inserindo descrição para',  this.props.chest.name);
				}
			});
		}
	}

	hideFloatingText(e) {
		this.refs.floatingText.classList.remove('show');
	}

	lazyLoad() {
		delete this.refs.chestIcon.dataset.lazy;
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	render() {
		let chest = this.props.chest;
		let itemInfo = this.state.itemInfo;
		let path = '//static.pwsimulator.com/' + chest.id + '.png';

		return (
			<a 
				href={"/chest/" + chest.id} 
				title={chest.name} 
				className="chests__bag__container__inner__item floating chest"
				onMouseEnter={this.showFloatingText}
				onMouseLeave={this.hideFloatingText}
			>
				<img
					src={path}
					alt={chest.name}
					alt={chest.title}
					ref="chestIcon"
					data-lazy={true}
					onLoad={this.lazyLoad}
				/>
				<div className="floating__text" ref="floatingText">
					<span>{chest.name}</span>
					<p>
						{itemInfo.infos.map((info) => (
							<span style={{color: info.color}} key={info.text} dangerouslySetInnerHTML={this.createMarkup(info.text)}></span>
						))}
					</p>
				</div>
			</a>
		)
	}

	getInfo(id, avatar = false) {
		let itemInfo = {
			id: id,
			avatar: avatar
		};

		if (ItemInfo.find({id: id}, {limit: 1}).count() === 0) {
			let url = 'http://www.pwdatabase.com/br/items/' + id;

			Meteor.call('returnData', url, (err, result) => {
				if (!err) {
					let htmlString = result.content;
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
				}
			});
		}
	}
}

