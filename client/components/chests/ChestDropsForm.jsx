import React, {Component} from 'react';

const placeholder = {
	toOpen: 1,
	until: 0
}

export default class ChestDropsForm extends Component {
	constructor() {
		super();

		this.setToOpen = this.setToOpen.bind(this);
		this.setUntil = this.setUntil.bind(this);

		this.state = {
			toOpen: Session.get('toOpen') || placeholder.toOpen,
			until: Session.get('until') || placeholder.until
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
			<form className="chests__drops__opts" disabled="true">
				<div className="chests__drops__opts__field">
					<label htmlFor="toOpen" className="chests__drops__opts__field__label">Abrir </label>
					<input
						type="number"
						name="toOpen"
						id="toOpen"
						className="chests__drops__opts__field__input"
						value={this.state.toOpen}
						onChange={this.setToOpen}
					/>
					<label htmlFor="toOpen" className="chests__drops__opts__field__label"> Baús, ou até vir: </label>
				</div>
				<div className="chests__drops__opts__field">
					<select
						name="until"
						id="until"
						className="chests__drops__opts__field__select"
						value={Session.get('until') || placeholder.until}
						onChange={this.setUntil}
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