import { connect } from 'react-redux'
import {
	branch,
	compose,
	lifecycle,
	renderNothing
} from 'recompose'

// Ducks
import { getChestList, filterChests } from 'ducks/api'

// Page
import ChestsPage from 'pages/Chests'

const mapStateToProps = ({ api }) => ({
	pending: api.get('pending').get('getChestList'),
	chests: api.get('chests')
})

const mapDispatchToProps = dispatch => ({
	getChestList: () => dispatch(getChestList()),
	filterChests: query => dispatch(filterChests(query))
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	lifecycle({
		componentWillMount() {
			const { getChestList, pending } = this.props
			if (pending) getChestList()
		}
	}),
	branch(props => props.pending, renderNothing)
)(ChestsPage)
