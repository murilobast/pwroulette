import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { getChestList, filterChests } from 'ducks/api'

// Page
import ChestsPage from 'pages/Chests'

class Chests extends Component {
	componentWillMount() {
		const { getChestList, pending } = this.props

		if (pending)
			getChestList()
	}

	render () {
		const { chests, filterChests } = this.props

		return (
			<ChestsPage
				chests={chests}
				filterChests={filterChests}
			/>
		)
	}
}

const mapStateToProps = ({ api }) => ({
	pending: api.get('pending').get('getChestList'),
	chests: api.get('chests')
})

const mapDispatchToProps = dispatch => ({
	getChestList: () => dispatch(getChestList()),
	filterChests: (q) => dispatch(filterChests(q))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chests)
