const slugify = string => string.toLowerCase()
	.replace(/ /g, '-')
	.replace(/\%/, '')
	.replace(/\//, '')
	.replace(/\\/, '')

export default slugify
