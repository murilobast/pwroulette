// Component
import Content from './Content'

// Styles
import './Window.styl'

const Window = () => (
	<div className="window">
		<div className="window__background" />
		<div className="window__top" />
		<Content />
		<div className="window__bottom" />
	</div>
)

export default Window
