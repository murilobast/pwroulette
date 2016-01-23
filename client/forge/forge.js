Session.setDefault('adds', []);
Session.setDefault('count', 0);
Session.setDefault('addType', 0);
Session.setDefault('tab', 0);
Session.setDefault('cost', 0);
Session.setDefault('centered', 'centered');
selected = false;

Template.mainItem.helpers({
	getAttrs: function () {
		var addons = Session.get('adds') || [];
		if (addons.length !== 0) {
			return addons;
		}
	},

	desc: function () {
		return Items.findOne({id: Session.get('id')});
	},
});

Template.itemCost.helpers({
	total: function () {
		var count = Session.get('count');
		if (count === 0) {
			return count;
		} else {
			return this.amount * count;
		}
	},

	cost: function () {
		var count = Session.get('count');
		var total = this.cost * count || 0;
		if (count !== 0) {
			total = format(total);
			return total;
		}
		return total;
	}
});

Template.forge.helpers({
	items: function () {
		var tab = Session.get('tab');
		return Items.find({tab: tab}, {sort: {id: 1}});
	},

	selected: function () {
		var item = Items.findOne({id: Session.get('id')});
		selected = true;
		if (typeof item != 'undefined') {
			Session.set('cost', item.cost);
		}
		return item;
	},

	count: function () {
		return Session.get('count');
	},

	isDesk: function () {
		return $(window).width() > 720;
	},

	centered: function () {
		return Session.get('centered');
	}
});

Template.forge.events({
	'click #item': function (e, t) {
		var id = this.id;
		$('.window .forge #item').removeClass('active');
		$(e.target).addClass('active');
		Session.set('id', id);
		// console.log(this);
		Session.set('addType', this.addType);
		Session.set('adds', []);
		Session.set('count', 0);
		Session.set('centered', '');
		toTop();
	},

	'submit #roulette': function (e, t) {
		e.preventDefault();
		var adds = Addons.findOne({id: Session.get('addType')});
		var addons = new Rouletter(adds);
		var count = Session.get('count');
		count++;
		Session.set('adds', addons);
		Session.set('count', count);
	},

	'click .tab': function (e, t) {
		var $target = $(e.target);
		var tab = e.target.getAttribute('value');
		$('.tab').removeClass('active');
		$target.addClass('active');
		Session.set('tab', parseInt(tab));
	}
});

toTop = function () {
	var $body = $('html, body');
	if ($body.width() < 720) {
		var offset = $('.itemCost').offset().top - 56;
		$body.animate({
			scrollTop: offset
		}, 1000);
	}
}