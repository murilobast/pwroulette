import { Link } from 'react-router'

// Styles
import '../Categories/Categories.styl'

// Helpers
import slugify from 'helpers/slugify'

const Questions = ({ questions, slug = '', trivia = true }) => (
	<section className="trivia-categories">
		<ul className="trivia-categories__categories">
			{questions.map(({ question }, i) => (
				<li key={`qst${i}`} className="trivia-categories__category is--question">
					<Link
						to={trivia ?
							`/trivia/${slug}/${i}-${slugify(question)}` :
							`/desafio-do-conhecimento/${i}-${slugify(question)}`
						}
					>
						<h2 className="trivia-categories__name">
							{question}
						</h2>
					</Link>
				</li>
			))}
		</ul>
	</section>
)

export default Questions
