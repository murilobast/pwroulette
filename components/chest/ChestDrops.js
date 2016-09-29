import React, { Component } from 'react'
import { StyleSheet, InteractionManager, View, ListView, Text, TextInput } from 'react-native'
import S from 'string'
// Local imports
import ChestItem from './ChestItem'
import colors from '../../vars/colors'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class ChestDrops extends Component {
	constructor(props) {
		super(props)

		this.state = {
			dropsDataSource: ds.cloneWithRows([]),
		}

		this._filterDrops = this._filterDrops.bind(this)
	}
	
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({ dropsDataSource: ds.cloneWithRows(this.props.items) })
		})
	}

	_filterDrops(text) {
		let drops = this.props.items.filter((obj) => {
			let parsedText = S(obj.name).latinise().toLowerCase().s

			return parsedText.indexOf(text.toLowerCase()) !== -1
		})

		this.setState({ dropsDataSource: ds.cloneWithRows(drops) })
		this._scrollView.scrollTo({ y: 0 }, true)
	}

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.header }>
					<Text style={ styles.title }>Drops</Text>
					<TextInput 
						inlineImageLeft='ic_visibility_white_18dp' // mudar para lupa
						inlineImagePadding={ 4 }
						style={ styles.search }
						autoCorrect={ false }
						blurOnSubmit={ true }
						underlineColorAndroid={ colors.main }
						onChangeText={(text) => { this._filterDrops(text) }}
					/>
				</View>
				<ListView
					ref={(scrollView) => { this._scrollView = scrollView; }}
					scrollRenderAheadDistance={ 12 }
					initialListSize={ 12 }
					pageSize={ 12 }
					dataSource={ this.state.dropsDataSource }
					renderRow={(item) => { return this._renderItemRow(item) }}
					enableEmptySections={ true }
				/>
			</View>
		)
	}

	_renderItemRow(item) {
		return (
			<ChestItem chest={ item } navigator={ this.props.navigator }/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	header: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginHorizontal: 12,
		borderRadius: 2,
		elevation: 3,
		backgroundColor: '#353535'
	},

	title: {
		fontSize: 18,
		color: '#fff'
	},

	search: {
		color: '#eee',
		fontSize: 16,
		padding: 8
	}
})
