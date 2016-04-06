import React, {Component} from 'react';
import SearchInput from 'react-search-input';
import SingleChest from './SingleChest.jsx';

export default class ChestsList extends Component {
	searchUpdated(term) {
		this.setState({searchTerm: term});
	}

	render() {
		let chests = this.props.chests;

		console.log(this.refs)
		if (this.refs.chestQuery) {
			let filters = ['name'];
			chests = chests.filter(this.refs.chestQuery.filter(filters));
		}

		return (
			<div className="chests">
				<form action="" className="chests__list" id="chests">
					<div className="chests__list__top"></div>
					<div className="chests__list__container">
						<div className="chests__list__container__header">
							<div className="chests__list__container__header__name">
								<h3>Báus</h3>
								<SearchInput
									ref='chestQuery'
									onChange={this.searchUpdated.bind(this)}
									clasName="chests__list__container__header__name__input"
								/>
							</div>
						</div>
						<div className="chests__list__container__inner">
							{chests.map((chest) => (
								<SingleChest chest={chest} key={chest._id} />
							))}
						</div>								
					</div>
					<div className="chests__list__bottom"></div>
				</form>
			</div>

		)
	}
}