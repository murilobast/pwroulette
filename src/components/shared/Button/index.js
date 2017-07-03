import './Button.styl'

const Button = ({ text, action }) => (
	<button
		onClick={() => action()}
		className="button"
	>
		{text}
	</button>
)

export default Button
