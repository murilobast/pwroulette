import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import transit from 'transit-immutable-js'
import promiseMiddleware from 'redux-promise-middleware'
import promiseWaiter from 'helpers/promiseWaiter'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './ducks'

const composeEnhancers = process.browser ?
	(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :
	compose
// deserialize the JSON to Immutable
const preloadedState = process.browser && window.__STATE__ ?
	transit.fromJSON(window.__STATE__) :
	undefined

export default function configureStore() {
	const store = createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(
				routerMiddleware(browserHistory),
				promiseWaiter,
				promiseMiddleware()
			)
		)
	)

	if (process.env.NODE_ENV === 'development' && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./ducks', () => {
			const nextRootReducer = require('./ducks')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
