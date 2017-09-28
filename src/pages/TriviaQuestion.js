import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

// Components
import Heading from 'components/trivia/Heading'
import Wrapper from 'components/shared/Wrapper'
import Window from 'components/trivia/Window'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const TriviaCategory = ({
	params: { category, question: questionParam },
	currentCategory: { name, slug },
	currentQuestion: { question, ...currentQuestion }
}) => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: `${question} - Trivia`,
				url: `trivia/${category}/${questionParam}`,
				description: `Trivia - Resposta para: ${question} - Perguntas ${name}`
			})}
		</Helmet>
		<Heading
			title={`Trivia: ${category !== 'uncategorized' ? 'Perguntas de nível ' : ''}${name}`}
			category={category}
		/>
		<GoogleAd
			client="ca-pub-9211196233969408"
			slot="9728627230"
			format="auto"
			style={{ marginBottom: 30, display: 'block' }}
		/>
		<Window
			question={question}
			{...currentQuestion}
		/>
	</Wrapper>
)

export default TriviaCategory
