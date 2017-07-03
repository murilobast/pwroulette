import { Helmet } from 'react-helmet'

// Components
import Wrapper from 'components/shared/Wrapper'
import Bag from 'components/chest/Bag'

const Chests = ({ name, items, id, openChest, bagItems, opened }) => (
	<Wrapper>
		<Helmet>
			<title>{`PWS - ${name}`}</title>
			<meta name="description" content="IQ 360 Chests description" />
		</Helmet>
		<Bag
			id={id}
			name={name}
			items={bagItems}
			opened={opened}
			openChest={() => openChest()}
		/>
	</Wrapper>
)

export default Chests
