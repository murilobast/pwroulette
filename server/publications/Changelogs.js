Meteor.publish('changelogs', () => {
	return Changelogs.find();
});