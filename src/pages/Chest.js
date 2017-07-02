import { Helmet } from 'react-helmet'

// Components
import Wrapper from 'components/shared/Wrapper'

const Chests = ({ chest }) => (
	<Wrapper>
		<Helmet>
			<title>{`PWS - ${chest.name}`}</title>
			<meta name="description" content="IQ 360 Chests description" />
		</Helmet>
	</Wrapper>
)

export default Chests
