import React from 'react'

// Components
import Wrapper from 'components/shared/Wrapper'
import Copyright from './Copyright'
import FooterInfo from './FooterInfo'
import FooterLinks from './FooterLinks'

// Styles
import './Footer.styl'

const Footer = () => (
	<footer className="main-footer">
		<Wrapper>
			<FooterInfo />
			<FooterLinks />
		</Wrapper>
		<Copyright />
	</footer>
)

export default Footer
