import { Helmet } from 'react-helmet'

// Components
import Wrapper from 'components/shared/Wrapper'
import Bag from 'components/chest/Bag'
import DropList from 'components/chest/DropList'

const Chests = ({
	name,
	items,
	id,
	openChest,
	bagItems,
	opened,
	stopOpening,
	resetChests
}) => (
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
			openChest={openChest}
			resetChests={resetChests}
			stopOpening={stopOpening}
		/>
		<DropList items={items} />
	</Wrapper>
)

export default Chests
