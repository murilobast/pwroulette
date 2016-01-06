Session.setDefault('bag', []);
Session.setDefault('chat', []);
Session.setDefault('opened', 0);
Session.setDefault('selected', 0);

Template.chest.helpers({
	getChests: function () {
		return Chests.find({active: true});
	},

	getResult: function () {
		return Session.get('bag');
	},

	notNull: function () {
		if (typeof this.name !== 'undefined') 
			return this;
	},

	chatMsg: function () {
		return Session.get('chat');
	},

	opened: function () {
		return Session.get('opened');
	},

	selected: function () {
		return Session.get('selected') !== 0;
	}
});

Template.chest.events({
	'click .chest': function (e, t) {
		Session.set('bag', []);
		Session.set('opened', 0);
		$('.chest').removeClass('selected');
		$(e.currentTarget).addClass('selected');
		Session.set('selected', this.id);
	},

	'submit #bag': function (e, t) {
		e.preventDefault();

		var chest = Chests.findOne({id: Session.get('selected')});
		var curItems = Session.get('bag');
		var curChat = Session.get('chat');
		var chat = t.find('.chat');
		var item = OpenChest(chest.items);
		var opened = Session.get('opened');
		var msg = 'Recebeu ' + item.amount + ' ' +  item.name;

		if (curItems.length > 0) {
			var find = _.find(curItems, function (obj, i) {
				if (obj.id == item.id) {
					return curItems[i].amount += item.amount;
				}
			});
			if (find === undefined) curItems.push(item);
		} else {
			curItems.push(item);
		}

		Session.set('bag', curItems);
		Session.set('chat', curChat);
		Session.set('opened', opened + 1);

		setTimeout(function () {
			chat.scrollTop = chat.scrollHeight;
		}, 100);
	},
});