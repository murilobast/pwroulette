Chests = new Mongo.Collection('chests');

Chests.attachSchema(new SimpleSchema({
	active: {
		type: Boolean,
		label: "Active"
	},
	avatar: {
		type: Boolean,
		label: "Avatar",
		defaultValue: false,
		optional: true
	},
	id: {
		type: Number,
		label: "ID"
	},
	name: {
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description",
		optional: true
	},
	items: {
		type: Array,
		label: 'Items'
	},
	'items.$': {
		type: Object
	},
	'items.$.name': {
		type: String,
		label: "Name"
	},
	'items.$.weight': {
		type: Number,
		label: "Weight",
		decimal: true,
		defaultValue: 0
	},
	'items.$.amount': {
		type: Number,
		label: "Amount",
		defaultValue: 0
	},
	'items.$.id': {
		type: Number,
		label: "ID",
		defaultValue: 0
	},
	'items.$.avatar': {
		type: Boolean,
		label: "Avatar",
		defaultValue: false,
		optional: true
	},
}));

Chests.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	remove: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	}
});