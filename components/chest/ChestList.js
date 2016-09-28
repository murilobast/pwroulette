import React, { Component } from 'react'
import { StyleSheet, Dimensions, Modal, View, ListView, Text, TextInput } from 'react-native'
import ActionButton from 'react-native-action-button'
import S from 'string'
// Local imports
import ChestItem from './ChestItem'
import ChestAdd from './ChestAdd'
import colors from '../../vars/colors'
import chests from '../../vars/chests'

const { height, width } = Dimensions.get('window')
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class ChestList extends Component {
	constructor(props) {
		super(props)
		let data = [...chests, ...chests, ...chests, ...chests]


		this.state = {
			chests: data,
			chestDataSource: ds.cloneWithRows(data),
			modalVisible: false
		}

		this._hideModal = this._hideModal.bind(this)
		this._openModal = this._openModal.bind(this)
		this._filterChests = this._filterChests.bind(this)
	}

	_hideModal() {
		this.setState({ modalVisible: false })
	}
		
	_openModal() {
		this.setState({ modalVisible: true })
	}

	_filterChests(text) {
		let chests = this.state.chests.filter((obj) => {
			let parsedText = S(obj.name).latinise().toLowerCase().s

			return parsedText.indexOf(text.toLowerCase()) !== -1
		})

		this.setState({ chestDataSource: ds.cloneWithRows(chests) })
	}

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.header }>
					<TextInput 
						style={ styles.search }
						autoCorrect={ false }
						blurOnSubmit={ true }
						underlineColorAndroid={ colors.main }
						onChangeText={(text) => { this._filterChests(text) }}
						defaultValue={ 'Pesquisar...' }
					/>
				</View>
				<ListView
					initialListSize={ 12 }
					scrollRenderAheadDistance={ 2 }
					dataSource={ this.state.chestDataSource }
					renderHeader={ this._renderHeader }
					renderRow={(chest) => { return this._renderItemRow(chest) }}
					enableEmptySections={ true }
				/>
				 <Modal
					animationType={ 'slide' }
					transparent={ true }
					visible={ this.state.modalVisible }
					onRequestClose={ this._hideModal }
				>
					<ChestAdd/>
				</Modal>
				 <ActionButton onPress={ this._openModal } buttonColor={ colors.mainDarker }/>
			</View>
		)
	}

	_renderItemRow(chest) {
		return (
			<ChestItem chest={ chest } navigator={ this.props.navigator }/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	header: {
		paddingHorizontal: 12,
		// paddingVertical: 8
	},

	search: {
		color: '#eee',
		fontSize: 16
	}
})
