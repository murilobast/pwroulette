import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import transit from 'transit-immutable-js'
import redis from 'redis'

// Local
import routes from 'routes'
import configureStore from 'configureStore'
import { setDefaults } from 'helpers/apiRequest'

const REDIS_EXPIRE_AT = 5 * 60
const client = redis.createClient({
	prefix: 'pws-static-'
})

client.on('error', function (err) {
    console.log("Error " + err);
})

const renderer = (req, res, next) => {
	match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
		const store = configureStore()
		let markup = ''
		renderApp(store, renderProps)

		if (err) {
			res.status(500).send(err.message)
			return
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
			return
		}

		Promise.all(store.getState().promise).then(() => {
				// There's no need for promises in the initial state
				store.getState().promise = []
				const serialized = transit.toJSON(store.getState())
				if (renderProps)
					markup = renderApp(store, renderProps)

				// Getting seo markup
				const seo = Helmet.renderStatic()

				res.render('index', {
					markup,
					seo,
					preloadedState: serialized,
					styles: null // Critical path css will be here
				})
				res.end()

				const cacheObject = {
					markup,
					seo,
					serialized
				}

				client.setex(req.url, REDIS_EXPIRE_AT, JSON.stringify(cacheObject))
			}
		).catch(
			(error) => {
				console.log(error)
				res.status(400)
				res.end()
			}
		)
	})
}

const renderApp = (store, renderProps) => renderToString(
	<Provider store={store}>
		<RouterContext { ...renderProps } />
	</Provider>
)

const rendererWithCache = (req, res, next) => {
	client.get(req.url, (err, result) => {
		if (result) {
			console.log('with cache', req.url)
			const { markup, seo, serialized } = JSON.parse(result)

			res.render('index', {
				markup,
				seo,
				preloadedState: serialized,
				styles: null // Critical path css will be here
			})
			res.end()

			return
		}
		console.log('without cache', req.url)

		renderer(req, res, next)
	})
}

const renderWithApiToken = (req, res, next) => {
	// skips static directory, favicon and sw script
	if (req.path === '/favicon.png' ||
		req.path === '/favicon.ico' ||
		req.path === '/sw.js' ||
		req.path.split('/')[1] === 'static' ||
		req.path.split('/')[1] === 'appcache')
		return next()

		rendererWithCache(req, res, next)
}

module.exports = renderWithApiToken
