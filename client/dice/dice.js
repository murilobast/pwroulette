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
		var name = e.target.name;
		var roll = Math.floor(Math.random() * 20 + 1);

		var dice = {
			name: name.value,
			value: roll
		}

		if (DiceRoll.find({name: name.value}).count() === 0 && name.value !== '') {
			DiceRoll.insert(dice);
		}
	},

	'click #reset': function (e, t) {
		var confirm = window.confirm('Deseja realmente resetar a lista?');
		if (confirm === true) {
			Meteor.call('cleanDice');
		}
	}
});