import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { setStatusCode } from 'ducks/http'

// Page
import NotFoundPage from 'pages/NotFound'

class NotFound extends Component {
	componentWillMount() {
		const { setStatusCode } = this.props
		setStatusCode(404)
	}

	render () {
		return (
			<NotFoundPage />
		)
	}
}

const mapDispatchToProps = dispatch => ({
	setStatusCode: (code) => dispatch(setStatusCode(code))
})

export default connect(null, mapDispatchToProps)(NotFound)
