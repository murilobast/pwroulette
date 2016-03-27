Meteor.publish('chests', function () {
	return Chests.find();
});

Meteor.publish('itemInfo', function () {
	return ItemInfo.find();
});