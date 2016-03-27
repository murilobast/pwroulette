Meteor.publish('items', function () {
	return Items.find();
});

Meteor.publish('addons', function () {
	return Addons.find();
});