// Components
import Wrapper from 'components/shared/Wrapper'

// Assets
import transparency from 'assets/icons/transparency.svg'
import perspectives from 'assets/icons/perspectives.svg'
import atom from 'assets/icons/atom.svg'

// Styles
import './WiseChoices.styl'

const icons = [
	{ title: 'Pesquisa', image: atom },
	{ title: 'Perspectivas', image: perspectives },
	{ title: 'Transparência', image: transparency }
]

const WiseChoices = () => (
	<section className="smart-choices">
		<Wrapper>
			<div className="smart-choices__sided">
				<div className="smart-choices__icons">
					{icons.map(({ title, image }, i) => (
						<div className="smart-choices__icon" key={`choice${i}`}>
							<div className="smart-choices__image">
								<img src={image} alt={title} />
							</div>
							<p className="smart-choices__label">{title}</p>
						</div>
					))}
				</div>
			</div>
			<div className="smart-choices__sided">
				<h2 className="smart-choices__title">Escolhas Inteligentes</h2>
				<h3 className="smart-choices__title smart-choices__title--gray">pensadas para você</h3>
				<div className="smart-choices__text">
					<p className="smart-choices__text smart-choices__text--inner">
						<span>Pesquisas</span> detalhadas de produtos e serviços.
					</p>
					<p className="smart-choices__paragraph">
						Análises com a <span>perspectiva</span> de consumidores como você.
					</p>
					<p className="smart-choices__paragraph">
						Melhores escolhas com <span>transparência</span>.
					</p>
					<p className="smart-choices__paragraph">
						Simples assim.
					</p>
				</div>
			</div>
		</Wrapper>
	</section>
)

export default WiseChoices
