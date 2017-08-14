import { Helmet } from 'react-helmet'

// Components
import Wrapper from 'components/shared/Wrapper'
import Bag from 'components/chest/Bag'
import DropList from 'components/chest/DropList'

const Chests = ({
	name,
	items,
	bagItems,
	...props
}) => (
	<Wrapper>
		<Helmet>
			<title>{`PWS - ${name}`}</title>
			<meta name="description" content="IQ 360 Chests description" />
		</Helmet>
		<Bag
			name={name}
			items={bagItems}
			{...props}
		/>
		<DropList items={items} />
	</Wrapper>
)

export default Chests
