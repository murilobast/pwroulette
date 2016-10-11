import React, { Component } from 'react'
import { StyleSheet, Dimensions, ScrollView, View, Image, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'
import ChestItem from './ChestItem'

const { height, width } = Dimensions.get('window')
const itemSize = ((width - 24) - 48) / 8

export default class ChestBag extends Component {
	render() {
		const items = this.props.items

		const maxHeight = (items.length / 8) * itemSize + 12

		return <View style={ styles.bag }>
			{items.map((item, i) => {
				return <Image
					key={ i }
					style={ styles.icon }
					source={{ uri: 'http://static.pwsimulator.com/' + item.id + '.png' }}
				/>
			})}
		</View>
	}
}

const styles = StyleSheet.create({
	bag: {
		flex: 1,
		backgroundColor: colors.backgroundLight,
		height: (width / 1.5),
		width: (width - 24),
		marginHorizontal: 12,
		marginBottom: 12,
		borderRadius: 2,
		padding: 8,
		elevation: 2,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},

	icon: {
		width: itemSize,
		height: itemSize,
		margin: 2
	}
})