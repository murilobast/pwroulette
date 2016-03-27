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

Changelog.allow({
	insert: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	update: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	remove: function () {
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	}
});