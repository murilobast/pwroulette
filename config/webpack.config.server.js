const paths = require('./paths')
const webpack = require('webpack')

// Common configs
const commonPlugins = require('./common/plugins')
const commonResolve = require('./common/resolve')

process.env.NODE_ENV = 'production'

module.exports = {
	context: paths.context,
	entry: [paths.serverRendererJs],
	target: 'node',
	output: {
		path: paths.server,
		filename: 'renderer.js',
		libraryTarget: "commonjs2"
	},
	target: 'node',
	module: {
		rules: [
			{
				exclude: [
					/\.(js|jsx)$/,
					/\.json$/,
					/\.(svg|png|jpg)$/
				],
				loader: 'ignore-loader',
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['react-app'] }
				}],
			},
			{
				test: /\.(svg|png|jpg)$/,
				loader: 'url-loader',
				query: {
					limit: 1000,
					name: '/static/media/[name].[ext]'
				}
			}
		]
	},
	plugins: commonPlugins,
	resolve: commonResolve,
	externals: ['redis']
}
