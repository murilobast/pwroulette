Meteor.publish('dices', function () {
	return DiceRoll.find();
});