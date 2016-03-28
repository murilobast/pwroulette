Router.route('/', {
	name: 'home',

	waitOn: function () {
		return Meteor.subscribe('changelog');
	},

	action: function () {
		if (this.ready()) {
			this.render('home');
		}
	}
});

Router.route('/forge', {
	name: 'forge',

	waitOn: function () {
		return [Meteor.subscribe('items'), Meteor.subscribe('addons')];
	},

	action: function () {
		if (this.ready()) {
			this.render('forge');
		}
	},

	onAfterAction: function () {
		SEO.set({
			title: 'Roletar Adds - PW Simulator',
			meta: {
				description: 'Simule roletagem (reforja) de atributos adicionais de equipamentos'
			},
			og: {
				title: 'Roletar Adds - PW Simulator',
				description: 'Simule roletagem (reforja) de atributos adicionais de equipamentos'
			}
		});
	}
});

Router.route('/chest', {
	name: 'chests',

	waitOn: function () {
		return [Meteor.subscribe('chests'), Meteor.subscribe('itemInfo')];
	},

	action: function () {
		if (this.ready()) {
			this.render('chest');
		}
	},

	onAfterAction: function () {
		SEO.set({
			title: 'Abrir Baús - PW Simulator',
			meta: {
				description: 'Simule dropes de báus'
			},
			og: {
				title: 'Abrir Baús - PW Simulator',
				description: 'Simule dropes de báus'
			}
		});
	}
});

Router.route('/chest/:id', {
	name: 'chest',

	waitOn: function () {
		return [Meteor.subscribe('chests'), Meteor.subscribe('itemInfo'), Meteor.subscribe('fullChest', ~~this.params.id)];
	},

	data: function () {
		return Chests.findOne({id: ~~this.params.id});
	},

	action: function () {
		if (this.ready()) {
			this.render('chest');
		}
	},

	onAfterAction: function () {
		let name = (typeof this.data() !== 'undefined') ? this.data().name : 'Baús';
		let desc = 'Simule o drop de ' + name;
		let img = 'launcher-icon-0-75x.png';

		if (typeof this.data() !== 'undefined' && (typeof this.data().desc !== 'undefined')) {
			desc += ': ' + this.data().desc;
			img = location.protocol + '//' + location.hostname + ':8181/' + this.data().id + '.png';
		}


		desc+= ' - Simulações para Perfect World';

		Session.set('selected', this.data());

		SEO.set({
			title: name + ' - PW Simulator',
			meta: {
				description: desc
			},
			og: {
				title: name + ' - PW Simulator',
				site_name: name + ' - PW Simulator',
				description: desc,
				image: img
			}
		});
	}
});

Router.route('/user', {
	name: 'user',

	action: function () {
		if (this.ready()) {
			this.render('user');
		}
	}
});

Router.route('/diceroll', {
	name: 'dice',

	waitOn: function () {
		return Meteor.subscribe('dices');
	},

	action: function () {
		if (this.ready()) {
			this.render('dice');
		}
	}
});