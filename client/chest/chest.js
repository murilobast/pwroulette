Session.setDefault('bag', []);
Session.setDefault('chat', []);
Session.setDefault('opened', 0);

chest = {
	names: [
		'Sorte - Perfect World',
		'Muita Sorte - Perfect World',
		'Hierograma de Platina',
		'Amuleto de Platina',
		'Diamante do Dragão',
		'Diamante do Tigre',
		'Pedra Verdejante',
		'Baú dos Espíritos',
		'Baú dos Elementos',
		'Símbolo da Cid do Gelo Marcial',
		'Vale da Lua - Acessório',
		'Vale da Lua - Arma',
		'Asa de Sucesso - Vale da Lua',
		'Asa de Pegasus',
		'Relíquia da Alma',
		'Prova do Campeão',
		'Insígnia Líder Brado de Batalha',
		'Carimbo da Diretoria do Cubo',
		'Manuscrito do Destino',
		'Pergaminho dos Deuses',
		'Manjusri',
		'Akasagarbha',
		'Cajado do Deserto',
		'Cetro dos Cavaleiros do Vento',
		'Bilhete da Medalha de Glória',
		'Capa Universal',
		'Mochila da União',
		'Baú de Yaksha',
		'Pedra da Nevasca'
	],
	chance: [
		86.988,
		4.8,
		2,
		2,
		.1,
		.1,
		.15,
		.1,
		.3,
		.15,
		.15,
		.15,
		.1,
		.1,
		.1,
		.3,
		.1,
		.1,
		.08,
		.002,
		.5,
		.5,
		.1,
		.1,
		.05,
		.03,
		.4,
		.3,
		.15
	],
	amount: [
		15,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1
	]
}

Template.chest.helpers({
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
	}
});

Template.chest.events({
	'submit #chest': function (e, t) {
		e.preventDefault();

		var curItems = Session.get('bag');
		var curChat = Session.get('chat');
		var chat = t.find('.chat');
		var item = OpenChest(chest);
		var opened = Session.get('opened');
		var msg = 'Recebeu ' + item.amount + ' ' +  item.name;;
		if (curItems[item.id] === undefined || curItems[item.id] === null) {
			curItems[item.id] = item;
			curChat.push(msg);
			opened++;
		} else if (curItems[item.id] !== null) {
			curItems[item.id].amount += item.amount;
			curChat.push(msg);
			opened++;
		}

		Session.set('bag', curItems);
		Session.set('chat', curChat);
		Session.set('opened', opened);

		setTimeout(function () {
			chat.scrollTop = chat.scrollHeight;
		}, 100);
	},
});