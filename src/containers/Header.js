import {
	branch,
	compose,
	withState,
	lifecycle,
	withHandlers,
	renderNothing
} from 'recompose'

// Components
import HeaderView from 'components/shared/Header'

export default compose(
	withState('inverted', 'setInverted', false),
	withState('showMenu', 'setMenu', false),
	withHandlers({
		scrollHandler: ({
			color,
			inverted,
			showMenu,
			setInverted
		}) => () => {
			if (!showMenu) {
				setInverted(false)
				return
			}
			if (window.pageYOffset > 0 && !inverted)
				setInverted(true)
			else if (window.pageYOffset === 0 && inverted)
				setInverted(false)
		}
	}),
	withHandlers({
		clickHandler: ({
			setMenu,
			showMenu,
			setInverted,
			scrollHandler
		}) => () => {
			if (!showMenu) {
				setMenu(!showMenu)
				setInverted(!showMenu)
			} else {
				setMenu(!showMenu)
				scrollHandler()
			}
		},
		menuItemClick: ({ setMenu, setInverted }) => () => {
			if (process.browser && window.innerWidth < 768) {
				setMenu(false)
				setInverted(false)
			}
		}
	}),
	lifecycle({
		componentDidMount() {
			const { scrollHandler } = this.props
			window.addEventListener('scroll', scrollHandler)
			scrollHandler()
		},
		componentWillUnmount() {
			const { scrollHandler } = this.props
			window.removeEventListener('scroll', scrollHandler)
		}
	}),
	branch(props => props.hidden, renderNothing)
)(HeaderView)
