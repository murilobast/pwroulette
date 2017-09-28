const triviaData = require('./trivia')

const routes = [
	'/',
	'/chests',
	'/trivia'
]

const slugify = string => string.toLowerCase()
	.replace(/ /g, '-')
	.replace(/\%/, '')
	.replace(/\//, '')
	.replace(/\\/, '')

const getTriviaRoutes = () => {
	const parentRoutes = triviaData.map(({ slug, questions }) => {
		const url = `/trivia/${slug}`
		return [...questions
			.map(({ question }, i) => `${url}/${i}-${slugify(question)}`), url]
	})
	const triviaRoutes = parentRoutes
		.reduce((prev, next) => [...prev, ...next], [])
	return [...routes, ...triviaRoutes]
}


module.exports = getTriviaRoutes()
