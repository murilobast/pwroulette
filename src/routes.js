import { Route, IndexRoute } from 'react-router'

// Containers
import App from './containers/App'

const loadRoute = callback => (module) => {
	if (!module) {
		callback()
	} else {
		callback(null, module.default)
	}
}

const errorOnLoadingRoute = error => {
	console.log(error)
	throw new Error('Error on dynamic route loading', error)
}

const routes = (
	<Route
		path={'/'}
		component={App}
	>
		<IndexRoute
			getComponent={(location, cb) => {
				System.import('./containers/routes/Home')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/chests'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/Chests')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/chest'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/Chests')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/chest/:id'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/Chest')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/refinner'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/Refinner')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/trivia'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/Trivia')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/trivia/:category'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/TriviaCategory')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/trivia/:category/:question'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/TriviaQuestion')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/desafio-do-conhecimento'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/ScholarlyChallenge')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/desafio-do-conhecimento/:question'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/ScholarlyQuestion')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
		<Route
			path={'/*'}
			getComponent={(location, cb) => {
				System.import('./containers/routes/Home')
					.then(loadRoute(cb, null))
					.catch(errorOnLoadingRoute)
			}}
		/>
	</Route>
)

export default routes
