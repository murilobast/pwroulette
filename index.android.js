import React, { Component } from 'react'
import { AppRegistry, StatusBar } from 'react-native'
// Local imports
import colors from './vars/colors'
import ViewContainer from './components/ui/ViewContainer'

class pwsimulator extends Component {
	render() {
		return (
			<ViewContainer>
				<StatusBar
					backgroundColor={ colors.mainDarker }
				/>				
			</ViewContainer>
		)
	}
}

AppRegistry.registerComponent('pwsimulator', () => pwsimulator)