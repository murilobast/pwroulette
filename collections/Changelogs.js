Changelogs = new Mongo.Collection('changelogs');

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
		return true;
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	update: function () {
		return true;
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	},
	remove: function () {
		return true;
		return Roles.userIsInRole(Meteor.userId(), 'admin', Meteor.user().emails[0].address);
	}
});