// Session.setDefault('id', 21);
Session.setDefault('addType', 0);
Session.setDefault('tab', 0);

Template.mainItem.helpers({
	getAttrs: function () {
		var addons = Session.get('adds') || [];
		if (addons.length !== 0) {
			// var adds = Addons.find({id: 0}).fetch()[0]; //find() without a callback is sync instead of assynv
			// Session.set('adds', Rouletter(adds)); 
			return addons;
		}
	},

	desc: function () {
		return Weapons.findOne({id: Session.get('id')});
	}
});

Template.forge.helpers({
	items: function () {
		var tab = Session.get('tab');
		return Weapons.find({tab: tab}, {sort: {id: 1}});
	},
	selected: function () {
		return Session.get('id');
	}
});

Template.forge.events({
	'click #item': function (e, t) {
		var id = this.id;
		$('.window .forge #item').removeClass('active');
		$(e.target).addClass('active');
		Session.set('id', id);
		console.log(this);
		Session.set('addType', this.addType);
	},

	'submit #roulette': function (e, t) {
		e.preventDefault();
		var adds = Addons.findOne({id: Session.get('addType')});
		var addons = new Rouletter(adds);
		Session.set('adds', addons);
	},

	'click .tab': function (e, t) {
		var $target = $(e.target);
		var tab = e.target.getAttribute('value');
		$('.tab').removeClass('active');
		$target.addClass('active');
		Session.set('tab', parseInt(tab));
	}
});