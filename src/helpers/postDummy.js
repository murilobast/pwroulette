const postDummy = (category, slug) => ({
	author: {
		avatars: {
			24: 'http://2.gravatar.com/avatar/8283623a8cc4d1c1709d3fa0bf3722f3?s=24&d=mm&r=g',
			48: 'http://2.gravatar.com/avatar/8283623a8cc4d1c1709d3fa0bf3722f3?s=48&d=mm&r=g',
			96: 'http://2.gravatar.com/avatar/8283623a8cc4d1c1709d3fa0bf3722f3?s=96&d=mm&r=g'
		},
		name: 'IQ 360'
	},
	title: slug.charAt(0).toUpperCase() + slug.replace(/-/g, ' ').slice(1),
	category
})

export default postDummy
