<template>
<div class="main-wrapper">
 	<div class="ant-row ">
	  	<div class="mysub aside-container ant-layout-sider ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-4">
	    	<vue-menu :source-data="submenuData" :mode="'inline'" :open-submenu="true"></vue-menu>
	  	</div>
	  	<div class="main-container ant-col-xs-24 ant-col-sm-24 ant-col-md-18 ant-col-lg-20">
	    	<router-view transition-mode="out-in" keep-alive>
	    	</router-view>
	    	
	    	<!-- <btn :shape="'circle'" >ff</btn></btn-group> -->
	    	<!-- <vue-demo :title="'test'">
	    	<btn :style-type="'dashed'">按钮</btn>
		    <btn :shape="'circle'" :size="'small'">按钮</btn>
	    	<btn-group >
		    		<btn :shape="'circle'" :style-type="'primary'">左</btn>
			    	<btn :style-type="'dashed'">按钮</btn>
			    	<btn :shape="'circle'" :style-type="'primary'">右</btn>
		    	</btn-group>
		    </vue-demo> -->
	 	</div>
	</div> 
</div>
</template>
<script type="text/javascript">
import vueMenu from './menu/vue-menu'
import vueIcon from './icon/vue-icon'
import btn from './button/vue-button'
import btnGroup from './button/vue-buttonGroup'
import vueDemo from './vueDemo/vue-demo'
export default {
	data() {
		return {
			submenuData: [
	          {key: '1', title: '快速上手'},
	          {key: '2', title: '安装'},
	          {key: '3', title: '更新日志'},
	          {key: '4', title: '组件', children: ['5', '6', '7', '8'], link: '/components.html'},
	          {key: '5', content: '导航/菜单', link:'/components.html/menu'},
	          {key: '6', content: '表格', link: '/components.html/table'},
	          {key: '7', content: '按钮', link: '/components.html/button'},
	          {key: '8', content: '加载中', link: '/components.html/spin'}
        	],
		}
	},
	components: {
		vueMenu,
		vueIcon,
		btn,
		btnGroup,
		vueDemo
	}
}
</script>