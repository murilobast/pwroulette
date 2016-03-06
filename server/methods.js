Meteor.methods({
	'cleanDice': function () {
		DiceRoll.remove({});
	},

	'hasPower': function () {
		return Roles.userIsInRole(Meteor.userId(), 'spqr', Meteor.user().emails[0].address);
	},

	'registerSPQR': function () {
		Roles.addUsersToRoles(Meteor.userId(), ['spqr'], Meteor.user().emails[0].address);
	},

	'createChest': function (chest) {
		if (!Chests.findOne({id: chest.id})) {
			Chests.insert(chest, function (err, data) {
				if (!err) {
					console.log('Inserting chest: ' + chest.id);
					getImage(chest.id);
					chest.items.forEach(function (val, i) {
						getImage(val.id);
					});
				}
			});
			return;
		} else {
			// Chests.remove({id: chest.id});
			console.log('Chest already exist');
		}
	}
});

function getImage(id) {
	HTTP.call( 'GET', 'http://pwsimulator.com:8080', {
		params: {
			"id": id,
			"url": 'http://www.pwdatabase.com/images/icons/generalm/' + id + '.png'
			}
	});
}