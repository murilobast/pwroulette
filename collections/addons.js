Addons = new Mongo.Collection('addons');

Addons.attachSchema(new SimpleSchema({
	id: {
		type: Number,
		label: "ID",
		defaultValue: 0
	},
	extra: {
		type: Array,
		label: 'Extra adds',
	},
	'extra.$': {
		type: Object
	},
	'extra.$.name': {
		type: String,
		label: "Name",
		defaultValue: 'frenesi'
	},
	'extra.$.weight': {
		type: Number,
		label: "weight",
		decimal: true,
		defaultValue: 0
	},
	unique: {
		type: Array,
		label: 'Unique Adds',
	},
	'unique.$': {
		type: Object
	},
	'unique.$.name': {
		type: String,
		label: "Name",
		defaultValue: 'crit'
	},
	'unique.$.weight': {
		type: Number,
		label: "Weight",
		decimal: true,
		defaultValue: 0
	},
	amount: {
		type: Number,
		label: "Amount of adds",
		defaultValue: 3
	},
}));