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
	},

	info: function () {
		return ItemInfo.findOne({id: this.id});
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
		$(t.find('.modal-window.macro')).addClass('show');
		$(t.find('.modal-mask.macro')).addClass('show');
	},

	'click #add_chest': function (e, t) {
		$(t.find('.modal-window.addChest')).addClass('show');
		$(t.find('.modal-mask.addChest')).addClass('show');
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

			if (curChat.length > 50) {
				curChat.splice(0, 30);
			}

			if (amount === 0 || (expected && (item.id === expected))) {
				clearInterval(intervalID);
			}
			
		}, 50);
	}
});

Template.macro.events({
	'click #macro_submit': function (e, t) {
		e.preventDefault();
		$(t.find('.modal-window.macro')).removeClass('show');
		$(t.find('.modal-mask.macro')).removeClass('show');
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

Template.addChest.events({
	'submit .addChest': function (e, t) {
		e.preventDefault();
		$(t.find('.modal-window.addChest')).removeClass('show');
		$(t.find('.modal-mask.addChest')).removeClass('show');
		let url = e.target.url;
		crossGet(url.value);
		url.value = '';
	},

	'click .cancel': function (e, t) {
		e.preventDefault();
		$(t.find('.modal-window.addChest')).removeClass('show');
		$(t.find('.modal-mask.addChest')).removeClass('show');
	}
})

function crossGet(url) {
	url = 'http://www.pwdatabase.com/br/items/41069';
	let totalWeight = 0;
	let chest = {
		active: false,
		avatar: true,
		items: [],
		name: 'Fortificações: Prata',
		id: 35643
	}
	$.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(url) + "&callback=?", function (data) {
		$items = $(data.contents).find('tbody tr');

		$items.each(function (i, item) {
			let $obj = $(item).find('td');
			let id = $obj.find('a').attr('href');
			console.log(id, id.replace('items/', ''));
			let name = $($obj[1]).text();
			let weight = $obj.last().text();
			totalWeight += weight;
			chest.items.push({
				id: id,
				name: name,
				weight: weight,
				amount: 1
			});
		});
		console.log(chest);
	});
}
function crossGet2(url) {
	let urlReg = /(?:pwdatabase\.com\/br\/quest\/)([0-9]*)$/;
	if (urlReg.test(url)) {
		let chest = {
			active: false,
			items: []
		};

		$.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(url) + "&callback=?", function (data) {
			let $content = $(data.contents).find('tbody tr:last-of-type td:first-of-type p');
			let $last = $(data.contents).find('tbody tr:last-of-type td:last-of-type p');
			chest.name = $last.first().text();
			chest.id = Number($last.first().find('a').attr('href').replace('items/', ''));;

			let totalWeight = 0;
			let reg  = /(?:\s-\s([0-9]+)\s)?\(([0-9]+\.?[0-9]*)%\)/;
			let replace  = /(\([0-9]+\.?[0-9]*%\))/g;
			let start = (reg.test($($content[6]).text())) ? 6 : 7;

			for (let i = start; i < $content.length; i++) {
				let text = $($content[i]).text();
				let id = Number($($content[i]).find('a').attr('href').replace('items/', ''));
				let weight = Number(text.match(reg)[2]);
				totalWeight += weight;
				console.log(totalWeight.toFixed(4));
				let amount = text.match(reg)[1] || 1;

				text = text.replace(reg, '');
				text = text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				
				let obj = {
					id: id,
					name: text,
					weight: weight,
					amount: amount
				}
				chest.items.push(obj);
			}
			Meteor.call('createChest', chest);
		});
	} else {
		alert('ERRO: URL invalida.')
	}
}