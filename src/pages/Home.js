import { Helmet } from 'react-helmet'

const Home = ({ posts }) => (
	<div>
		<Helmet>
			<title>IQ 360</title>
			<meta name="description" content="IQ 360 description" />
		</Helmet>
	</div>
)

export default Home
