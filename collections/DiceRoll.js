DiceRoll = new Mongo.Collection('diceroll');

DiceRoll.allow({
	insert: function () {
		return true;
	},

	remove: function () {
		return Roles.userIsInRole(Meteor.userId(), 'spqr', Meteor.user().emails[0].address);
	}
});