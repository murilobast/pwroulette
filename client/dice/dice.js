Template.dice.helpers({
	results: function () {
		return DiceRoll.find({}, {sort: {value: 'desc'}});
	},

	hasResult: function () {
		return DiceRoll.find().count() > 0;
	},

	hasPower: function () {
		if (Meteor.user()) {
			return Roles.userIsInRole(Meteor.userId(), 'spqr', Meteor.user().emails[0].address);
		}
	}
});

Template.diceResult.helpers({
	hasPower: function () {
		if (Meteor.user()) {
			return Roles.userIsInRole(Meteor.userId(), 'spqr', Meteor.user().emails[0].address);
		}
	}
});

Template.dice.events({
	'submit #dice': function (e, t) {
		e.preventDefault();
		var limit = false;
		if (Session.get('limit')) {
			limit = ((new Date() - Session.get('limit')) < 10000) ? Session.get('limit') : false;
			if ((new Date() - Session.get('limit')) < 10000) {
				alert('Você so poderá rolar um dado a cada 10 segundos.');
			}
			console.log(new Date() - Session.get('limit'));
		}
		if (!limit) {
			var name = e.target.name;
			var roll = Math.floor(Math.random() * 20 + 1);

			var dice = {
				name: name.value,
				value: roll
			}

			if (DiceRoll.find({name: name.value}).count() === 0 && name.value !== '') {
				DiceRoll.insert(dice, function (err, data) {
					if (!err) {
						Session.set('limit', new Date());
					}
				});
			}
		}
	},

	'click #reset': function (e, t) {
		var confirm = window.confirm('Deseja realmente resetar a lista?');
		if (confirm === true) {
			Meteor.call('cleanDice');
		}
	}
});

Template.diceResult.events({
	'click #remove': function (e, t) {
		console.log(this._id);
		DiceRoll.remove(this._id);
	}
})