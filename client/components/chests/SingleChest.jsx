import React, {Component} from 'react';

export default class ChestsList extends Component {
	render() {
		let chest = this.props.chest;
		return (
			<a href={"/chest/" + chest.id} title={chest.name} className="chests__bag__container__inner__item floating chest">
				<img src={'//127.0.0.1:8181/' + chest.id + '.png'}  alt={chest.name} />
				<div className="floating__text">
					<span>{chest.name}</span>
					<p>
						<span style={{color: 'red'}}>aaaaaaaaaaaaaa</span>
					</p>
				</div>

			</a>
		)
	}
}

