import { Link } from 'react-router'

// Components
import Wrapper from 'components/shared/Wrapper'

// Assets
import './Links.styl'

const Links = () => (
	<section className="links">
		<Wrapper>
			<ul className="links__items">
				<li className="links__link">
					<Link
						className="links__anchor"
						to="/chests/"
					>
						Abrir Baús
					</Link>
				</li>
				<li className="links__link">
					<Link
						className="links__anchor"
						to="/trivia/"
					>
						Trivia
					</Link>
				</li>
			</ul>
		</Wrapper>
	</section>
)

export default Links
