import React from 'react'

// Helpers
import createMarkup from 'helpers/createMarkup'

// Assets
import cardCards from 'assets/images/card-cards.png'
import cardInsurance from 'assets/images/card-insurance.png'
import cardMoney from 'assets/images/card-money.png'

const images = {
	cartoes: cardCards,
	seguros: cardInsurance,
	investimento: cardMoney
}

const titles = {
	cartoes: 'IQ Cartões',
	seguros: 'IQ Seguros',
	investimento: 'IQ Dinheiro'
}

const Card = ({ type, posts }) => (
	<div className="all-about__card">
		<div className="all-about__header">
			<img
				src={images[type]}
				className="all-about__image"
				alt={`Header ${titles[type]}`}
			/>
			<h3 className="all-about__title">{titles[type]}</h3>
		</div>
		<ul className="all-about__links">
			{posts.map(({ title, slug, id }) => (
				<li className="all-about__link" key={id}>
					<a
						href={`/p/${type}/${slug}`}
						dangerouslySetInnerHTML={createMarkup(title)}
					/>
				</li>
			))}
		</ul>
		<a
			href="#!"
			className={`all-about__more all-about__more--${type}`}
		>
			<span>></span>
		</a>
	</div>
)

export default Card
