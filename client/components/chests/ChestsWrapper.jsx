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
					<h2>Baús</h2>
				</div>
				<ChestList chests={this.props.chests} featured={this.props.featured}/>
			</section>
		)
	}
};