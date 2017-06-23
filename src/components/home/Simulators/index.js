import React from 'react'

// Components
import Wrapper from 'components/shared/Wrapper'

// Styles
import './Simulators.styl'

const items = [
	{ title: 'Taxímetro Bancário' },
	{ title: 'Simule seus investimentos' },
	{ title: 'Encontre o melhor cartão' },
	{ title: 'Cash back' },
	{ title: 'Simule seus investimentos' }
]

const Simulators = () => (
	<section className="simulators">
		<Wrapper>
			<ul className="simulators__posts">
				{items.map(({ title }, i ) => (
					<li className="simulators__post" key={`sim-${i}`}>
						<h3 className="simulators__title">{title}</h3>
						<p className="simulators__description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
						</p>
						<a href="#!" className="simulators__cta">
							Acesse >
						</a>
					</li>
				))}
			</ul>
			<div className="simulators__fade" />
		</Wrapper>
	</section>

)

export default Simulators
