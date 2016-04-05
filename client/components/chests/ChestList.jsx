import React, {Component} from 'react';
import SingleChest from './SingleChest.jsx';

export default class ChestsList extends Component {
	render() {
		let chests = this.props.chests;
		return (
			<div className="chests">
				<form action="" className="chests__list" id="chests">
					<div className="chests__list__top"></div>
					<div className="chests__list__container">
						<div className="chests__list__container__header">
							<div className="chests__list__container__header__name">
								<h3>Báus</h3>
							</div>
						</div>
						<div className="chests__list__container__inner">
							{chests.map((chest) => (
								<SingleChest chest={chest} key={chest.id} />
							))}
						</div>								
					</div>
					<div className="chests__list__bottom"></div>
				</form>
			</div>

		)
	}
}