import { connect } from 'react-redux'
import {
	branch,
	compose,
	lifecycle,
	withState,
	withHandlers,
	renderNothing
} from 'recompose'

// Ducks
import { getSingleChest } from 'ducks/api'
import { openChest, resetChests } from 'ducks/chest'

// Page
import ChestPage from 'pages/Chest'

let timer = null

const mapStateToProps = ({ api, chest }) => ({
	pending: api.get('pending').get('getSingleChest'),
	chest: api.get('chest'),
	bagItems: chest.items,
	opened: chest.opened
})

const mapDispatchToProps = dispatch => ({
	getSingleChest: id => dispatch(getSingleChest(id)),
	getRandomItem: items => dispatch(openChest(items)),
	resetChests: () => dispatch(resetChests())
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withState('weightedItems', 'setWeightedItems', []),
	withState('amount', 'setAmount', 1),
	withHandlers({
		prepareItems: ({ chest: { items }, weightedItems, setWeightedItems }) => () => {
			let weight = 0
			if (weightedItems.length) return weightedItems
			const newItems = items.map(item => {
				weight += item.weight / 100
				return { ...item, weight, total: 1 }
			})
			setWeightedItems(newItems)
			return newItems
		}
	}),
	withHandlers({
		updateAmount: ({ setAmount }) => e => setAmount(Number(e.target.value)),
		openChest: ({ amount, getRandomItem, prepareItems }) => () => {
			const weightedItems = prepareItems()
			let opened = 0
			this.timer = setInterval(() => {
				if (opened < amount || amount === 0) {
					opened += 1
					return getRandomItem(weightedItems)
				}
				clearInterval(timer)
			}, 50)
		},
		stopOpening: () => () => clearInterval(this.timer)
	}),
	lifecycle({
		componentWillMount() {
			const { getSingleChest, pending, params: { id } } = this.props
			if (pending)
				getSingleChest(id)
		}
	}),
	branch(props => props.pending, renderNothing)
)(ChestPage)
