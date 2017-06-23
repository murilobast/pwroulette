// Assets
import defaultImage from 'assets/images/card-default.jpg'

// Styles
import './Card.styl'

const Card = () => (
	<div className="card">
		<img src={defaultImage} alt="Capa do post" className="card__image" />
		<p className="card__tag">Imóveis</p>
		<p className="card__title">
			Preço de imóveis em SP fica estável em abril, diz ImovelWeb
		</p>
		<a href="#!" className="card__more">
			Leia mais
		</a>
	</div>
)

export default Card
