import React, { Component } from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'

export default class Button extends Component {
	render() {
		return <TouchableNativeFeedback>
			<View style={[ { backgroundColor: this.props.color || colors.main }, styles.button ]}>
				<Text style={ styles.text }>{ this.props.children }</Text>
			</View>			
		</TouchableNativeFeedback>
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 2,
		paddingVertical: 6,
		paddingHorizontal: 22,
		elevation: 3,
		margin: 8
	},

	text: {
		color: '#fff'
	}
})