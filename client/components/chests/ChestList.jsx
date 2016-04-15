import React, {Component} from 'react';
import SearchInput from 'react-search-input';
import SingleChest from './SingleChest.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ChestsList extends Component {
	constructor() {
		super();

		this.searchUpdated = this.searchUpdated.bind(this);
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
			</ReactCSSTransitionGroup>
		)
	}
}