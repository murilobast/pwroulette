import React, { Component } from 'react'
import { StyleSheet, Dimensions, RecyclerViewBackedScrollView, Modal, View, ListView, Text, TextInput } from 'react-native'
import ActionButton from 'react-native-action-button'
import S from 'string'
// Local imports
import ChestItem from './ChestItem'
import ChestAdd from './ChestAdd'
import colors from '../../vars/colors'

const { height, width } = Dimensions.get('window')
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class ChestList extends Component {
	constructor(props) {
		super(props)


		this.state = {
			chests: [],
			chestDataSource: ds.cloneWithRows([]),
			modalVisible: false
		}

		this._hideModal = this._hideModal.bind(this)
		this._openModal = this._openModal.bind(this)
		this._filterChests = this._filterChests.bind(this)
	}

	componentDidMount() {
		return fetch('http://api.pwsimulator.com?q=all')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ chestDataSource: ds.cloneWithRows(responseJson), chests: responseJson })

				return
			})
			.catch((error) => {
				console.error(error)
			})
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
		this._scrollView.scrollTo({ y: 0 }, true)
	}

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.header }>
					<Text style={ styles.title }>Selecione um baú</Text>
					<TextInput 
						style={ styles.search }
						autoCorrect={ false }
						blurOnSubmit={ true }
						underlineColorAndroid={ colors.main }
						onChangeText={(text) => { this._filterChests(text) }}
					/>
				</View>
				<ListView
					ref={(scrollView) => { this._scrollView = scrollView; }}
					scrollRenderAheadDistance={ 12 }
					initialListSize={ 12 }
					pageSize={ 12 }
					dataSource={ this.state.chestDataSource }
					renderRow={(chest) => { return this._renderItemRow(chest) }}
					enableEmptySections={ true }
					renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
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
		paddingTop: 12
	},

	title: {
		fontSize: 20,
		color: '#fff'
	},

	search: {
		color: '#eee',
		fontSize: 16,
		padding: 4
	}
})
