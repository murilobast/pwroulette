import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

// Components
import Heading from 'components/trivia/Heading'
import Wrapper from 'components/shared/Wrapper'
import Categories from 'components/trivia/Categories'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const Trivia = ({
	trivia
}) => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: 'Trivia',
				url: 'trivia',
				description: 'Descubra as respostas para as perguntas do evento de Trivia em Perfect World - PW Simulator'
			})}
		</Helmet>
		<Heading
			title="Trivia Perfect World"
		/>
		<GoogleAd
			client="ca-pub-9211196233969408"
			slot="9728627230"
			format="auto"
			style={{ marginBottom: 30, display: 'block' }}
		/>
		<Categories
			categories={trivia}
		/>
	</Wrapper>
)

export default Trivia
