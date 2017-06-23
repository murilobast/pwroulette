import { Component } from 'react'
import classNames from 'classnames'

// Components
import Wrapper from 'components/shared/Wrapper'
import Menu from './Menu'

// Styles
import './Header.styl'

class Header extends Component {
	state = {
		inverted: false,
		showMenu: false
	}

	scrollHandler = () => {
		const { inverted } = this.state

		if (window.pageYOffset > 0 && !inverted)
			this.setState({ inverted: true })

		else if (window.pageYOffset === 0 && inverted)
			this.setState({ inverted: false })
	}

	clickHandler = (e) => {
		let { showMenu } = this.state
		showMenu = !showMenu

		if (showMenu) {
			this.setState({ showMenu, inverted: showMenu })
		} else {
			this.setState({ showMenu })
			this.scrollHandler()
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.scrollHandler)
		this.scrollHandler()
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollHandler)
	}

	render() {
		const { inverted, showMenu } = this.state
		const { color } = this.props
		const classes = classNames(
			'main-header',
			`main-header--${color}`,
			{ 'main-header--inverted' : inverted },
			{ 'main-header--menu' : showMenu }
		)

		return (
			<header className={classes}>
				<div className="main-header__mask" />
				<Wrapper>
					<div className="main-header__logo">
						PWS
					</div>
					<Menu
						onMenuClick={this.clickHandler}
						inverted={inverted}
						showMenu={showMenu}
					/>
				</Wrapper>
			</header>
		)
	}
}

export default Header
