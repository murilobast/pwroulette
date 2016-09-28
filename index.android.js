import React, { Component } from 'react'
import { AppRegistry, StatusBar } from 'react-native'
// Local imports
import ViewContainer from './components/ui/ViewContainer'
import AppNavigator from './navigation/AppNavigator'

class pwsimulator extends Component {
	render() {
		return (
			<ViewContainer>
				<AppNavigator/>
			</ViewContainer>
		)
	}
}

AppRegistry.registerComponent('pwsimulator', () => pwsimulator)