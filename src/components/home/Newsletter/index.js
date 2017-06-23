// Components
import Wrapper from 'components/shared/Wrapper'
import Button from 'components/shared/Button'
import SectionTitle from 'components/shared/Text/SectionTitle'
import SectionDescription from 'components/shared/Text/SectionDescription'

// Styles
import './Newsletter.styl'

const Newsletter = () => (
	<form className="newsletter">
		<Wrapper>
			<div className="newsletter__headings">
				<SectionTitle>
					Newsletter
				</SectionTitle>
				<SectionDescription>
					Cadastre seu email e receba todas as novidades do IQ 360 antes
				</SectionDescription>
			</div>
			<div className="newsletter__email">
				<input
					type="text"
					name="email"
					className="newsletter__input"
					placeholder="exemplo@email.com"
				/>
			</div>
			<div className="newsletter__submit">
				<Button
					text="enviar"
					type="button"
					onClick={() => console.log('Só um minutinho...')}
				/>
			</div>
		</Wrapper>
	</form>
)

export default Newsletter
