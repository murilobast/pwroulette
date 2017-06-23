const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const routeConfig = require('../src/config/routes')

// Common configs
const commonPlugins = require('./common/plugins')
const commonResolve = require('./common/resolve')
const stylusPlugin = require('./common/stylus')

module.exports = {
	context: paths.context,
	entry: [paths.appIndexJs, paths.appStyle],
	output: {
		path: paths.appBuild,
		filename: 'static/js/[name].bundle.js',
		chunkFilename: 'static/js/bundle.[name].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				exclude: [
					/\.ejs$/,
					/\.html$/,
					/\.(js|jsx)$/,
					/\.(css|styl)$/,
					/\.ttf$/,
					/\.json$/
				],
				loader: 'url-loader',
				query: {
					limit: 1000,
					name: 'static/media/[name].[ext]'
				}
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader'
				}],
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: false,
								sourceMap: false,
								minimize: true,
								discardComments: { removeAll: true }
							}
						},
						'stylus-loader'
					]
				})
			},
			{
				test: /\.ttf$/,
				loader: 'url-loader?limit=10000&name=/static/fonts/[hash:8].[ext]'
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			filename: 'index.ejs',
			markup: '<%- markup %>',
			title: '<%- seo.title.toString() %>',
			preloadedState: '<%- preloadedState %>',
			favicon: '../src/assets/favicon.png',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			googleAnalytics: {
				trackingId: 'UA-XXXX-XX',
				pageViewOnLoad: true
			},
			mobile: true
		}),
		// new PreloadWebpackPlugin({
		// 	rel: 'preload',
		// 	as: 'script',
		// 	include: 'asyncChunks'
		// }),
		new ExtractTextPlugin({
			filename: 'static/css/[name].css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'static/js/vendor.js',
			minChunks: m => m.resource && m.resource.includes('node_modules')
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}),
		stylusPlugin(),
		new OfflinePlugin({
			version: 'sw_[hash]',
			events: true,
			safeToUseOptionalCaches: true,
			responseStrategy: 'cache-first',
			excludes: [
				'index.ejs'
			],
			cacheAll: true,
			// cacheMaps: [
			// 	{
			// 		match: function (requestUrl) {
			// 			return new URL('/', location)
			// 		},
			// 		requestTypes: ['navigate']
			// 	}
			// ],
			externals: [
				'/'
			],
			// externals: routeConfig.map(route => route.path),
			ServiceWorker: {
				events: true,
				navigateFallbackURL: '/',
				output: 'sw.js'
			},
			AppChache: {
				caches: ['main', 'additional'],
				FALLBACK: {
					'/': '/'
				}
			}
		})
	].concat(commonPlugins),
	resolve: commonResolve
}
