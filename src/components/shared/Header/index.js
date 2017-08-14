import { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
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
				<div
					role="button"
					className="main-header__mask"
					onClick={this.clickHandler}
				/>
				<Wrapper>
					<Link
						className="main-header__logo"
						to="/"
					>
						PWS
					</Link>
					<Menu
						onMenuClick={this.clickHandler}
					/>
				</Wrapper>
			</header>
		)
	}
}

export default Header
