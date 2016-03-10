ItemInfo = new Mongo.Collection('itemInfo');

ItemInfo.attachSchema(new SimpleSchema({
	avatar: {
		type: Boolean,
		label: "Is regular",
		defaultValue: 0,
		optional: true
	},
	id: {
		type: Number,
		label: "ID",
		defaultValue: 0
	},
	infos: {
		type: Array,
		label: "Infos"
	},
	'infos.$': {
		type: Object
	},
	'infos.$.color': {
		type: String,
		label: "Color"
	},
	'infos.$.text': {
		type: String,
		label: "Text"
	},
	'type': {
		type: String,
		label: "Type",
		optional: true
	},
	addons: {
		type: Array,
		label: "Addons",
		optional: true
	},
	'addons.$': {
		type: String
	},
}));