Session.setDefault('bag', []);
Session.setDefault('chat', []);
Session.setDefault('opened', 0);
Session.setDefault('selected', 0);
Session.setDefault('amount', 0);

intervalID = 0;

Template.chest.helpers({
	getChests: function () {
		return Chests.find({active: true});
	},

	getOtherChests: function () {
		return Chests.find({active: false});
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

Template.chest.events({
	'click .chest': function (e, t) {
		Session.set('bag', []);
		Session.set('opened', 0);
		$('.chest').removeClass('selected');
		$(e.currentTarget).addClass('selected');
		Session.set('selected', this);
		clearInterval(intervalID);
	},

	'submit #bag': function (e, t) {
		e.preventDefault();
		let amount = e.target.amount.value;
		let expected = 24725;

		let id = Session.get('selected').id;
		let chest = Chests.findOne({id: id});
		let curItems = Session.get('bag');
		let curChat = Session.get('chat');
		let chat = t.find('.chat');
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

			console.log(item.id);
			if (amount === 0 || (expected && (item.id === expected))) {
				clearInterval(intervalID);
			}
		}, 10);
		// setTimeout(function () {
		// 	chat.scrollTop = chat.scrollHeight;
		// }, 100);
	},
});