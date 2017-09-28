import S from 'string'

const slugify = string => S(string).latinise().s
	.toLowerCase()
	.replace(/[^A-Za-z0-9 ]/g, '')
	.replace(/ /g, '-')

export default slugify
