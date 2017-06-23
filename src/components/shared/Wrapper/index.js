import classNames from 'classnames'

// Styles
import './Wrapper.styl'

const Wrapper = ({ children, small = false, smaller = false }) => {
	const wrapperClasses = classNames(
		'container',
		{ 'container--small': small },
		{ 'container--smaller': smaller }
	)

	return (
		<div className={wrapperClasses}>
			{children}
		</div>
	)
}

export default Wrapper
