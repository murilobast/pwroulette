const webpack = require('webpack')
const postStylus = require('poststylus')
const rupture = require('rupture')

module.exports = function () {
	return new webpack.LoaderOptionsPlugin({
		test: /\.styl$/,
		stylus: {
			preferPathResolver: 'webpack',
			default: {
				use: [
					postStylus([
						'rucksack-css',
						'css-mqpacker',
						'autoprefixer',
					]),
					rupture()
				],
				import: [
					'~styles/abstractions/variables.styl',
					'~styles/abstractions/functions.styl'
				]
			}
		},
		options: {
			context: __dirname
		}
	})
}
