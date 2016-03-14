Template.home.helpers({
	changelogs: function () {
		return Changelog.find({}, {sort: {timestamp: 'desc'}})
	}
});