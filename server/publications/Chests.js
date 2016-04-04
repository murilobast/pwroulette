Meteor.publish('chests', () => {
	return Chests.find();
});