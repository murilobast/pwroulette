Router.route('/', {
	name: 'home',
	onBeforeAction: function () {
		Visitors.insert({timestamp: new Date()});
		this.next();
	},
	action: function () {
		if (this.ready()) {
			this.render('index');
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