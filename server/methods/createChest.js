Meteor.methods({
	'createChest': function (chest) {
		if (!Chests.findOne({id: chest.id})) {
			Chests.insert(chest, function (err, data) {
				if (!err) {
					console.log('Inserting chest: ' + chest.id);
					
					getImage(chest.id);

					chest.items.forEach(function (val, i) {
						getImage(val.id, false);
					
						if (chest.avatar)
							getImage(val.id, true);
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

function getImage(id, card) {
	let url = 'http://127.0.0.1:8080';
	HTTP.call( 'GET', url, {
		params: {
			"id": id,
			"url": 'http://www.pwdatabase.com/images/icons/generalm/' + id + '.png',
			"type": 'icon'
		}
	});
	
	if (card) {
		HTTP.call( 'GET', url, {
			params: {
				"id": id,
				"url": 'http://www.pwdatabase.com/images/icons/cards/' + id + '.jpg',
				type: 'card'
				}
		});
	}
}