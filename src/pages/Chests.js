import { Helmet } from 'react-helmet'

// Components
import Wrapper from 'components/shared/Wrapper'
import Search from 'components/chests/Search'
import List from 'components/chests/List'

const Chests = ({ chests, filterChests }) => (
	<Wrapper>
		<Helmet>
			<title>PWS - Baús</title>
			<meta name="description" content="IQ 360 Chests description" />
		</Helmet>
		<Search
			filterChests={filterChests}
		/>
		<List
			chests={chests}
		/>
	</Wrapper>
)

export default Chests
