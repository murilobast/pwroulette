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
		Session.set('selected', this.data());
		SEO.set({
			title: name + ' - PW Simulator',
			meta: {
				description: 'Simule o drop de ' + name
			},
			og: {
				title: name + ' - PW Simulator',
				description: 'Simule o drop de ' + name
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