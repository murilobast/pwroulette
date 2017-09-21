const express = require('express')
const app = express()
const path = require('path')
const renderer = require('./renderer')
const insertChest = require('./api/insertChest')
const compression = require('compression')
const responseTime = require('response-time')

const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) {
		return false
	}

	return compression.filter(req, res)
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../build'))

app.use(compression({ filter: shouldCompress }))
app.use(responseTime())

app.post('/api/add-chest/:id', insertChest)
app.get('*', renderer)
app.use(express.static(path.join(__dirname, '../build')))

app.listen(8081, ()=>{
    console.log('[SSR + Redis] Listening on port 8081')
})
