import { Link } from 'react-router'

// Styles
import './Heading.styl'

const Heading = ({ title, category = '' }) => (
	<div className="trivia-heading">
		<Link to={`/trivia/${category}`}>
			<h1 className="trivia-heading__title">
				{title}
			</h1>
		</Link>
	</div>
)

export default Heading
