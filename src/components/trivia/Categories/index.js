import { Link } from 'react-router'

// Styles
import './Categories.styl'

const Categories = ({ categories }) => (
	<section className="trivia-categories">
		<ul className="trivia-categories__categories">
			{categories.map(({ name, slug, questions }, i) => (
				<li key={slug} className="trivia-categories__category">
					<Link to={`/trivia/${slug}`}>
						<h2 className="trivia-categories__name">
							{i > 0 && 'Perguntas de nível '}{name}
						</h2>
					</Link>
				</li>
			))}
		</ul>
	</section>
)

export default Categories
