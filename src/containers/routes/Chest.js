import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { getSingleChest } from 'ducks/api'
import { openChest, resetChests } from 'ducks/chest'

// Page
import ChestPage from 'pages/Chest'

class Chests extends Component {
	state = {
		weightedItems: [],
		amount: 1
	}

	componentWillMount() {
		const { getSingleChest, pending, params } = this.props
		const { id } = params

		if (pending)
			getSingleChest(id)
	}

	render () {
		const { chest, pending, bagItems, opened, resetChests } = this.props
		const { amount } = this.state

		if (!pending)
			return (
				<ChestPage
					{...chest}
					opened={opened}
					amount={amount}
					bagItems={bagItems}
					resetChests={resetChests}
					openChest={this.openChest}
					stopOpening={this.stopOpening}
					updateAmount={this.updateAmount}
				/>
			)

		return null
	}

	updateAmount = e => {
		this.setState({
			amount: Number(e.target.value)
		})

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
		const { amount } = this.state
		const { openChest } = this.props
		const weightedItems = this.prepareItems()
		let opened = 0

		this.timer = setInterval(() => {
			if (opened < amount || amount === 0) {
				opened += 1
				return openChest(weightedItems)
			}

			clearInterval(this.timer)
		}, 50)
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
