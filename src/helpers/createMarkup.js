const scriptRegexp = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
const anchorRegexp = /<a\b[^<]*(?:(?!<\/a>)<[^<]*)*<\/a>/gi

const createMarkup = string => ({
	__html: string
		.replace(scriptRegexp, '')
		.replace(anchorRegexp, '')
})

export default createMarkup
