Meteor.publish('fullChest', function (id) {
	return Chests.find({}, {fields: {items: 1}});
});

Meteor.publish('chests', function () {
	return Chests.find({}, {fields: {items: 0}});
});

Meteor.publish('itemInfo', function () {
	return ItemInfo.find();
});