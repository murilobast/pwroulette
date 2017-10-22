import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

// Components
import Heading from 'components/trivia/Heading'
import Wrapper from 'components/shared/Wrapper'
import Questions from 'components/trivia/Questions'
import Search from 'components/shared/Search'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const ScholarlyChallenge = ({
	questions,
	filterQuestions
}) => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: `Desafio do Conhecimento - Perfect World`,
				url: 'desafio-do-conhecimento',
				description: `Desafio do Conhecimento - PErguntas e respostas para evento do Desafio do Conhecimento em Perfect World - PW Simulator`
			})}
		</Helmet>
		<Heading
			title="Perguntas: Desafio do Conhecimento"
		/>
		<Search
			filter={filterQuestions}
			label="Selecione uma pergunta"
		/>
		<GoogleAd
			client="ca-pub-9211196233969408"
			slot="9728627230"
			format="auto"
			style={{ marginBottom: 30, display: 'block' }}
		/>
		<Questions
			questions={questions}
			trivia={false}
		/>
	</Wrapper>
)

export default ScholarlyChallenge
