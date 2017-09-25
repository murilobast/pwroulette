import { Helmet } from 'react-helmet'

// Components
import List from 'components/chests/List'
import AddModal from 'containers/AddModal'
import Search from 'components/chests/Search'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const Chests = ({ chests, filterChests }) => (
	<div>
		<Helmet>
			{generateMetatags({
				title: 'Abrir Baús',
				url: 'chest',
				description: 'Simule drops de báus para Perfect World com apenas um simples click!'
			})}
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
