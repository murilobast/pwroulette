import React from 'react';

// Creating navbar component
export default class Navbar extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	
	toggleHeader() {
		let sidebar = document.getElementById('side');
		sidebar.classList.toggle('isOpen');
	}

	menuClick(e) {
		let target = e.target;
		let sidebar = document.getElementById('side');

		if (target.id === 'mask' || target.tagName === 'A') {
			sidebar.classList.remove('isOpen');
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
					<a href="#!" className="header__content__menu" id="menu" onClick={this.toggleHeader}></a>
					<a href="/" title="Inicio" className="header__content__brand">
						<h1 className="header__content__brand__title">PW Simulator</h1>
					</a>
				</div>
				<div className="header__menu" id="side" onClick={this.menuClick}>
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