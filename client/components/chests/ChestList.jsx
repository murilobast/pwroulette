import React, {Component} from 'react';
import SearchInput from 'react-search-input';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {HTTP} from 'meteor/http';
import SingleChest from './SingleChest.jsx';
import ChestAddModal from './ChestAddModal.jsx';

export default class ChestsList extends Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false
		}

		this.searchUpdated = this.searchUpdated.bind(this);
		this.insertChest = this.insertChest.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.crossGet = this.crossGet.bind(this);
	}

	insertChest(e) {
		e.preventDefault();
		let url = this.refs.url.value;

		this.crossGet(url);
	}

	openModal(term) {
		this.setState({modalOpen: true});
	}

	closeModal(e) {
		this.setState({modalOpen: false});
	}

	searchUpdated(term) {
		this.setState({searchTerm: term});
	}

	render() {
		let chests = this.props.chests;
		let featured = this.props.featured;

		if (this.refs.chestQuery) {
			let filters = ['name'];
			chests = chests.filter(this.refs.chestQuery.filter(filters));
		}

		return (
			<ReactCSSTransitionGroup 
				transitionName="shake"
				transitionAppear={true}
				transitionEnterTimeout={1000}
				transitionAppearTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				<div className="chests" key="chests">
					<form action="" className="chests__list" id="chests">
						<div className="chests__list__top"></div>
						<div className="chests__list__container">
							<div className="chests__list__container__header">
								<button
									className="chests__list__container__header__add button"
									id="add_chest"
									type="button"
									onClick={this.openModal}
								>
									Adicionar
								</button>								
								<div className="chests__list__container__header__name">
									<SearchInput
										ref='chestQuery'
										onChange={this.searchUpdated}
										placeholder="Digite o nome..."
										clasName="chests__list__container__header__name__input"
									/>
								</div>
							</div>
							<div className="chests__list__container__inner">
								{chests.map((chest) => (
									<SingleChest chest={chest} key={chest._id}/>
								))}
							</div>
							<div className="chests__list__container__header">
								<div className="chests__list__container__header__name">
									<h3>Báus em destaque</h3>
								</div>
							</div>
							<div className="chests__list__container__inner featured">
								{featured.map((chest) => (
									<SingleChest chest={chest} key={chest._id}/>
								))}
							</div>
						</div>
						<div className="chests__list__bottom"></div>
					</form>
				</div>
				<ChestAddModal isOpen={this.state.modalOpen}>
					<button className="modal-mask show" onClick={this.closeModal}></button>

					<form className="modal-window show" onSubmit={this.insertChest}>
						<div className="modal-window__top"></div>
						<div className="modal-window__container">
							<div className="modal-window__container__header">
								<h3>Adicionar Baú</h3>
							</div>
							<div className="modal-window__container__content">
								<div className="modal-window__container__content__url">
									<label>Url do pwdatabase</label>
									<input type="text" name="url" ref="url"/>
									<p>Enviar url da página de drops do báu.</p>
									<p>Ex: http://www.pwdatabase.com/br/quest/27109</p>
								</div>
							</div>

							<div className="modal-window__container__footer">
								<button 
									className="modal-window__container__footer__cancel cancel button"
									type="button"
									onClick={this.closeModal}
								>
									Cancelar
								</button>
								<button
									className="modal-window__container__footer__submit button" id="addChest_submit"
									type="submit"
								>
									Add
								</button>
							</div>
						</div>
						<div className="modal-window__bottom"></div>
					</form>
				</ChestAddModal>
			</ReactCSSTransitionGroup>
		)
	}

	crossGet(url) {
		let urlReg = /(?:pwdatabase\.com\/br\/quest\/)([0-9]*)$/;

		if (urlReg.test(url)) {
			let chest = {
				active: false,
				items: []
			};

			HTTP.call('GET', 'http://alloworigin.com/get?url=' + encodeURIComponent(url) + '&callback=?', (statusCode, result) => {
				let htmlString = result.data.contents;
				let parser = new DOMParser();
				let doc = parser.parseFromString(htmlString, 'text/html');
				let content = doc.querySelectorAll('tbody tr:last-of-type td:first-of-type p');
				let last = doc.querySelector('tbody tr:last-of-type td:last-of-type p');
				console.log(last);
				// let href = last.querySelector('a').href;
				let totalWeight = 0;
				let reg  = /(?:\s-\s([0-9]+)\s)?\(([0-9]+\.?[0-9]*)%\)/;
				let replace  = /(\([0-9]+\.?[0-9]*%\))/g;
				let hrefReg = /(:?\/)([0-9]+)/;
				let start = (reg.test(content[6].textContent)) ? 6 : 7;
				
				// chest.name = last.textContent;
				chest.name = 'Tesouro do Sol';
				// chest.id = ~~(href.match(hrefReg)[2]);
				chest.id = 47897;

				for (let i = start; i < content.length; i++) {
					let item = content[i];
					let name = item.textContent;
					let itemHref = item.querySelector('a').href;
					let id = ~~(itemHref.match(hrefReg)[2]);
					let weight = ~~(name.match(reg)[2]);
					let amount = name.match(reg)[1] || 1;

					name = name.replace(reg, '');
					name = name.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
					totalWeight += weight;
					
					console.log(totalWeight.toFixed(4));

					let obj = {
						id,
						name,
						weight,
						amount
					}

					chest.items.push(obj);
				}

				console.log(chest);
				Meteor.call('createChest', chest);
				this.setState({modalOpen: false});
			});

		} else {
			alert('ERRO: URL invalida.')
			this.setState({modalOpen: false});
		}
	}
}