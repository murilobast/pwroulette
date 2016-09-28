import React, { Component } from 'react'
import { Navigator, BackAndroid } from 'react-native'
// Local imports
import ChestList from '../components/chest/ChestList'

let navigator = {};

BackAndroid.addEventListener('hardwareBackPress', () => {
	if (navigator && navigator.getCurrentRoutes().length > 1) {
		navigator.pop()

		return true
	}

	return false
})

export default class AppNavigator extends Component {
	constructor(props) {
		super(props)

		this.state = { pushed: false }
	}

	_renderScene(route, navigator) {
		let globalNavigatorProps = { navigator }

		switch (route.name) {
			case 'list':
				return (
					<ChestList
						{ ...globalNavigatorProps }
					/>
				)

			default:
				return null
		}
	}

	render() {
		return (
			<Navigator
				initialRoute={{ name: 'list' }}
				ref={(nav) => { navigator = nav }}
				renderScene={ this._renderScene }
				configureScene={(route) => ({
					...route.sceneConfig || Navigator.SceneConfigs.FloatFromBottomAndroid
				})}
			/>
		)
	}
}
