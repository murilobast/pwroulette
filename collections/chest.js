Chests = new Mongo.Collection('chests');

Chests.attachSchema(new SimpleSchema({
	active: {
		type: Boolean,
		label: "Active",
		defaultValue: 1
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
		label: "weight",
		decimal: true,
		defaultValue: 0
	},
	'items.$.amount': {
		type: Number,
		label: "weight",
		defaultValue: 0
	},
	'items.$.id': {
		type: Number,
		label: "weight",
		defaultValue: 0
	}
}));