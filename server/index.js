const cluster = require('cluster')
const express = require('express')
const path = require('path')
const renderer = require('./renderer')
const getChest = require('./api/getChest')
const insertChest = require('./api/insertChest')
const compression = require('compression')
const responseTime = require('response-time')
const env = 'NODE_ENV' in process.env ? process.env.NODE_ENV : 'development'
const PORT = env === 'production' ? 80 : 8081

const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) {
		return false
	}
	return compression.filter(req, res)
}

if (cluster.isMaster) {
	const cpuCount = require('os').cpus().length

	console.log('There are', cpuCount, 'cpus')
	for (let i = 0; i < cpuCount; i ++)
		cluster.fork()

} else {
	const app = express()
	app.set('trust proxy', 1)
	app.set('view engine', 'ejs')
	app.set('views', path.join(__dirname, '../build'))
	app.use(compression({ filter: shouldCompress }))
	app.use(responseTime())
	app.get('/api/add-chest/:id', insertChest)
	app.get('/api/get-chest/:id', getChest)
	app.get('*', renderer)
	app.use(express.static(path.join(__dirname, '../build'), { maxAge: '1d' }))
	app.listen(PORT, () => {
		console.log('oeeee', process.env.NODE_ENV)
		console.log(`[SSR + Redis] Listening on port ${PORT}`)
	})
}
