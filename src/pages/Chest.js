import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

// Components
import Bag from 'components/chest/Bag'
import Wrapper from 'components/shared/Wrapper'
import DropList from 'components/chest/DropList'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const Chests = ({ chest: { items, name, description, ...chest }, bagItems, ...props }) => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: `${name}`,
				url: 'chest',
				description: `${name}${(!!description && name !== description) ? ` - ${description}` : ''} - Simulador de drops de báus para Perfect World`
			})}
		</Helmet>
		<Bag
			name={name}
			items={bagItems}
			description={description}
			{...chest}
			{...props}
		/>
		<GoogleAd
			client="ca-pub-9211196233969408"
			slot="9728627230"
			format="auto"
			style={{ marginBottom: 30, display: 'block' }}
		/>
		<DropList items={items} />
	</Wrapper>
)

export default Chests
