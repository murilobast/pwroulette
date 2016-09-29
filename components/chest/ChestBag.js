import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'
import ChestDrops from './ChestDrops'

export default class ChestBag extends Component {
	render() {
		let chest = this.props.chest

		return (
			<View style={ styles.container }>
				<View style={ styles.header }>
					<Image
						style={ styles.icon }
						source={{ uri: 'http://static.pwsimulator.com/' + chest.id + '.png' }}
					/>
					<Text style={ styles.name }>{ chest.name }</Text>
				</View>
				<Text style={ styles.desc }>{ chest.desc }</Text>
				<View style={ styles.itemList }>
					<ChestDrops items={ chest.items }/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333'
	},

	header: {
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 2,
		padding: 12,
		paddingBottom: 0
	},

	icon: {
		width: 38,
		height: 38
	},

	name: {
		color: '#fff',
		fontSize: 18,
		marginLeft: 8
	},

	desc: {
		marginHorizontal: 12,
		marginBottom: 12,
		paddingVertical: 4,
		color: '#eee'
	},

	itemList: {
		flex: 1
	}
})