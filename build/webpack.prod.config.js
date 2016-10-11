// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config.js');

// config.plugins = [
//     // 提取css为单文件
//     new ExtractTextPlugin("../[name].[contenthash].css"),
// ];
config.output = {		
	// web 应用,
	filename: '[name].js',
	path: 'output/static',
	chunkFilename: '[id].js',
	publicPath: 'static/'
}
module.exports = config;