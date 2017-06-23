import React from 'react'

const links = {
	left: [
		{ title: 'Cartões', href: '#!' },
		{ title: 'HOME', href: '#!' },
		{ title: 'SEU DINHEIRO', href: '#!' },
		{ title: 'ECONOMIA', href: '#!' }
	],
	center: [
		{ title: 'Seguros', href: '#!' },
		{ title: 'IQ Viagens', href: '#!' },
		{ title: 'IQ Seguros', href: '#!' },
		{ title: 'IQ Investimentos', href: '#!' }
	],
	right: [
		{ title: 'Finanças', href: '#!' },
		{ title: 'Política de privacidade', href: '#!' },
		{ title: 'Termos de uso', href: '#!' }
	]
}

const FooterLinks = () => (
	<div className="main-footer__links">
		<ul className="main-footer__section">
			{links.left.map(({ title, href }, i) => (
				<li className="main-footer__link" key={`linkl${i}`}>
					<a href={href}>{title}</a>
				</li>
			))}
		</ul>
		<ul className="main-footer__section">
			{links.center.map(({ title, href }, i) => (
				<li className="main-footer__link" key={`linkc${i}`}>
					<a href={href}>{title}</a>
				</li>
			))}
		</ul>
		<ul className="main-footer__section">
			{links.right.map(({ title, href }, i) => (
				<li className="main-footer__link" key={`linkr${i}`}>
					<a href={href}>{title}</a>
				</li>
			))}
		</ul>
	</div>
)

export default FooterLinks
