import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { getSingleChest } from 'ducks/api'

// Page
import ChestPage from 'pages/Chest'

class Chests extends Component {
	componentWillMount() {
		const { getSingleChest, pending, params } = this.props
		const { id } = params
		console.log(pending)

		if (pending)
			getSingleChest(id)
	}

	render () {
		const { chest } = this.props

		return (
			<ChestPage
				chest={chest}
			/>
		)
	}
}

const mapStateToProps = ({ api }) => ({
	pending: api.get('pending').get('getSingleChest'),
	chest: api.get('chest')
})

const mapDispatchToProps = dispatch => ({
	getSingleChest: (id) => dispatch(getSingleChest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chests)
