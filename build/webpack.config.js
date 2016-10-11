var path = require('path')
module.exports = {
	entry: {
		index: path.resolve(__dirname, '../app/index/index.js'),
	},
	output: {
		// 本地应用
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, '../output/static'),
		chunkFilename: '[id].[hash].js',
		publicPath: path.resolve(__dirname, '../output/static')
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets=es2015',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	},
	resolve:{
		extensions: ['', '.js', '.vue']
	},
	plugins: [

	],
	devtool: 'eval-source-map',
	// externals: {
	// 	'vue': 'Vue'
	// }
}