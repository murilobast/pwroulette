Session.setDefault('adds', []);
Session.setDefault('count', 0);
Session.setDefault('addType', 0);
Session.setDefault('tab', 0);


Template.mainItem.helpers({
	getAttrs: function () {
		var addons = Session.get('adds') || [];
		if (addons.length !== 0) {
			return addons;
		}
	},

	desc: function () {
		return Items.findOne({id: Session.get('id')});
	}
});

Template.itemCost.helpers({
	total: function () {
		var count = Session.get('count');
		if (count === 0) {
			return count;
		} else {
			return this.amount * count;
		}
	}
});

Template.forge.helpers({
	items: function () {
		var tab = Session.get('tab');
		return Items.find({tab: tab}, {sort: {id: 1}});
	},
	selected: function () {
		return Items.findOne({id: Session.get('id')});
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
		Session.set('adds', []);
		Session.set('count', 0);
	},

	'submit #roulette': function (e, t) {
		e.preventDefault();
		var adds = Addons.findOne({id: Session.get('addType')});
		var addons = new Rouletter(adds);
		Session.set('adds', addons);

		var count = Session.get('count');
		count++;
		Session.set('count', count);
		console.log(count);
	},

	'click .tab': function (e, t) {
		var $target = $(e.target);
		var tab = e.target.getAttribute('value');
		$('.tab').removeClass('active');
		$target.addClass('active');
		Session.set('tab', parseInt(tab));
	}
});