import { Link } from 'react-router'

// Styles
import './Heading.styl'

const Heading = ({ title, category = '' }) => (
	<div className="trivia-heading">
		<Link
			to={!!category ?
				`/trivia/${category}` :
				'/desafio-do-conhecimento'
			}
		>
			<h1 className="trivia-heading__title">
				{title}
			</h1>
		</Link>
	</div>
)

export default Heading
