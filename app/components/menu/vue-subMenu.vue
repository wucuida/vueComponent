<template>
<li :class="submenuCls" @mouseover="handleMouseOver" @mouseout="handleMouseOut"> 
	<div v-if="menuData.title" 
	:class="{'ant-menu-submenu-title': hasChildren, 'ant-menu-item': !hasChildren}" 
	v-link="menuData.link"
	@click="handleClick"
	>
		<slot name="beforeIcon" v-if="!isChild" >
		</slot>	
		{{menuData.title}}	
	</div>
	<div 
	v-if="hasChildren && menuData.content"  
	:class="childMenuCls"
	@click="handleClick"
	:style="childMenuIndetStyle"
	>
		{{menuData.content}}
	</div>
	<div v-if="!hasChildren" 
	:class="itemCls" 
	:style="indetStyle"
	v-link="menuData.link"
	@click="handleClickItem">
		{{menuData.content}}
	</div>
	<ul v-show="open" v-if="hasChildren" :class="innerMenuCls">
		<sub-menu :menu-data="getDataByKey(childKey)" 
		v-for="childKey in menuData.children" 
		:source-data="sourceData" 
		:content="getDataByKey(childKey).content"
		:is-child="true"
		:leval="leval + 1"
		:mode="mode">
		</sub-menu>
	</ul>
</li>
</template>
<script type="text/javascript">
// import menuItem from './vue-menuItem'
import VueRouter from 'vue-router'
export default {
	name: 'sub-menu',
	data() {
		return {
			hasChildren: false,
			indentSize: 30,
		}
	},
	props: {
		menuData: Object, //{key: '1', content: 'jfe', children: [2,3]}
		prefixCls: {
			type: String,
			default: 'ant-menu'
		},
		sourceData: Array,
		isChild: Boolean,
		mode: {
			type: String,
			default: 'inline'
		},
		leval: Number, //用于inline模式下的子菜单缩进水平
		open: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		submenuCls() {

			if(this.hasChildren || this.menuData.title !== undefined){
				return `${this.prefixCls}-submenu-${this.mode}  ${this.prefixCls}-submenu animated 
						fadeIn`
				// return 'ant-menu-submenu-vertical ant-menu-submenu'
			}else{
				return `${this.prefixCls}-item animated fadeIn`
				// return 'ant-menu-item'
			}
		},
		indetStyle() {
			if(this.mode === 'inline'){
				let ident = this.leval * this.indentSize + 'px'
				return {'padding-left': ident}
			}
			return {}
			
		},
		childMenuIndetStyle() {
			if(this.mode === 'inline'){
				let ident = (this.leval + 1) * this.indentSize + 'px'
				return {'padding-left': ident}
			}
			return {}
			
		},
		isNav() {
			return this.menuData.link
		}
	},
	methods: {
		initRender() {
			if(!this.menuData){
				return 
			}
			if(this.menuData.children && this.menuData.children.length > 0){
				this.hasChildren = true
				this.innerMenuCls = `${this.prefixCls} ${this.prefixCls}-${this.mode} ${this.prefixCls}-sub`
			}
			this.itemCls = 'ant-menu-item '
			if(this.menuData.disabled){
				this.itemCls += ' ant-menu-item-disabled'
			}
			this.childMenuCls = "ant-menu-submenu-title "
			// if(this.mode === 'horizontal'){
			//	目的：删除horizontal情况下，submenu-title的蓝色下滑线
			// 	this.childMenuCls += ' no-border-item'
			// }

		},
		getDataByKey(key) {
			// 
			for(let child of this.sourceData){
				if(child.key === key){
					return child
				}
			}
		},
		handleClick() {
			if(this.mode === 'inline'){
				this.open = !this.open;
			}
		},
		handleClickItem() {
			console.log('点击item:', this.menuData)
		},
 		// handleMouseOver2(e) {
		// 	if(this.mode === 'vertical'){				
		// 		if(this.timer){
		// 			clearTimeout(this.timer)
		// 		}
		// 		if(this.$parent.timer){
		// 			clearTimeout(this.$parent.timer)
		// 		}
		// 		if(this.$parent.$parent.timer){
		// 			clearTimeout(this.$parent.$parent.timer)
		// 		}
		// 		this.open = true;
		// 	}
		// },
		// handleMouseOut2(e) {
		// 	if(this.mode === 'vertical'){			
		// 		this.timer = setTimeout(() => {this.open = false}, 300)
		// 		if(this.$parent.open){
		// 			this.$parent.timer = setTimeout(() => {this.$parent.open = false}, 300)
		// 		}
		// 		if(this.$parent.$parent.open){
		// 			this.$parent.$parent.timer = setTimeout(() => {this.$parent.$parent.open = false}, 300)
		// 		}
		// 	}
		// },   
		handleMouseOver(e) {
			if(this.mode !== 'inline'){
				this.open = true
				if(this.timer){
					clearTimeout(this.timer)
				}
			}
		},
		handleMouseOut(e) {
			if(this.mode !== 'inline'){
				this.timer = setTimeout(() => {this.open = false}, 300) 
			}
		}
	},
	created() {

		// 通过isChild判断是否渲染前面两部分，false: 渲染
		this.initRender()
	},
	// transition: {
	// 	'myTest': {
	// 		enterClass: 'animated fadeIn',
	// 		leaveClass: 'animated fadeOut'
	// 	}
	// }
}
</script>
