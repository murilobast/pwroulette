import { Helmet } from 'react-helmet'

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
				description: 'PW Simulator é uma ferramente para simular Drops de Báus e Reforja de Equipamentos em Perfect World',
				image: ''
			})}
		</Helmet>
		<Disclaimer />
		<Links />
	</div>
)

export default Home
