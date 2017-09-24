import { Helmet } from 'react-helmet'
import GoogleAds from 'react-google-ads'

// Components
import Links from 'components/home/Links'
import Disclaimer from 'components/home/Disclaimer'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const Home = ({ posts }) => (
	<div>
		<Helmet>
			{generateMetatags({
				title: 'Home',
				url: '/',
				description: 'PW Simulator é uma ferramente para simular Drops de Báus e Reforja de Equipamentos em Perfect World'
			})}
		</Helmet>
		<Links />
		<GoogleAds
			client="ca-pub-9211196233969408"
			slot="8764876118"
			format="auto"
		/>
		<Disclaimer />
	</div>
)

export default Home
