ItemInfo = new Mongo.Collection('itemInfo');

ItemInfo.attachSchema(new SimpleSchema({
	regular: {
		type: Boolean,
		label: "Is regular",
		defaultValue: 1
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
	}
}));