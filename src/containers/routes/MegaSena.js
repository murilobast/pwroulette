import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { setHeaderColor } from 'ducks/ui'

// Page
import MegaSenaPage from 'pages/MegaSena'

class MegaSena extends Component {
	componentWillMount() {
		const { setHeaderColor } = this.props
		setHeaderColor('lottery')
	}

	render () {
		return (
			<MegaSenaPage />
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setHeaderColor: (code) => dispatch(setHeaderColor(code))
})

export default connect(null, mapDispatchToProps)(MegaSena)
