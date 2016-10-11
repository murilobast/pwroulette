import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native'
// Local imports
import colors from '../../vars/colors'
import ChestDrops from './ChestDrops'
import ChestBag from './ChestBag'
import Button from '../ui/Button'

export default class ChestBagWrapper extends Component {
	render() {
		let chest = this.props.chest

		return (
			<ScrollView style={ styles.container } stickySectionHeaders={ true} stickyHeaderIndices={[ 0 ]} collapsableChildren={[ 0 ]} renderHeader={() => { <Text>aaaaaaaaaaa</Text>}}>
				<View style={ styles.header }>
					<Image
						style={ styles.icon }
						source={{ uri: 'http://static.pwsimulator.com/' + chest.id + '.png' }}
					/>
					<Text style={ styles.name }>{ chest.name }</Text>
				</View>
				<Text style={ styles.desc }>{ chest.desc }</Text>
				<ChestBag items={ chest.items }/>
				<View style={ styles.buttons }>
					<Button color={ colors.mainDarker }>Abrir</Button>
					<Button>Resetar</Button>
					<Button>Macro</Button>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
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

	buttons: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	}
})