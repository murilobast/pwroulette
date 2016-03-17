Router.route('/', {
	name: 'home',
	action: function () {
		if (this.ready()) {
			this.render('home');
		}
	}
});

Router.route('/forge', {
	name: 'forge',
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
	name: 'chest',
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
	action: function () {
		if (this.ready()) {
			this.render('dice');
		}
	}
});