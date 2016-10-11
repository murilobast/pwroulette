import React, { Component } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator, Modal, View, ListView, Text, TextInput } from 'react-native'
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
			loading: true,
			modalVisible: false
		}

		this._hideModal = this._hideModal.bind(this)
		this._openModal = this._openModal.bind(this)
		this._filterChests = this._filterChests.bind(this)
		this._setLoader = this._setLoader.bind(this)
	}

	componentDidMount() {
		return fetch('http://api.pwsimulator.com?q=all')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					chestDataSource: ds.cloneWithRows(responseJson),
					chests: responseJson,
					loading: false
				})

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
		let loader = (this.state.loading)
			? <View style={ styles.loaderWrapper }>
				<ActivityIndicator style={ styles.loader } animating={ true } color={ '#fff' }/>
			</View>
			: null

		return (
			<View style={ styles.container }>
				<View style={ styles.header }>
					<Text style={ styles.title }>Selecione um baú</Text>
					<TextInput 
						style={ styles.search }
						autoCorrect={ false }
						blurOnSubmit={ true }
						onChangeText={(text) => { this._filterChests(text) }}
						underlineColorAndroid={ '#eee' }
					/>
				</View>
				<ListView
					ref={(scrollView) => { this._scrollView = scrollView; }}
					initialListSize={ 12 }
					dataSource={ this.state.chestDataSource }
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
				{ loader }
			</View>
		)
	}

	_setLoader(loading) {
		this.setState({ loading })
	}

	_renderItemRow(chest) {
		return (
			<ChestItem chest={ chest } navigator={ this.props.navigator } setLoader={ this._setLoader }/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	loaderWrapper: {
		flex: 1,
		position: 'absolute',
		top: 0,
		backgroundColor: colors.backgroundLight,
		width,
		height
		
	},
	
	loader: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		height
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
