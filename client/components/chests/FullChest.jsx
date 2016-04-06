import React, {Component} from 'react';
import SingleChest from './SingleChest.jsx';

export default class FullChest extends Component {
	render() {
		let chest = this.props.chest;
		return (
			<section id="chests-list">
				<div className="title">
					<h1>Baús</h1>>
				</div>
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
								<SingleChest chest={chest} key={chest._id} />
							</div>								
						</div>
						<div className="chests__list__bottom"></div>
					</form>
				</div>
			</section>

		)
	}
}