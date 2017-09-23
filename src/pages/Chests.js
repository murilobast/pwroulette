import { Helmet } from 'react-helmet'

// Components
import List from 'components/chests/List'
import AddModal from 'containers/AddModal'
import Search from 'components/chests/Search'

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
		<AddModal />
	</div>
)

export default Chests
