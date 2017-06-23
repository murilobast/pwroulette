const menuLinks = [
	{ title: 'Forja', href: '#' },
	{ title: 'Baús', href: '#' },
	{ title: 'Sobre', href: '#' }
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
					<a href={href}>{title}</a>
				</li>
			))}
		</ul>
	</span>
)

export default Menu
