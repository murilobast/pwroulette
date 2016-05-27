Meteor.publish('items', () => {
	return Items.find({}, {sort: {id: 1}});
});

Meteor.publish('addons', () => {
	return Addons.find();
});

Meteor.publish('fullItem', (id) => {
	return Items.find({id: id});
});