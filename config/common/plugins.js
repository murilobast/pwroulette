const path = require('path')
const webpack = require('webpack')
const packageJson = require(path.resolve('./package.json'))
const pathConfig = packageJson.config

module.exports = [
	new webpack.ProvidePlugin({
		React: 'react'
	}),
	new webpack.DefinePlugin({
		'APP_KEY': JSON.stringify(pathConfig.APP_KEY),
		'API': JSON.stringify(pathConfig.API)
	})
]
