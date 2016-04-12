import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Creating main content component
export class Home extends Component {
	constructor() {
		super();
	}

	changelogs() {
		if (typeof Changelogs.find !== 'undefined')
			return Changelogs.find({}, {sort: {timestamp: 'desc'}}).fetch();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		return (
			<section id="home">
				<div className="title">
					<h2>Home</h2>
				</div>
				<div className="home">
					<ReactCSSTransitionGroup
						transitionName="shake"
						transitionAppear={true}
						transitionEnterTimeout={0}
						transitionAppearTimeout={1000}
						transitionLeaveTimeout={0}
					>
						<ul className="home__sections">
							<li className="home__sections__section">
								<a href="/forge" className="home__sections__section__item">Reforja</a>
							</li>
							<li className="home__sections__section">
								<a href="/chest" className="home__sections__section__item">Abrir Baús</a>
							</li>
						</ul>
						<Changelogs changelogs={this.props.changelogs} />
					</ReactCSSTransitionGroup>
				</div>
			</section>
		)
	}
};

export class Changelogs extends React.Component {
	render() {
		let changelogs = this.props.changelogs;

		return (
			<div className="home__changelog">
				<div className="home__changelog__header">
					<h3>Changelog</h3>
				</div>
				<ul className="home__changelog__content">
					{changelogs.map((changelog) => (
						<Changelog key={changelog._id} changelog={changelog} />
					))}
				</ul>
			</div>
		)
	}
}

export class Changelog extends React.Component {
	render() {
		let changelog = this.props.changelog;
		
		return (
			<li className="home__changelog__content__item">
				<div className="home__changelog__content__item__desc">
					<span>{changelog.desc}</span>
				</div>
				<div className="home__changelog__content__item__time">
					<span>{changelog.timestamp.toString()}</span>
				</div>
			</li>
		)
	}
}

export default Home;