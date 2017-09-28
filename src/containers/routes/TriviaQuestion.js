import { compose, withState } from 'recompose'

// Pages
import TriviaQuestionPage from 'pages/TriviaQuestion'

// Data
import trivia from 'config/trivia'

const getCurrentQuestion = ({ category, question }) => {
	const index = question.match(/^[0-9]+/)[0]
	console.log(index)
	return trivia
		.find(({ slug }) => slug === category)
		.questions[index]
}

const getCurrentCategory = ({ category }) =>
	trivia.find(({ slug }) => slug === category)

export default compose(
	withState('currentQuestion', '_', ({ params }) =>
		getCurrentQuestion(params)),
	withState('currentCategory', '_', ({ params }) =>
		getCurrentCategory(params))
)(TriviaQuestionPage)
