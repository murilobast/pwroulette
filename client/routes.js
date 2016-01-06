Router.route('/', {
	name: 'home',
	onBeforeAction: function () {
		Visitors.insert({timestamp: new Date(), page: 'forge'});
		this.next();
	},
	action: function () {
		if (this.ready()) {
			this.render('forge');
		}
	}
});

Router.route('/chest', {
	name: 'chest',
	onBeforeAction: function () {
		Visitors.insert({timestamp: new Date(), page: 'chest'});
		this.next();
	},
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