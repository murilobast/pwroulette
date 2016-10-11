import React, { Component } from 'react'
import { StyleSheet, StatusBar, DrawerLayoutAndroid, View, Image, Text, ToolbarAndroid } from 'react-native'
// Local imports
import colors from '../../vars/colors'
import NavigationView from './NavigationView'

export default class ViewContainer extends Component {
	render() {
		return (
			<DrawerLayoutAndroid
				ref={(ref) => this._drawer = ref }
				drawerWidth={ 300 }
				drawerPosition={ DrawerLayoutAndroid.positions.Left }
				renderNavigationView={ () => <NavigationView/> }
			>
				<StatusBar
					backgroundColor={ colors.mainDarker }
				/>
				<ToolbarAndroid
					style={[ styles.toolbar ]}
					navIcon={ require('image!ic_menu_white_24dp') }
					onIconClicked={() => { this._drawer.openDrawer() }}
				>
					<Text style={ styles.titleFirst }>PW</Text>
					<Text style={ styles.titleSecond }>SIMULATOR</Text>
				</ToolbarAndroid>
				<Image source={{ uri: 'http://cdn.wallpapersafari.com/43/54/KgpyxG.jpg' }} style={ styles.content }>
					<View style={{ backgroundColor: colors.background, flex: 1 }}>
						{ this.props.children }
					</View>
				</Image>
			</DrawerLayoutAndroid>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#333'
	},

	titleFirst: {
		color: 'rgba(255, 255, 255, .7)',
		fontSize: 20
	},

	titleSecond: {
		color: 'rgba(255, 255, 255, 1)',
		fontSize: 20,
		fontWeight: 'bold'
	},

	toolbar: {
		backgroundColor: colors.main,
		height: 56,
		elevation: 3
	}
})