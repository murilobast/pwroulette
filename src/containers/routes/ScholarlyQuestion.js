import { compose, withState } from 'recompose'

// Pages
import ScholarlyQuestionPage from 'pages/ScholarlyQuestion'

// Data
import scholarlyChallenge from 'config/scholarlyChallenge'

const getCurrentQuestion = ({ question }) => {
	const index = question.match(/^[0-9]+/)[0]
	return scholarlyChallenge[index]
}

export default compose(
	withState('currentQuestion', '_', ({ params }) =>
		getCurrentQuestion(params))
)(ScholarlyQuestionPage)
