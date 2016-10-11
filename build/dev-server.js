var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var config = require('./webpack.dev.config')
var express = require('express')

var app = express()
var compiler = webpack(config)
var devMiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
}) 
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})
app.use(devMiddleware)
app.use(hotMiddleware);
app.listen(8888, function(err){
	if(err){
		console.log(err)
		return
	}
	console.log('successfully listen 8888:')
})