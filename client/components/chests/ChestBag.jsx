import React, {Component} from 'react';
import ChestItem from './ChestItem.jsx';

let intervalTimer = 0;

export default class ChestBag extends Component {
	componentWillUnmount() {
		clearInterval(intervalTimer);
	}

	constructor() {
		super();
	}

	openChest(e) {
		e.preventDefault();
		clearInterval(intervalTimer);
		let chest = this.props.chest;
		let items = this.prepare(chest.items);
		let toOpen = Session.get('toOpen') || 1;
		let until = Session.get('until') || 0;
		let opened = Session.get('opened-' + chest.id) || 0;
		let curItems = Session.get('bag-' + chest.id) || [];
		
		intervalTimer = setInterval(() => {
			let item = this.clone(this.getItem(items));

			let find = _.find(curItems, function (obj, i) {
				if (obj.id === item.id) {
					return curItems[i].amount += item.amount;;
				}
			});

			if (find === undefined) {
				curItems.push(item);
			}

			opened++;
			toOpen--;
			
			Session.set('bag-' + chest.id, curItems);
			Session.set('opened-' + chest.id, opened);
			this.forceUpdate();
			
			if (toOpen === 0 || until === item.id)
				clearInterval(intervalTimer);
		}, 25);
	}

	getItem(items) {
		let item = _.find(items, function(item) {

			return Math.random() <  item.weight;
		});

		if (item === undefined) {

			return this.getItem(items);
		} else {

			return item;
		}
	}

	clone(source) {
		if (Object.prototype.toString.call(source) === '[object Array]') {
			var clone = [];

			for (var i=0; i < source.length; i++) {
				clone[i] = this.clone(source[i]);
			}

			return clone;
		} else if (typeof(source) === "object") {
			var clone = {};

			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					clone[prop] = this.clone(source[prop]);
				}
			}

			return clone;
		}

		return source;
	}

	prepare(items) {
		let temp = [];

		items.forEach(function (item, i) {
			item.weight = item.weight / 100;

			if (i > 0) {
				item.weight = item.weight + temp[i - 1].weight;
			}

			temp.push(item);
		});

		return items;
	}

	reset() {
		let chest = this.props.chest;
		Session.set('bag-' + chest.id, []);
		Session.set('opened-' + chest.id, 0);
		clearInterval(intervalTimer);
	}

	render() {
		let chest = this.props.chest;
		let bag = Session.get('bag-' + chest.id) || [];
		let opened = Session.get('opened-' + chest.id) || 0;

		return (
			<form onSubmit={this.openChest.bind(this)} className="chests__bag" id="bag">
				<div className="chests__bag__top"></div>
				<div className="chests__bag__container">
					<div className="chests__bag__container__header">
						<div className="chests__bag__container__header__icon">
							<img src={'//static.pwsimulator.com/' + chest.id + '.png'}  alt={chest.name}/>
						</div>
						<div className="chests__bag__container__header__name">
							<h3>{chest.name}</h3>
						</div>
						<span className="chests__bag__container__header__amount">({opened})</span>
					</div>
					<div className="chests__bag__container__inner">

						{bag.map((item) => (
							<ChestItem key={item.id} item={item} />
						))}

					</div>
					<div className="chests__bag__container__form">
						<button 
							className="chests__bag__container__form__reset button" 
							id="reset"
							type="button"
							onClick={this.reset.bind(this)}
						>
							Limpar
						</button>
						<button 
							className="chests__bag__container__form__open button"
							name="openChest" 
							type="submit"
						>
							Abrir
						</button>
					</div>
				</div>
				<div className="chests__bag__bottom"></div>
			</form>
		)
	}
}