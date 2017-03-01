Meteor.methods({
	'createChest': (chest) => {
		if (!Chests.findOne({id: chest.id})) {
			Chests.insert(chest, (err, data) => {
				if (!err) {
					console.log('Inserting chest: ' + chest.id)
					
					getImage(chest.id)

					chest.items.forEach((val, i) => {
						getImage(val.id, false)
					
						if (i + 1 === chest.items.length && chest.avatar)
							getImage(val.id, true)
					})
				}
			})

			return
		} else {
			Chests.remove({ id: chest.id }, () => {
				console.log('Chest', chest.id, 'already exist')
				Meteor.call('createChest', chest)
				console.log('Delleting and calling it again!')			
			});
		}
	},

	'updateChests': () => {
		let chests = Chests.find().fetch();
		let ids = [];

		for (let chest of chests) {
			if (!chest.avatar)
				ids.push(getChestFromItemId(chest.id))
			console.log(chests.length - ids.length)
		}

		return ids;
	},

	'returnData': function (url) {

		return HTTP.call('GET', url);
	}
});

function getImage(id, card) {
	let url = 'http://127.0.0.1:8080'

	HTTP.call( 'GET', url, {
		params: {
			"id": id,
			"url": 'http://www.pwdatabase.com/images/icons/generalm/' + id + '.png',
			"type": 'icon'
		}
	})
	
	if (card)
		HTTP.call( 'GET', url, {
			params: {
				"id": id,
				"url": 'http://www.pwdatabase.com/images/icons/cards/' + id + '.jpg',
				type: 'card'
			}
		})
}


function getChestFromItemId(chestId) {
	let url = 'http://pwdatabase.com/br/items/' + chestId;
	let result = HTTP.call('GET', url);
	let rgxp = /<a href="quest\/([0-9]+)"/;
	let id = result.content.match(rgxp)[1];

	return id;
}