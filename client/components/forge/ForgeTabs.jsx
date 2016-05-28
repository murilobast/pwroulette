import React, {Component} from 'react';

export default class ForgeTabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{name: 'Nirv. I', identifier: 'first'},
				{name: 'Nirv. II', identifier: 'second'},
				{name: 'R8 I', identifier: 'third'},
				{name: 'R8 II', identifier: 'fourth'},
				{name: 'R8 III', identifier: 'fifth'}
			]
		}
		this.setTab = this.setTab.bind(this);
		if (typeof Session.get('currentTab') === 'undefined')
			Session.set('currentTab', 0)
	}

	setTab(e) {
		this.props.clicked();
		Session.set('currentTab', ~~e.target.value);
	}

	activeTab(tab) {
		if (tab === Session.get('currentTab'))
			return 'active';

		return '';
	}

	render() {
		return (
			<div className="forge-window__tabs">
				{this.state.tabs.map((tab, i) => (
					<div key={'tab' + i} className={'tab forge-window__tabs__' + tab.identifier + ' ' + this.activeTab(i)}
						value={i}
						onClick={this.setTab}
					>
						{tab.name}
					</div>
				))}
			</div>

		)
	}
}


