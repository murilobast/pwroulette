Meteor.methods({
	'cleanDice': function () {
		DiceRoll.remove({});
	},

	'hasPower': function () {
		return Roles.userIsInRole(Meteor.userId(), 'spqr', Meteor.user().emails[0].address);
	},

	'registerSPQR': function () {
		Roles.addUsersToRoles(Meteor.userId(), ['spqr'], Meteor.user().emails[0].address);
	}
});