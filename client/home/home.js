Template.home.helpers({
	changelogs: function () {
		let changelogs = Changelog.find({}, {sort: {timestamp: 'desc'}}) || false;
		
		if (changelogs.count()) {
			return changelogs;
		}
	}
});