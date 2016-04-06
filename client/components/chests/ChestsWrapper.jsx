import React, {Component} from 'react';
import ChestList from './ChestList.jsx';

export default class ChestsWrapper extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<section id="chests-list">
				<div className="title">
					<h1>Baús</h1>
				</div>
				<ChestList chests={this.props.chests} infos={this.props.infos} />
			</section>
		)
	}
};