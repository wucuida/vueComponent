var hotClient = require('webpack-hot-middleware/client')

//订阅事件，当event.action === 'reload'时，刷新页面
hotClient.subscribe(function(event){
	if(event.action === 'reload'){
		window.location.reload()
	}
})