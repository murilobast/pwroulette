Meteor.publish('changelog', function () {
	return Changelog.find();
});