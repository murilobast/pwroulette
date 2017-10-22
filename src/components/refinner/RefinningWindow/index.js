const daggerImage = 'http://www.pwdatabase.com/images/icons/generalm/45506.png'

// Styles
import './RefinningWindow.styl'

const RefinningWindow = ({ stone }) => (
	<section className="refinning-window">
		<div className="refinning-window__header">
			<h2 className="refinning-window__title">Aprimorar Equipamento</h2>
		</div>
		<div className="refinning-window__content">
			<div className="refinning-window__section">
				<span className="refinning-window__text refinning-window__text--top">Equipamento</span>
				<div className="refinning-window__slot">
					<img src={daggerImage} alt="" className="refinning-window__item"/>
				</div>
				<span className="refinning-window__name">☆☆☆Adagas do Oceano</span>
			</div>
			<div className="refinning-window__section">
				<h3 className="refinning-window__disclaimer">
					O aprimoramento de items requer pedras imortais.<br />
					O sucesso melhora o equipamento em 1 nível. A falha pode reduzir o nível de aprimoramento em 1 ou reduzil-lo a o.<br />
					Armas requerem 2 pedras Imortais. Armaduras e Acessórios requerem apenas 1.
				</h3>
			</div>
			<div className="refinning-window__section">
				<span className="refinning-window__text refinning-window__text--top">Material de aprimoramento</span>
				<div className="refinning-window__slot">
					<img src={stone.image} alt="" className="refinning-window__item"/>
				</div>
				<span className="refinning-window__name">{stone.name}</span>
			</div>
		</div>
		<div className="refinning-window__section">
			<span className="refinning-window__text refinning-window__text--top">Resultado:</span>
			<ul className="refinning-window__result">
				<li className="refinning-window__message">
					<span className="refinning-window__text">O aprimoramento falhou.</span>
				</li>
			</ul>
		</div>
	</section>
)

export default RefinningWindow
