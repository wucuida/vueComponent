<template>
<section class="markdown">
	<h1>菜单/导航</h1>
	<h2>代码演示</h2>
</section>
<demo :title="'基本用法'">
	<vue-menu style="width:240px" :source-data="menuData">
	</vue-menu>
</demo>
<demo :title="'垂直菜单'">
	<vue-menu style="width:240px" :source-data="menuData" :mode="'vertical'">
	</vue-menu>
</demo>
<demo :title="'导航'" :describe="navDataStr">
	<vue-menu :source-data="navData" :mode="'horizontal'">
	</vue-menu>
</demo>
<demo :title="'黑色主题'">
	<vue-menu style="width:240px" :source-data="menuData" :theme="'dark'">
	</vue-menu>
</demo>
<demo :title="'带有不可选选项的菜单'" :describe="menuDataDisableStr">
	<vue-menu style="width:240px" :source-data="menuDataDisable" >
	</vue-menu>
</demo>
<section class="markdown api-container">
	<h1>API</h1>
	<h2>Menu props</h2>
	<vue-table :data-source="apiMenuData" :columns="apiCols" :size="'middle'"></vue-table>
	<h2>MenuItem props</h2>
	<vue-table :data-source="apiItemData" :columns="apiCols" :size="'middle'"></vue-table>
</section>

</template>
<script type="text/javascript">
import demo from '../vueDemo/vue-demo'
import vueMenu from '../menu/vue-menu'
import {arrayOfObjToStr} from '../../util/util'
import vueTable from '../table/index'
export default {
	data() {
		return {
			msg: '123  menu',
			menuData: [
				{key: 'a', title: '导航一', children: ['1', '2', '3']},
				{key: '1', content:'选项1'},
				{key: '2', content:'选项2'},
				{key: '3', content:'选项3'},
				{key: 'b', title: '导航二', children: ['4', '5']},
				{key: '4', content: '选项4'},
				{key: '5', content: '二级菜单5', children: ['6', '8']},
				{key: '6', content: '选项6'},
				// {key: '7', content: '选项7', disabled: true},
				{key: '8', content: '选项8'},
			],
			navData: [
				{key: 'a', title: '首页', iconType: 'appstore', link: '/index.html'},
				{key: 'a', title: '邮箱', iconType: 'mail'},
				{key: 'a', title: '视频', iconType: 'video-camera'},
				{key: 'a', title: '图片', iconType: 'picture'},
				{key: 'b', title: '音乐', iconType: "customerservice"},
			],
			menuDataDisable: [
				{key: 'a', title: '导航一', children: ['1', '2']},
				{key: '1', content:'选项1'},
				{key: '2', content:'选项2'},
				{key: 'b', title: '导航二', children: ['4', '5']},
				{key: '4', content: '选项4'},
				{key: '5', content: '二级菜单5', children: ['6', '8']},
				{key: '6', content: '选项6', disabled: true},
				// {key: '7', content: '选项7', disabled: true},
				{key: '8', content: '选项8'},
			],
			apiCols: [	
				{title: '参数', dataIndex: 'a', key: '1'},
				{title: '说明', dataIndex: 'b', key: '2'},
				{title: '类型', dataIndex: 'c', key: '3'},
				{title: '默认值 ', dataIndex: 'd', key: '4'},
				{title: '备注', dataIndex: 'e', key: '5'}
			],
			apiMenuData: [
				{a: 'sourceData', b: '数据数组', c: 'Array', d:'-', e: '必要参数', key: 'id1'},
				{a: 'theme', b: '主题颜色', c: 'Sting: light dark', d:'light', e: '-', key: 'id2'},
				{a: 'mode', b: '菜单类型，现在支持垂直和内嵌，水平常用作一级导航', c: 'String:vertical inline horizontal', d:'inline', e: '-', key: 'id3'},
			],
			apiItemData: [
				{a: 'title', b: '一级导航内容', c: 'String', d:'-', e: '-', key: 'id4'},
				{a: 'content', b: '非一级导航的内容', c: 'String', d:'-', e: '-', key: 'id5'},
				{a: 'key', b: 'item的唯一标志', c: 'String', d:'-', e: '必要参数', key: 'id6'},
				{a: 'children', b: '子选项的key', c: 'Array', d:'-', e: '保证key与item的 key对应', key: 'id7'},
				{a: 'link', b: '路由跳转路径', c: 'String', d:'-', e: '-', key: 'id8'},
				{a: 'iconType', b: "item前面的图标", c: 'String', d:"-", e: '-', key: 'id9'},
				{a: 'disabled', b: '设置itemw为不可选', c: 'Boolean', d:'false', e: '-', key: 'id10'},
				
			],
		}
	},
	components: {
		demo,
		vueMenu,
		vueTable
	},
	computed: {
		menuDataDisableStr() {
			return 'menuDataDisable为：' + arrayOfObjToStr(this.menuDataDisable)
		},
		navDataStr() {
			return 'navData为：' + arrayOfObjToStr(this.navData)
		}
	},
}
</script>