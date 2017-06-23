const routes = [
	{
		exact: true,
		path: '/',
		component: 'Home'
	},

	{
		path: '/post/:category/:slug',
		component: 'Post'
	},

	{
		path: '/bar',
		component: 'Bar'
	}
]

module.exports = routes
