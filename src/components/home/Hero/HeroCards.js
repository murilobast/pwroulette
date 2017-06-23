import React from 'react'

const cards = [
	{ name: 'Cartões de crédito', icon: require('assets/icons/card.svg') },
	{ name: 'Seguros', icon: require('assets/icons/card.svg') },
	{ name: 'Dinheiro', icon: require('assets/icons/card.svg') }
]

const HeroCards = () => (
	<ul className="hero__cards">
		{cards.map(({ name, icon }, i) => (
			<li className="hero__card" key={`hcard-${i}`}>
				<img src={icon} alt="" className="hero__icon"/>
				<h4 className="hero__name">{name}</h4>
			</li>
		))}
	</ul>
)

export default HeroCards
