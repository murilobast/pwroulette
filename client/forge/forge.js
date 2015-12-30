Session.setDefault('id', 21);
Session.setDefault('addType', 0);

Template.mainItem.helpers({
	getAttrs: function () {
		var addons = Session.get('adds') || [];
		if (addons.length === 0) {
			var adds = Addons.find({id: 0}).fetch()[0]; //find() without a callback is sync instead of assynv
			Session.set('adds', Rouletter(adds)); 
		}
		return addons;
	}
});

Template.mainItem.helpers({
	desc: function () {
		return Weapons.findOne({id: Session.get('id')});
	}
});

Template.forge.helpers({
	items: function () {
		return Weapons.find({}, {sort: {id: 1}});
	},
	selected: function () {
		return Session.get('id');
	}
});

Template.forge.events({
	'click #item': function (e, t) {
		var id = parseInt(e.target.innerText);
		$('.window .forge #item').removeClass('active');
		$(e.target).addClass('active');
		Session.set('id', id);
	},

	'submit #roulette': function (e, t) {
		e.preventDefault();
		var adds = Addons.findOne({id: Session.get('addType')});
		var addons = new Rouletter(adds);
		Session.set('adds', addons);
	}
});