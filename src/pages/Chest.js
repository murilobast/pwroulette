import { Helmet } from 'react-helmet'
import GoogleAds from 'react-google-ads'

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
		<GoogleAds
			client="ca-pub-9211196233969408"
			slot="8764876118"
			format="auto"
			className="google-ad"
		/>
		<DropList items={items} />
	</Wrapper>
)

export default Chests
