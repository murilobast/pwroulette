import React from 'react'

// Components
import Wrapper from 'components/shared/Wrapper'
import SectionTitle from 'components/shared/Text/SectionTitle'
import Card from './Card'

// Styles
import './AllAbout.styl'

const AllAbout = ({ posts }) => (
	<section className="all-about">
		<Wrapper>
			<p className="all-about__pre">
				Rede IQ 360
			</p>
			<SectionTitle>
				TÍTULO SOBRE TODOS OS SITE DA IQ
			</SectionTitle>
			<div className="all-about__cards">
				<Card
					type="cartoes"
					posts={posts.cartoes}
				/>
				<Card
					type="seguros"
					posts={posts.seguros}
				/>
				<Card
					type="investimento"
					posts={posts.investimento}
				/>
			</div>
		</Wrapper>
	</section>
)

export default AllAbout
