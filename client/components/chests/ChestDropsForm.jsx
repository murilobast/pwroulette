import React, {Component} from 'react';

export default class ChestDropsForm extends Component {
	constructor() {
		super();
		this.state = {
			toOpen: 100,
			until: 0
		}
	}

	setToOpen(e) {
		let toOpen = e.target.value;
		this.setState({toOpen});
		Session.set('toOpen', toOpen);
	}

	setUntil(e) {
		let until = ~~e.target.value;
		this.setState({until});
		Session.set('until', until);
	}

	render() {
		let items = this.props.items;

		return (
			<form className="chests__drops__opts">
				<div className="chests__drops__opts__field">
					<label htmlFor="toOpen" className="chests__drops__opts__field__label">Abrir </label>
					<input
						type="number"
						name="toOpen"
						id="toOpen"
						className="chests__drops__opts__field__input"
						value={this.state.toOpen}
						onChange={this.setToOpen.bind(this)}
					/>
					<label htmlFor="toOpen" className="chests__drops__opts__field__label"> Baús</label>
				</div>
				<div className="chests__drops__opts__field">
					<label htmlFor="until" className="chests__drops__opts__field__label"> ou até vir </label>
					<select
						name="until"
						id="until"
						className="chests__drops__opts__field__select"
						value={this.state.until}
						onChange={this.setUntil.bind(this)}
					>
						<option value="0">
							Selecione o item
						</option>
						{items.map((item, i) => (
							<option key={'select-' + item.id} value={item.id}>
								{item.name}({item.weight}%)
							</option>
						))}
					</select>
				</div>
			</form>
		)
	}
}