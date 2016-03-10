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
		label: "ID",
		defaultValue: 0
	},
	name: {
		type: String,
		label: "Name",
		defaultValue: 0
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
		label: "Name",
		defaultValue: 'frenesi'
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