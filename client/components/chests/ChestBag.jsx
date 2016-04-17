import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ChestItem from './ChestItem.jsx';

let intervalTimer = 0;
let cachedToOpen = 1;
let canFill = true;
const placeholder = {
	toOpen: 1,
	until: 0,
	opened: 0,
	bag: []
}

export default class ChestBag extends Component {
	constructor(props) {
		super(props);

		this.reset = this.reset.bind(this);
		this.stop = this.stop.bind(this);
		this.openChest = this.openChest.bind(this);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillUnmount() {
		clearInterval(intervalTimer);
	}

	openChest(e) {
		e.preventDefault();
		clearInterval(intervalTimer);
		let chest = JSON.parse(JSON.stringify(this.props.chest));
		let items = this.prepare(chest.items);
		let toOpen = Session.get('toOpen') || placeholder.toOpen;
		let until = Session.get('until') || placeholder.until;
		let opened = Session.get('opened-' + chest.id) || placeholder.opened;
		let curItems = Session.get('bag-' + chest.id) || [];
		let start = new Date();

		if (canFill)
			cachedToOpen = toOpen;

		canFill = false;

		intervalTimer = setInterval(() => {
			this.getItem(items, (sourceItem) => {
				let item = JSON.parse(JSON.stringify(sourceItem));

				let find = _.find(curItems, function (obj, i) {
					if (obj.id === item.id) {
						return curItems[i].amount += item.amount;;
					}
				});

				if (find === undefined)
					curItems.push(item);

				opened++;
				toOpen--;
				
				Session.set('bag-' + chest.id, curItems);
				Session.set('opened-' + chest.id, opened);
				Session.set('toOpen', toOpen)
				this.forceUpdate();
				
				if (toOpen === 0 || until === item.id) {
					let finish = new Date();
					Session.set('toOpen', cachedToOpen);
					canFill = true;

					console.log('Time to open:', (finish - start) / 1000 + 'secs');

					clearInterval(intervalTimer);
				}
			});
		}, 5);
	}

	getItem(items, cb) {
		let random = Math.random();

		for (var i = 0; i <= items.length; i++) {
			if (random <= items[i].weight) {
				cb(items[i]);

				break;
			}
		}
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

	stop() {
		clearInterval(intervalTimer);
		this.forceUpdate();
	}

	reset() {
		let chest = this.props.chest;
		Session.set('bag-' + chest.id, []);
		Session.set('opened-' + chest.id, 0);
		clearInterval(intervalTimer);
		this.forceUpdate();

		if (!canFill)
			Session.set('toOpen', cachedToOpen)
	}

	render() {
		let chest = this.props.chest;
		let bag = Session.get('bag-' + chest.id) || placeholder.bag;
		let opened = Session.get('opened-' + chest.id) || placeholder.opened;

		return (
			<form onSubmit={this.openChest} className="chests__bag" id="bag">
				<div className="chests__bag__top"></div>
				<div className="chests__bag__container">
					<div className="chests__bag__container__header">
						<div className="chests__bag__container__header__icon">
							<img src={'//static.pwsimulator.com/' + chest.id + '.png'}  alt={chest.name} title={chest.name}/>
							<span className="chests__bag__container__header__icon__amount">{Session.get('toOpen') || placeholder.toOpen}</span>
						</div>
						<div className="chests__bag__container__header__name">
							<h3 title={chest.name + ' (' + opened + ')'}>{chest.name} ({opened})</h3>
						</div>
						<a 
							className="chests__bag__container__form__back button"
							href="/chest"
						>
							Voltar
						</a>
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
							onClick={this.reset}
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
						<button 
							className="chests__bag__container__form__stop button"
							name="stop" 
							type="button"
							onClick={this.stop}
						>
							Parar
						</button>
					</div>
				</div>
				<div className="chests__bag__bottom"></div>
			</form>
		)
	}
}