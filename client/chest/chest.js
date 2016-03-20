Session.setDefault('bag', []);
Session.setDefault('chat', []);
Session.setDefault('selected', 0);
Session.setDefault('opened', 0);
Session.setDefault('amount', 0);
Session.setDefault('until', 0);

intervalID = 0;

Template.chest.rendered = function () {
	let intervalTimer = setInterval(function () {
		if ($('img[data-src]').length > 0) {
			lazyLoad(function () {
				clearInterval(intervalTimer);
			});
		}
	}, 100);
};

Template.chest.helpers({
	getChests: function () {
		return Chests.find({active: true, $or: [{avatar: false}, {avatar: {$exists: false}}]}, {sort: {_id: 1}});
	},

	getOtherChests: function () {
		return Chests.find({active: false, $or: [{avatar: false}, {avatar: {$exists: false}}]}, {sort: {_id: 1}});
	},

	getAvatarChests: function () {
		return Chests.find({active: false, avatar: true}, {sort: {_id: 1}});
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
		if (!Session.get('selected'))
			Session.set('selected', Chests.findOne({}, {sort: {_id: 1}}))
		return Session.get('selected') || Chests.findOne({}, {sort: {_id: 1}});
	},

	info: function () {
		return ItemInfo.findOne({id: this.id});
	}
});

Template.macro.helpers({
	chestItems: function () {
		let selected = Session.get('selected');
		if (selected) {
			return Session.get('selected').items;
		}
	},

	untl: function () {
		return Session.get('until');
	},

	info: function () {
		return ItemInfo.findOne({id: this.id});
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
		console.log(this);
		Session.set('selected', this);
	},

	'click #macro': function (e, t) {
		$(t.find('.modal-window.macro')).addClass('show');
		$(t.find('.modal-mask.macro')).addClass('show');
		// lazyLoad();
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
		let $chat = $(t.find('.chat'));
		let item = {};
		let msg = '';

		if (intervalID) {
			clearInterval(intervalID);
		}

		intervalID = setInterval(function () {

			chest = Chests.findOne({id: id});
			item = new OpenChest(chest.items);
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

			if (curChat.length > 30) {
				curChat.splice(0, 20);
			}

			if (amount === 0 || (expected && (item.id === expected))) {
				clearInterval(intervalID);
			}
			
			setTimeout(function () {
				chat.scrollTop = chat.scrollHeight;
				lazyLoad();
			}, 200);
		}, 20);
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

insertAvatarChest = function (url) {
	let urlReg = /(?:pwdatabase\.com\/br\/items\/)([0-9]*)$/;
	let totalWeight = 0;
	let weightFix = .0011;
	let itemId = Number(url.match(urlReg)[1]);
	let chest = {
		active: false,
		avatar: true,
		id: itemId,
		items: []
	}

	$.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(url) + "&callback=?", function (data) {
		chest.name = $(data.contents).find('.itemHeader span').text();
		$items = $(data.contents).find('.sortable tbody tr');
		$items.each(function (i, item) {
			let $item = $(item).find('td');
			let anchor = $item.find('a').first().attr('href');
			if (typeof anchor !== 'undefined') {
				let id = Number(anchor.replace('items/', ''));
				let name = $($item[1]).text();
				let weight = (Number($item.last().text()) + weightFix).toFixed(3);
				totalWeight += weight;
				chest.items.push({
					id: id,
					name: name,
					weight: weight,
					amount: 1,
					avatar: true
				});
			}
		});
		Meteor.call('createChest', chest);
	});
}

function crossGet(url) {
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
			console.log(chest);
			Meteor.call('createChest', chest);
		});
	} else {
		alert('ERRO: URL invalida.')
	}
}

function lazyLoad(cb) {
	let $images = $('img[data-src]');
	if ($images.length > 0) {
		$images.each(function (i, img) {
			let $img = $(img);
			let src = $img.data('src');
			$img.attr('src', src);

			img.onload = function () {
				img.removeAttribute('data-src');
			}

			if (typeof cb === 'function' && i === $images.length - 1) {
				cb();
			}
		});
	}
}