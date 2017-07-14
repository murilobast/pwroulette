import { Helmet } from 'react-helmet'

// Components
import Search from 'components/chests/Search'
import List from 'components/chests/List'

const Chests = ({ chests, filterChests }) => (
	<div>
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
	</div>
)

export default Chests
