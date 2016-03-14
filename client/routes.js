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
	}
});

Router.route('/chest', {
	name: 'chest',
	action: function () {
		if (this.ready()) {
			this.render('chest');
		}
	}
});

Router.route('/add', {
	name: 'add',
	action: function () {
		if (this.ready()) {
			this.render('add');
		}
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