import React, { Component } from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Image, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'

export default class ChestItem extends Component {
	render() {
		let chest = this.props.chest

		return (
			<TouchableNativeFeedback
				onPress={ this._goToChest }
			>
				<View style={ styles.container }>
					<Image
						style={ styles.icon }
						source={{ uri: 'http://static.pwsimulator.com/' + chest.id + '.png' }}
					/>
					<Text style={ styles.name }>{ chest.name }</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}

	_goToChest() {
		this.props.navigator.push({ name: 'chest', data: chest })
	}
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 12,
		marginVertical: 6,
		padding: 8,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#303030',
		borderRadius: 2,
		elevation: 2
	},

	icon: {
		width: 38,
		height: 38
	},

	name: {
		color: '#fff',
		fontSize: 18,
		marginLeft: 8
	}
})