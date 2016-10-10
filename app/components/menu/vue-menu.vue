<template>
<ul :class="menuCls">
	<!-- title 要有前面 和 后面的icon图标 -->
	<!-- <li class="ant-menu-submenu-inline ant-menu-submenu-open ant-menu-submenu-active ant-menu-submenu">
		<slot name="beforeIcon"></slot>
		content
		<slot name="afterIcon"></slot>
	</li> -->
	<sub-menu v-for="menu in filterdSourceData"
	track-by="$index"
	:menu-data="menu" 
	:source-data="sourceData" 
	:is-child="false"
	:mode="mode"
	:leval="0"
	:open="openSubmenu">
	<vue-icon :type="iconType[$index]" slot="beforeIcon"></vue-icon>
	</sub-menu>
</ul>
</template>
<script type="text/javascript">
import subMenu from './vue-subMenu'
import vueIcon from '../icon/vue-icon'
export default {
	props: {
		sourceData: Array,
		prefixCls: {
			type: String,
			default: 'ant-menu'
		},
		theme: String,
		mode: String,
		openSubmenu: {
			type: Boolean,
			default: false
		}
		// iconType: {
		// 	type: String,
		// 	default: "appstore" 
		// }
	},
	data() {
		return {
			menuCls: ' ',
			iconType: []
		}
	},
	methods: {
		getDataByKey(key) {
			for(let child of this.sourceData){
				if(child.key === key){
					return child
				}
			}
		},
	},
	components: {
		subMenu,
		vueIcon
	},
	created() {
		//筛选第一级导航
		this.filterdSourceData = this.sourceData.filter((child) => {
			return child.title
		})
		//初始化导航图标
		this.filterdSourceData.forEach((menu) => {
			this.iconType.push(menu.iconType || ' ')
		})
		
		// 初始化class名称
		this.menuCls += ` ${this.prefixCls} ${this.prefixCls}-root`
		if(this.mode && (['inline', 'vertical', 'horizontal'].includes(this.mode))){
			this.menuCls += ` ${this.prefixCls}-${this.mode}`
		}else{
			this.menuCls += ` ${this.prefixCls}-inline`
		}
		if(this.theme && this.theme === 'dark'){
			this.menuCls += ` ${this.prefixCls}-dark`
		}else{
			this.menuCls += ` ${this.prefixCls}-light`
		}
		
		
	}
}
</script>