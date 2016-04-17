import React from 'react';

// Creating navbar component
export default class Navbar extends React.Component {
	constructor() {
		super();

		this.menuClick = this.menuClick.bind(this);
		this.toggleHeader = this.toggleHeader.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	
	toggleHeader() {
		this.refs.side.classList.toggle('isOpen');
	}

	menuClick(e) {
		let target = e.target;

		if (target.id === 'mask' || target.tagName === 'A' || target.tagName === 'H1') {
			this.refs.side.classList.remove('isOpen');
		}
	}

	isActive(path) {
		var curLocation = FlowRouter.current().path;

		if (curLocation === path) {
			return 'active';
		}
	}

	render() {
		return (
			<header className="header">
				<div className="header__content">
					<button type="button" className="header__content__menu" id="menu" onClick={this.toggleHeader}></button>
					<a href="/" title="Inicio" className="header__content__brand" onClick={this.menuClick}>
						<h1 className="header__content__brand__title">PW Simulator</h1>
					</a>
				</div>
				<div className="header__menu" ref="side" id="side" onClick={this.menuClick}>
					<div className="header__menu__mask" id="mask"></div>
					<div className={"header__menu__link " + this.isActive('/forge')}>
						<a href="/forge" title="Roletar Adds">Roletar Adds</a>
					</div>
					<div className={"header__menu__link " + this.isActive('/chest')}>
						<a href="/chest" title="Abrir baús">Abrir baús</a>
					</div>
				</div>
			</header>
		);
	}
}