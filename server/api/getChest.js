const { Db, MongoClient, Server } = require('mongodb')
const NodeCache = require('node-cache')

const DB_URL = 'mongodb://pwsimulator.com:27017/pws'

const cache = new NodeCache({ srdTTL: 10 })
const queryFields = {
	single: { fields: { _id: 0 } },
	all: { fields: { id: 1, name: 1, image: 1, description: 1, _id: 0 } }
}

const fetchChestFromDb = async id => new Promise((resolve, reject) => {
	MongoClient.connect(DB_URL, (err, db) => {
		if (!err) {
			const collection = db.collection('chests')
			const fields = id === 'all' ? queryFields.all : queryFields.single
			const query = id === 'all' ? {} : { id: Number(id) }
			collection.find(query, fields).toArray((err, result) => {
				if (!err) {
					db.close()
					if (!!result.length) {
						const data = id === 'all' ? result : result[0]
						resolve(data)
					}
					resolve(false)
				}
				db.close()
				reject(false)
			})
			return
		}
		db.close()
		resolve(false)
	})
})

const getChest = async (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	const { id } = req.params
	cache.get(`chest-${id}`, async (err, chest) => {
		if (!err) {
			if (typeof chest === 'undefined') {
				const chestFromDb = await fetchChestFromDb(id)
				if (chestFromDb) {
					cache.set(`chest-${id}`, chestFromDb, 300)
					res.send({
						error: false,
						data: chestFromDb
					})
				}
				else
					res.send({
						error: true,
						message: 'Chest not found'
					})
				return
			}
			res.send({
				erro: false,
				data: chest
			})
		}
	})
}

module.exports = getChest
