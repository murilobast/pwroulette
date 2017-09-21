const pmongo = require('promised-mongo')
const NodeCache = require('node-cache')

const DB_URL = 'mongodb://pwsimulator.com:27017/pws'

const { chests } = pmongo(DB_URL, ['chests'])
const cache = new NodeCache({ srdTTL: 10 })
const queryFields = {
	single: { _id: 0 },
	all: { id: 1, name: 1, image: 1, description: 1, _id: 0 }
}

const fetchChestFromDb = id => {
	const fields = id === 'all' ? queryFields.all : queryFields.single
	const query = id === 'all' ? {} : { id: Number(id) }
	if (id === 'all')
		return chests.find(query, fields)
	return chests.findOne(query, fields)
}

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
