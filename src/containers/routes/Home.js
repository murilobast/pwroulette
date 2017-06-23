import { Component } from 'react'
import { connect } from 'react-redux'

// Ducks
import { getHomePosts } from 'ducks/api'

// Page
import HomePage from 'pages/Home'

class Home extends Component {
	componentWillMount() {
		const { getHomePosts, pending } = this.props

		if (pending)
			getHomePosts()
	}

	render () {
		const { posts } = this.props
		return (
			<HomePage posts={posts} />
		)
	}
}

const mapStateToProps = ({ api }) => ({
	pending: api.get('pending').get('getHomePosts'),
	posts: api.get('homePosts')
})

const mapDispatchToProps = dispatch => ({
	getHomePosts: () => dispatch(getHomePosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
