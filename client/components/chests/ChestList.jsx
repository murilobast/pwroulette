import React, {Component} from 'react';
import SearchInput from 'react-search-input';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from '/client/components/default/Modal.jsx';
import SingleChest from './SingleChest.jsx';
import ChestAddModal from './ChestAddModal.jsx';

export default class ChestsList extends Component {
	constructor() {
		super();

		this.state = {
			modalOpen: false
		}

		this.updateState = this.updateState.bind(this);
		this.searchUpdated = this.searchUpdated.bind(this);
		this.openModal = this.openModal.bind(this);

		// SEO
		prerenderReady = true;
		SEO.set({
			title: 'Abrir Baús - PW Simulator',
			description: 'Simule drops de báus para Perfect World com apenas um simples click!',
			meta: {
				'property="og:title"': 'Abrir Baús - PW Simulator'
			}
		});
	}

	updateState(value) {
		this.setState({modalOpen: value});
	}

	openModal(term) {
		this.setState({modalOpen: true});
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
				transitionName="fade"
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
										className="chests__list__container__header__name__input"
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
									<h3>Baús em destaque</h3>
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
				<Modal isOpen={this.state.modalOpen}>
					<ChestAddModal updateState={this.updateState}/>
				</Modal>
			</ReactCSSTransitionGroup>
		)
	}
}