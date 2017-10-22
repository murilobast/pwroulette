import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

// Components
import Heading from 'components/trivia/Heading'
import Wrapper from 'components/shared/Wrapper'
import Window from 'components/trivia/Window'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const ScholarlyQuestion = ({
	params: { question: questionParam },
	currentQuestion: { question, ...currentQuestion }
}) => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: `${question} - Trivia Perfect World`,
				url: `desafio-do-conhecimento/${questionParam}`,
				description: `Resposta para: ${question} - Desafio do Conhecimento. Perfect World - PW Simulator`
			})}
		</Helmet>
		<Heading
			title="Perguntas: Desafio do Conhecimento"
		/>
		<GoogleAd
			client="ca-pub-9211196233969408"
			slot="9728627230"
			format="auto"
			style={{ marginBottom: 30, display: 'block' }}
		/>
		<Window
			question={question}
			type="scholarly"
			{...currentQuestion}
		/>
	</Wrapper>
)

export default ScholarlyQuestion
