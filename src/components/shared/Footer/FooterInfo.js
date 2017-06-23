import React from 'react'

// Assets
import logoImage from 'assets/logo-default.svg'

const FooterInfo = () => (
	<div className="main-footer__info">
		<img
			src={logoImage}
			alt="Logo IQ 360"
			className="main-footer__logo"
		/>
		<a className="main-footer__help" href="#!">Sobre o IQ 360º</a>
		<a className="main-footer__help" href="#!">Fale conosco</a>
		<a className="main-footer__help" href="#!">Plítica de privacidade</a>
	</div>
)

export default FooterInfo
