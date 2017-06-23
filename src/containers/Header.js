import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import HeaderView from 'components/shared/Header'

class Header extends Component {
	render () {
		const { headerColor } = this.props
		return (
			<HeaderView color={headerColor} />
		)
	}
}

const mapStateToProps = ({ ui }) => ({
	headerColor: ui.get('headerColor')
})

export default connect(mapStateToProps)(Header)
