DiceRoll = new Mongo.Collection('diceroll');

DiceRoll.allow({
	insert: function () {
		return true;
	}
});