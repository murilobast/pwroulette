Meteor.publish('chests', () => {
	return Chests.find();
});

Meteor.publish('fullChest', (id) => {
	return Chests.find({id: id});
});

Meteor.publish('itemInfo', () => {
	return ItemInfo.find();
});