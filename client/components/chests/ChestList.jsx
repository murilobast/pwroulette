import React, {Component} from 'react';
import SearchInput from 'react-search-input';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

			$.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(url) + "&callback=?", (data) => {
				let $content = $(data.contents).find('tbody tr:last-of-type td:first-of-type p');
				let $last = $(data.contents).find('tbody tr:last-of-type td:last-of-type p');
				chest.name = $last.first().text();
				chest.id = Number($last.first().find('a').attr('href').replace('items/', ''));;

				let totalWeight = 0;
				let reg  = /(?:\s-\s([0-9]+)\s)?\(([0-9]+\.?[0-9]*)%\)/;
				let replace  = /(\([0-9]+\.?[0-9]*%\))/g;
				let start = (reg.test($($content[6]).text())) ? 6 : 7;

				for (let i = start; i < $content.length; i++) {
					let text = $($content[i]).text();
					let id = Number($($content[i]).find('a').attr('href').replace('items/', ''));
					let weight = Number(text.match(reg)[2]);
					totalWeight += weight;
					console.log(totalWeight.toFixed(4));
					let amount = text.match(reg)[1] || 1;

					text = text.replace(reg, '');
					text = text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
					
					let obj = {
						id: id,
						name: text,
						weight: weight,
						amount: amount
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