import classNames from 'classnames'
import { Link } from 'react-router'
// Components
import Wrapper from 'components/shared/Wrapper'
import Menu from './Menu'

// Styles
import './Header.styl'

const Header = ({ inverted, showMenu, clickHandler }) => (
	<header
		className={classNames(
			'main-header',
			{ 'main-header--inverted' : inverted },
			{ 'main-header--menu' : showMenu }
		)}
	>
		<div
			role="button"
			className="main-header__mask"
			onClick={clickHandler}
		/>
		<Wrapper>
			<Link
				className="main-header__logo"
				to="/"
			>
				PWS
			</Link>
			<Menu
				onMenuClick={clickHandler}
			/>
		</Wrapper>
	</header>
)

export default Header
