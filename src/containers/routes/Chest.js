import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { getSingleChest } from 'ducks/api'
import { openChest } from 'ducks/chest'

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
		const { chest, pending, bagItems, opened } = this.props

		if (!pending)
			return (
				<ChestPage
					{...chest}
					opened={opened}
					bagItems={bagItems}
					openChest={() => this.openChest()}
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

	openChest() {
		const { chest, openChest } = this.props
		const weightedItems = this.prepareItems()
		let count = 0
		let test = setInterval(() => {
			if (count > 10000)
				clearInterval(test)
			openChest(weightedItems)
			count++
			console.log(count)
		}, 0)
		// openChest(weightedItems)
	}
}

const mapStateToProps = ({ api, chest }) => ({
	pending: api.get('pending').get('getSingleChest'),
	chest: api.get('chest'),
	bagItems: chest.items,
	opened: chest.opened
})

const mapDispatchToProps = dispatch => ({
	getSingleChest: (id) => dispatch(getSingleChest(id)),
	openChest: (items) => dispatch(openChest(items))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chests)
