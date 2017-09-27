import { Helmet } from 'react-helmet'

// Components
import Window from 'components/trivia/Window'
import Wrapper from 'components/shared/Wrapper'

// Helpers
import generateMetatags from 'helpers/generateMetatags'

const data = {
	question: 'Onde você pode trocar Armas e Equipamentos da Caixa Perfeita?',
	answer: 'Na Caixa de Correio',
	answerNumber: 1
}

const Trivia = () => (
	<Wrapper>
		<Helmet>
			{generateMetatags({
				title: `Trivia`,
				url: 'trivia',
				description: `Trivia - Simulador de drops de báus para Perfect World'}`
			})}
		</Helmet>
		<Window	{...data} />
	</Wrapper>
)

export default Trivia
