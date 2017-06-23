import classNames from 'classnames'

// Components
import Card from 'components/shared/Card'

// Styles
import './PostList.styl'

const PostList = ({ posts, title, category = 'default' }) => {
	const postListClasses = classNames(
		'post-list',
		`post-list--${category}`
	)

	return (
		<section className={postListClasses}>
			<h3 className="post-list__title">
				<span>
					{title.toUpperCase()}
				</span>
			</h3>
			<ul className="post-list__posts">
				{posts.map(item => (
					<li className="post-list__post" key={`pl${item}`}>
						<Card />
					</li>
				))}
			</ul>
		</section>
	)
}


export default PostList
