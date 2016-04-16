import React, {Component} from 'react';

const placeholder = {
	infos: {infos: []}
}

export default class ChestsList extends Component {
	constructor() {
		super();

		this.lazyLoad = this.lazyLoad.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	showFloatingText(e) {
		let target = e.currentTarget.getElementsByClassName('floating__text')[0];
		target.classList.add('show');
	}

	hideFloatingText(e) {
		let target = e.currentTarget.getElementsByClassName('floating__text')[0];
		target.classList.remove('show');
	}

	lazyLoad() {
		$(this.refs.chestIcon).removeAttr('data-lazy');
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	render() {
		let chest = this.props.chest;
		let itemInfo = ItemInfo.findOne({id: chest.id}) || placeholder.infos;
		let path = '//static.pwsimulator.com/' + chest.id + '.png';

		return (
			<a 
				href={"/chest/" + chest.id} 
				title={chest.name} 
				className="chests__bag__container__inner__item floating chest"
				onMouseEnter={this.showFloatingText}
				onMouseLeave={this.hideFloatingText}
			>
				<img
					src={path}
					alt={chest.name}
					alt={chest.title}
					ref="chestIcon"
					data-lazy={true}
					onLoad={this.lazyLoad}
				/>
				<div className="floating__text">
					<span>{chest.name}</span>
					<p>
						{itemInfo.infos.map((info) => (
							<span style={{color: info.color}} key={info.text} dangerouslySetInnerHTML={this.createMarkup(info.text)}>
								
							</span>
						))}
					</p>
				</div>
			</a>
		)
	}
}

