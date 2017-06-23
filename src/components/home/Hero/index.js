import React from 'react'

// Assets
import defaultLogo from 'assets/logo-default.svg'

// Components
import Wrapper from 'components/shared/Wrapper'
import HeroCards from './HeroCards'

// Styles
import './Hero.styl'

const Hero = props => (
	<section className="hero">
		<Wrapper>
			<div className="hero__side">
				<h1 className="hero__title">
					ESCOLHAS INTELIGENTES
				</h1>
				<p className="hero__description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
			<div className="hero__side hero__side--right">
				<img
					src={defaultLogo}
					alt="Logo IQ 360"
					className="hero__image"
				/>
			</div>
			<HeroCards />
		</Wrapper>
	</section>
)

export default Hero
