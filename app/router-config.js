export const routerMap = {
	'/vueComponent/index.html': {
		component: function (resolve) {
        	require(['./components/welcome.vue'], resolve);
      	}
	},

	'component': {
		component: function (resolve) {
        	require(['./components/vueContent.vue'], resolve);
      	},
		// component: require('./components/vueContent.vue'),
		subRoutes: {
			'': {
				component: function (resolve) {
	            	require(['./components/webview/checkbox.vue'], resolve);
	          	},
				// component: require('./components/webview/checkbox.vue')
			},
			'/menu': {
				component: function (resolve) {
	            	require(['./components/webview/menu.vue'], resolve);
	          	},
				// component: require('./components/webview/menu.vue')
			},
			'/table': {
				component: function (resolve) {
	            	require(['./components/webview/table.vue'], resolve);
	          	},
				// component: require('./components/webview/table.vue')
			},
			'button': {
				component: function (resolve) {
	            	require(['./components/webview/button.vue'], resolve);
	          	},
				// component: require('./components/webview/button.vue')
			},
			'spin': {
				component: function (resolve) {
	            	require(['./components/webview/spin.vue'], resolve);
	          	},
				// component: require('./components/webview/spin.vue')
			},
			'checkbox': {
				component: function (resolve) {
	            	require(['./components/webview/checkbox.vue'], resolve);
	          	},
				// component: require('./components/webview/checkbox.vue')
			}
		}
	},
	// '*': {
	// 	component: function (resolve) {
 //        	require(['./components/welcome.vue'], resolve);
 //      	}
	// 	// component: require('./components/welcome.vue')
	// },
	// '*': {
	// 	component: require('./components/VueComponents.vue')
	// }
}
export function configRouter (router) {
	router.map(routerMap)
	//重定向
	router.redirect({
		// '/components.html': '/components.html/menu'
		// '/info': '/devindex.html',
		// '/devindex.html':'/main/news'
	})
	//
	router.beforeEach((transition) => {
		if(transition.to.path === '/forbidden'){
			setTimeout(() => {
				alert('this route is forbidden by a gllbal before hook');
				transition.abort();
			}, 3000)
		}else{
			transition.next();
		}
	})
}