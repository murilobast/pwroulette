import { Link } from 'react-router'

const menuLinks = [
	{ title: 'Home', href: '/' },
	{ title: 'Baús', href: '/chests/' },
	{ title: 'Trivia', href: '/trivia/' }
]

const Menu = ({ onMenuClick }) =>  (
	<span>
		<button
			onClick={onMenuClick}
			className="main-header__button"
		/>
		<ul className="main-header__menu">
			{menuLinks.map(({ href, title }, i) => (
				<li className="main-header__link" key={`menu-${i}`}>
					<Link
						to={href}
						onClick={onMenuClick}
					>
						{title}
					</Link>
				</li>
			))}
		</ul>
	</span>
)

export default Menu
