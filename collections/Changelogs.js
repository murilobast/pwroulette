Changelogs = new Mongo.Collection('changelog');

Changelogs.attachSchema(new SimpleSchema({
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

Changelogs.allow({
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