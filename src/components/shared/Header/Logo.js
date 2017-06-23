// Assets
import logoImage from 'assets/logo-default.inline.svg'

const Logo = () => (
	<a href="/">
		<div
			className="main-header__logo"
			alt="Logo IQ 360"
			dangerouslySetInnerHTML={{ __html: logoImage }}
		/>
	</a>
)

export default Logo
