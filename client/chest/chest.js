Session.setDefault('bag', []);
Session.setDefault('chat', []);
Session.setDefault('selected', 0);
Session.setDefault('opened', 0);
Session.setDefault('amount', 0);
Session.setDefault('until', 0);

intervalID = 0;

Template.chest.rendered = function () {
	Session.set('selected', Chests.findOne({}, {sort: {_id: 1}}));
	
	let $chat = $('.chat');
	setInterval(function () {
		chat.scrollTop = chat.scrollHeight;
	}, 100);
};

Template.chest.helpers({
	getChests: function () {
		return Chests.find({active: true}, {sort: {_id: 1}});
	},

	getOtherChests: function () {
		return Chests.find({active: false}, {sort: {_id: 1}});
	},

	getResult: function () {
		return Session.get('bag');
	},

	chatMsg: function () {
		return Session.get('chat');
	},

	opened: function () {
		return Session.get('opened');
	},

	selected: function () {
		return Session.get('selected');
	}
});

Template.macro.helpers({
	chestItems: function () {
		let selected = Session.get('selected');
		if (selected) {
			return selected.items;
		}
	},

	untl: function () {
		return Session.get('until');
	}
});

Template.chest.events({
	'click .chest': function (e, t) {
		Session.set('bag', []);
		Session.set('opened', 0);
		Session.set('chat', []);

		clearInterval(intervalID);
		$('.chest').removeClass('selected');
		$(e.currentTarget).addClass('selected');
		Session.set('selected', this);
	},

	'click #macro': function (e, t) {
		$(t.find('.modal-window')).addClass('show');
		$(t.find('.modal-mask')).addClass('show');
	},

	'click #reset': function (e, t) {
		clearInterval(intervalID);
		Session.set('bag', []);
		Session.set('opened', 0);
		Session.set('chat', []);
	},

	'submit #bag': function (e, t) {
		e.preventDefault();
		let amount = t.find('.amount').value || 1;
		let expected = Session.get('until').id || 0;

		let id = Session.get('selected').id;
		let chest = Chests.findOne({id: id});
		let curItems = Session.get('bag');
		let curChat = Session.get('chat');
		let opened = Session.get('opened');
		let item = {};
		let msg = '';

		if (intervalID) {
			clearInterval(intervalID);
		}

		intervalID = setInterval(function () {

			chest = Chests.findOne({id: id});
			item = OpenChest(chest.items);
			if (curItems.length > 0) {
				let find = _.find(curItems, function (obj, i) {
					if (obj.id == item.id) {
						return curItems[i].amount += item.amount;
					}
				});
				if (find === undefined) {
					curItems.push(item);
				}
			} else {
				curItems.push(item);
			}

			opened++;
			amount--;
			msg = 'Recebeu ' + item.amount + ' ' +  item.name;
			curChat.push(msg);
			Session.set('bag', curItems);
			Session.set('chat', curChat);
			Session.set('opened', opened);

			if (curChat.length > 100) {
				curChat.splice(0, 50);
			}

			if (amount === 0 || (expected && (item.id === expected))) {
				clearInterval(intervalID);
			}
			
		}, 50);
	}
});

Template.macro.events({
	'click #modal_submit': function (e, t) {
		e.preventDefault();
		$(t.find('.modal-window')).removeClass('show');
		$(t.find('.modal-mask')).removeClass('show');
	},

	'click .macro__item': function (e, t) {
		let $curr = $(e.currentTarget);

		if ($curr.hasClass('selected')) {
			$curr.removeClass('selected');
			Session.set('until', false);			
		} else {
			Session.set('until', this);
			$('.macro__item').removeClass('selected');
			$curr.addClass('selected');	
		}
	}
});