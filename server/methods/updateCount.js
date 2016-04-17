Meteor.methods({
	'updateCount': function (id) {
		let chest = Chests.findOne({id: id});

		if (typeof chest !== 'undefined') {
			let count = (typeof chest.count !== 'undefined')
				? chest.count + 1
				: 1;

			Chests.update({id: chest.id}, {$set: {count}}, (err, data) => {
				console.log('Updating chest:', id, 'count =', count);
			});

			return;
		} else {
			console.log('No chest found with id: ' + id);
		}
	}
});