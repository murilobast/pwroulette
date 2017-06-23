import classNames from 'classnames'

const fbShare = (e) => {
	e.preventDefault()

	window.open(
		`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? location.href : ''}`,
		'pop',
		'width=600, height=400, scrollbars=no'
	)
}

const twitterShare = (e, title) => {
	e.preventDefault()

	window.open(
		`http://twitter.com/share?text=${title}&url=${typeof window !== 'undefined' ? location.href : ''}`,
		'pop',
		'width=600, height=400, scrollbars=no'
	)
}

const linkedinShare = (e) => {
	e.preventDefault()

	window.open(
		`https://www.linkedin.com/cws/share?url=${typeof window !== 'undefined' ? location.href : ''}`,
		'pop',
		'width=600, height=400, scrollbars=no'
	)
}

export const WhatsappButton = ({ title, rounded }) => {
	const linkClasses = classNames(
		'social__item',
		`social__item--whatsapp`,
		{ 'social__item--rounded': rounded }
	)

	return (
		<li className={linkClasses}>
			<a
				href="whatsapp://send"
				data-text={title}
				data-href={typeof window !== 'undefined' ? location.href : ''}
			>
				Whats App
			</a>
		</li>
	)
}

export const TwitterButton = ({ title, rounded }) => {
	const linkClasses = classNames(
		'social__item',
		`social__item--twitter`,
		{ 'social__item--rounded': rounded }
	)

	return (
		<li className={linkClasses}>
			<a
				onClick={(e) => twitterShare(e, title)}
			>
				Twitter
			</a>
		</li>
	)
}

export const FacebookButton = ({ title, rounded }) => {
	const linkClasses = classNames(
		'social__item',
		`social__item--facebook`,
		{ 'social__item--rounded': rounded }
	)
	return (
		<li className={linkClasses}>
			<a
				onClick={fbShare}
			>
				Facebook
			</a>
		</li>
	)
}

export const LinkedinButton = ({ title, rounded }) => {
	const linkClasses = classNames(
		'social__item',
		`social__item--linkedin`,
		{ 'social__item--rounded': rounded }
	)
	return (
		<li className={linkClasses}>
			<a
				onClick={linkedinShare}
			>
				Linkedin
			</a>
		</li>
	)
}
