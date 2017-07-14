import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { getSingleChest } from 'ducks/api'
import { openChest, resetChests } from 'ducks/chest'

// Page
import ChestPage from 'pages/Chest'

class Chests extends Component {
	state = {
		weightedItems: []
	}

	componentWillMount() {
		const { getSingleChest, pending, params } = this.props
		const { id } = params

		if (pending)
			getSingleChest(id)
	}

	render () {
		const { chest, pending, bagItems, opened, resetChests } = this.props

		if (!pending)
			return (
				<ChestPage
					{...chest}
					opened={opened}
					bagItems={bagItems}
					resetChests={resetChests}
					openChest={this.openChest}
					stopOpening={this.stopOpening}
				/>
			)

		return null
	}

	prepareItems() {
		let weight = 0
		const { weightedItems } = this.state
		const { chest } = this.props

		if (weightedItems.length)
			return weightedItems

		const items = chest.items.map(item => {
			weight += item.weight / 100

			return {
				...item,
				weight,
				total: 1
			}
		})

		this.setState({ weightedItems: items })

		return items
	}

	openChest = () => {
		const { openChest } = this.props
		const weightedItems = this.prepareItems()

		this.timer = setInterval(() => {
			openChest(weightedItems)
		}, 25)
	}

	stopOpening = () => {
		clearInterval(this.timer)
	}
}

const mapStateToProps = ({ api, chest }) => ({
	pending: api.get('pending').get('getSingleChest'),
	chest: api.get('chest'),
	bagItems: chest.items,
	opened: chest.opened
})

const mapDispatchToProps = dispatch => ({
	getSingleChest: id => dispatch(getSingleChest(id)),
	openChest: items => dispatch(openChest(items)),
	resetChests: () => dispatch(resetChests())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chests)
