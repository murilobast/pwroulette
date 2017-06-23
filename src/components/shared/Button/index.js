import classNames from 'classnames'

// Styles
import './Button.styl'

const Button = ({
	text,
	type = 'button',
	onClick,
	url = '#!',
	brand = 'default',
	capitalize = false
}) => {
	const buttonClasses = classNames(
		'button',
		`button--${brand}`,
		{ 'button--capitalize': capitalize }
	)

	if (type !== 'link')
		return (
			<button
				className={buttonClasses}
				type={type}
				onClick={(e) => onClick(e)}
			>
				{ text }
			</button>
		)

	return (
		<a
			className={buttonClasses}
			href={url}
			onClick={(e) => onClick(e)}
		>
			{ text }
		</a>
	)
}

export default Button
