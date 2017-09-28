import { compose, withState } from 'recompose'

// Pages
import TriviaPage from 'pages/Trivia'

// Data
import trivia from 'config/trivia'

export default compose(
	withState('trivia', '_', trivia)
)(TriviaPage)
