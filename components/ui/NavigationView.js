import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'

export default class NavigationView extends Component {
	render() {
		return (
			<ScrollView style={ styles.container }>
				<Text style={ styles.item }>First Item</Text>
				<Text style={ styles.item }>Second Item</Text>
				<Text style={ styles.item }>Third Item</Text>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333',
		paddingVertical: 40,
		paddingHorizontal: 20
	},

	item: {
		color: '#fff',
		margin: 10,
		fontSize: 17,
		textAlign: 'left'
	}
})
