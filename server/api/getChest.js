const redis = require('redis')
const pmongo = require('promised-mongo')

const client = redis.createClient({
	prefix: 'pws-static-'
})

const DB_URL = 'mongodb://127.0.0.1:27017/pws'
const REDIS_EXPIRE_AT = 5 * 60

// const { chests } = pmongo(DB_URL, ['chests'])
const queryFields = {
	single: { _id: 0 },
	all: { id: 1, name: 1, image: 1, description: 1, _id: 0 }
}

const fetchChestFromDb = id => {
	const { chests } = pmongo(DB_URL, ['chests'])
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
	client.get(`chest-${id}`, async (err, chest) => {
		if (chest) {
			res.send({
				erro: false,
				data: JSON.parse(chest)
			})
			return
		}
		const chestFromDb = await fetchChestFromDb(id)
		if (chestFromDb) {
			client.setex(`chest-${id}`, REDIS_EXPIRE_AT, JSON.stringify(chestFromDb))
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
	})
}

module.exports = getChest
