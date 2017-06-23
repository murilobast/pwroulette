// Components
import {
	WhatsappButton,
	FacebookButton,
	TwitterButton,
	LinkedinButton
} from './SocialButtons'

// Styles
import './Social.styl'

const Social = ({ rounded = false, title }) => (
	<ul className="social">
		<WhatsappButton title={title} rounded={rounded} />
		<FacebookButton title={title} rounded={rounded} />
		<TwitterButton title={title} rounded={rounded} />
		<LinkedinButton title={title} rounded={rounded} />
	</ul>
)

export default Social
