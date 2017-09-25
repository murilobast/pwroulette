import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

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
				url: '',
				description: 'PW Simulator é uma ferramente para simular Drops de Báus e Reforja de Equipamentos em Perfect World'
			})}
		</Helmet>
		<Links />
		<GoogleAd
			client="ca-pub-9211196233969408"
			slot="9728627230"
			format="auto"
			style={{ marginBottom: 30, display: 'block' }}
		/>
		<Disclaimer />
	</div>
)

export default Home
