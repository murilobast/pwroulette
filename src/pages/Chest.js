import { Helmet } from 'react-helmet'

// Components
import Bag from 'components/chest/Bag'
import Wrapper from 'components/shared/Wrapper'
import DropList from 'components/chest/DropList'

const Chests = ({ chest: { items, name, ...chest }, bagItems, ...props }) => (
	<Wrapper>
		<Helmet>
			<title>{`PWS - ${name}`}</title>
			<meta name="description" content="IQ 360 Chests description" />
		</Helmet>
		<Bag
			name={name}
			items={bagItems}
			{...chest}
			{...props}
		/>
		<DropList items={items} />
	</Wrapper>
)

export default Chests
