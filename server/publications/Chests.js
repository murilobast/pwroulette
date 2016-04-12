Meteor.publish('chests', () => {
	return Chests.find({}, {fields: {items: 0}});
});

Meteor.publish('fullChest', (id) => {
	return Chests.find({id: id});
});

Meteor.publish('itemInfo', () => {
	return ItemInfo.find();
});