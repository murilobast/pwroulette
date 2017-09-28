import { Helmet } from 'react-helmet'
import GoogleAd from 'react-google-ad'

// Components
import Heading from 'components/trivia/Heading'
import Wrapper from 'components/shared/Wrapper'
import Questions from 'components/trivia/Questions'
import Search from 'components/shared/Search'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const getTitlePrefix = name =>
	`Perguntas ${name} - `

const TriviaCategory = ({
	questions,
	filterQuestions,
	params: { category },
	currentCategory: { name, slug }
}) => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: `${getTitlePrefix(name)}Trivia`,
				url: 'trivia',
				description: `Trivia - Simulador de drops de báus para Perfect World'}`
			})}
		</Helmet>
		<Heading
			title={`Trivia: ${category !== 'uncategorized' ? 'Perguntas de nível ' : ''}${name}`}
			category={category}
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
			slug={slug}
		/>
	</Wrapper>
)

export default TriviaCategory
