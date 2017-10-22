import { compose, withState, withHandlers } from 'recompose'

// Page
import Refinner from 'pages/Refinner'

// Config
import stones from 'config/stones'

export default compose(
	withState('stones', '_', stones),
	withHandlers({})
)(Refinner)
