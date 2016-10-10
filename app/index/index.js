/* dev 用*/
/*
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {configRouter} from '../router-config'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.debug = true;
console.log(VueRouter)
const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  transitionOnload: false
})
configRouter(router)
import app from './app.vue'
const App = Vue.extend(app)
// const App = Vue.extend(require('./app.vue'))


// just for debugging
window.router = router

router.start(App, "#app")
*/

/* 部署 用 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {configRouter, routerMap} from '../router-config'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.debug = true;
const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  transitionOnload: false
})
configRouter(router)
import app from './app.vue'
// const App = Vue.extend(app)
// const App = Vue.extend(require('./app.vue'))


// just for debugging
window.router = router

router.start(app, "#app")
