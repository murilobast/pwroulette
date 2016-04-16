import React, {Component} from 'react';
import SearchInput from 'react-search-input';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChestItem from './ChestItem.jsx';
import ChestDropsForm from './ChestDropsForm.jsx';

export default class ChestDrops extends Component {
	constructor(props) {
		super(props);

		this.changeUiState = this.changeUiState.bind(this);
		this.showHelp = this.showHelp.bind(this);
		this.hideHelp = this.hideHelp.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	changeUiState(uiState) {
		this.state.uiState << uiState;
		this.setState({uiState: this.state.uiState});
	}

	setUntil(id) {
		Session.set('until', id);
		this.forceUpdate();
	}

	showHelp(e) {
		this.refs.infoBox.classList.add('isOpen');
	}

	hideHelp(e) {
		this.refs.infoBox.classList.remove('isOpen');
	}

	searchUpdated(itemTerm) {
		this.setState({itemTerm});
		this.forceUpdate();
	}

	render() {
		let items = this.props.items;
		let list = this.props.list;
		let searchState = (items.length > 0) ? false : true;
		let infoText = (items.length > 0) 
			? 'Clicar nos itens abaixo também altera o valor da caixa de seleção.' 
			: 'Por motivos de performance, a listagem de drops foi desabilitada para baús de avatar';

		if (this.refs.itemQuery) {
			let filters = ['name'];
			items = items.filter(this.refs.itemQuery.filter(filters));
		}

		return (
			<ReactCSSTransitionGroup 
				transitionName="fade"
				transitionAppear={true}
				transitionEnterTimeout={1000}
				transitionAppearTimeout={2000}
				transitionLeaveTimeout={1000}
			>
				<div className="chests__drops" id="drops">
					<button 
						className="chests__drops__info__icon" 
						onMouseEnter={this.showHelp}
						onMouseLeave={this.hideHelp}
					>
						?
					</button>
					<div className="chests__drops__info" ref="infoBox">
						<p className="chests__drops__info__text">
							Para abrir baús infinitamente, altere a quantidade para 0.
						</p>
						<p className="chests__drops__info__text">
							{infoText}
						</p>
					</div>
					<ChestDropsForm items={list} changeUiState={this.changeUiState}/>
					<SearchInput
						ref='itemQuery'
						onChange={this.searchUpdated.bind(this)}
						placeholder="Digite o nome do item"
						clasName="chests__drops__input"
						disabled={searchState}
					/>
					<ul className="chests__drops__list">

						{items.map((item, i) => (
							<li className="chests__drops__list__item" key={'drop-' + i} onClick={this.setUntil.bind(this, item.id)}>
								<ChestItem item={item}/>
								<span className="chests__drops__list__item__info">
									<p>{item.name}</p>
									<p>Chance: <i>{item.weight.toFixed(3)}%</i></p>
								</span>
							</li>
						))}

					</ul>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}