import S from 'string'
import { compose, withState, withHandlers } from 'recompose'

// Pages
import TriviaCategoryPage from 'pages/TriviaCategory'

// Data
import trivia from 'config/trivia'

const getCurrentCategory = ({ category }) => {
	const updatedCatecory = trivia.find(({ slug }) => slug === category)
	updatedCatecory.questions = [...updatedCatecory.questions]
		.map((question, i) => ({
			...question,
			index: i
		}))
	return updatedCatecory
}

export default compose(
	withState('currentCategory', '_', ({ params }) =>
		getCurrentCategory(params)
	),
	withState('questions', 'setQuestions', ({ params }) =>
		getCurrentCategory(params).questions
	),
	withHandlers({
		filterQuestions: ({ currentCategory, setQuestions }) => query => {
			const questions = [...currentCategory.questions]
			const parsedQuery = S(query.toLowerCase()).latinise()
			const filteredQuestions = questions.filter(({ question }) => {
				const parsedName = S(question.toLowerCase()).latinise()
				return S(parsedName).contains(parsedQuery)
			})
			setQuestions(filteredQuestions)
		}
	})
)(TriviaCategoryPage)
