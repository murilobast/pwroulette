const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

// Common configs
const commonPlugins = require('./common/plugins')
const commonResolve = require('./common/resolve')
const stylusPlugin = require('./common/stylus')

module.exports = {
	context: paths.context,
	entry: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://0.0.0.0:3001',
			'webpack/hot/only-dev-server',
			paths.appIndexJs,
			paths.appStyle
	],
	output: {
		path: paths.appBuild,
		filename: 'static/js/[name].bundle.js',
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
					/\.json$/,
					/\.ttf$/,
					/\.inline\.svg$/
				],
				loader: 'url-loader',
				query: {
					limit: 1000,
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},
			{
				enforce: 'pre',
				test: /\js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['latest', { es2015: { modules: false } }],
								'react'
							],
							plugins: [
								'transform-class-properties',
								['transform-object-rest-spread', { useBuiltIns: true }],
								['transform-runtime', {
									helpers: false,
									polyfill: false,
									regenerator: true,
									moduleName: path.dirname(require.resolve('babel-runtime/package'))
								}],
								['transform-regenerator', {
									async: false
								}],
								'react-hot-loader/babel'
							]
						}
					}
				],
			},
			{
				test: /\.styl$/,
				loaders: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: false,
							sourceMap: true,
							minimize: false
						}
					},
					'stylus-loader'
				]
			},
			{
				test: /\.ttf$/,
				loaders: ['file-loader']
			},
			{
				test: /\.inline\.svg$/,
				loader: 'svg-inline-loader'
			}
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			title: '<title>PWS DEV</title>',
			favicon: '../src/assets/favicon.png'
		}),
		new OfflinePlugin({
			events: true,
			safeToUseOptionalCaches: true,
			responseStrategy: 'network-first'
		}),
		stylusPlugin()
	].concat(commonPlugins),
	resolve: commonResolve,
	devServer: {
		contentBase: paths.context,
		host: '0.0.0.0',
		port: 3001,
		hot: true,
		inline: false,
		historyApiFallback: true,
		disableHostCheck: true
	}
}
