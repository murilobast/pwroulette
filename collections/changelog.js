Changelog = new Mongo.Collection('changelog');

Changelog.attachSchema(new SimpleSchema({
	timestamp: {
		type: Date,
		label: "Time",
		optional: true
	},
	desc: {
		type: String,
		label: "Description"
	}
}));