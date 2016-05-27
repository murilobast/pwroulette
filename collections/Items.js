Items = new Mongo.Collection('items');

Items.attachSchema(new SimpleSchema({
	itemType: {
		type: Number,
		label: "Item type",
		defaultValue: 0
	},
	id: {
		type: Number,
		label: "ID",
		min: 0,
		defaultValue: 0
	},
	name: {
		type: String,
		label: "Name"
	},
	type: {
		type: String,
		label: "Type"
	},
	grade: {
		type: Number,
		label: "Grade",
		min: 1,
		defaultValue: 15
	},
	freq: {
		type: String,
		label: "Atq speed",
		optional: true
	},
	alcan: {
		type: String,
		label: "Range",
		optional: true
	},
	pAtq: {
		type: String,
		label: "Physical Atq",
		optional: true
	},
	mAtq: {
		type: String,
		label: "Magic Atq",
		optional: true
	},
	dur: {
		type: String,
		label: "Durability",
		defaultValue: '360/360'
	},
	rest: {
		type: String,
		label: "Class restriction",
		defaultValue: 'Místico, Sacerdote, Arqueiro, Mercenário, Bárbaro, Feiticeira, Espiritualista, Mago, Guerreiro'
	},
	req: {
		type: Array,
		label: 'Requisites',
	},
	'req.$': {
		type: String
	},
	addType: {
		type: Number,
		label: "Adds Type",
		defaultValue: 0
	},
	tab: {
		type: Number,
		label: "Tab ID",
		min: 0,
		defaultValue: 0
	},
	require: {
		type: Array,
		label: 'Required Items',
	},
	'require.$': {
		type: Object
	},
	'require.$.id': {
		type: Number,
		label: 'Item ID',
		min: 0
	},
	'require.$.name': {
		type: String,
		label: 'Item Name',
	},
	'require.$.amount': {
		type: Number,
		label: 'Amount',
		min: 0
	},
	cost: {
		type: Number,
		label: "Cost",
		min: 0,
		defaultValue: 0
	},
}));

Items.allow({
	insert: function () {
		return true;
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	update: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	remove: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	}
});