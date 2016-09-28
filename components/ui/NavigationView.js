import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'

export default class NavigationView extends Component {
	render() {
		return (
			<ScrollView style={ styles.container }>
				<Text style={ styles.item }>Listagem</Text>
				<Text style={ styles.item }>Adicionar Baú</Text>
				<Text style={ styles.item }>Sobre</Text>
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
