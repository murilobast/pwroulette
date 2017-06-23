import { render } from 'react-dom'
import { match, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { syncHistoryWithStore } from 'react-router-redux'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import routes from 'routes'
import configureStore from 'configureStore'

// Containers
import Root from './containers/Root'

OfflinePluginRuntime.install()
const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const rootProps = { store, history }
const rootEl = document.getElementById('root')

const renderApp = rootProps => (
	match({ routes, location }, (err, redirectLocation, renderProps) => {
		const props = {
			...rootProps,
			...renderProps
		}
		render(
			<AppContainer>
				<Root {...props} />
			</AppContainer>,
			rootEl
		)
	})
)

renderApp(rootProps)

if (module.hot) {
	module.hot.accept('containers/Root', () => renderApp(rootProps))
	module.hot.accept('routes', () => renderApp(rootProps))
}
