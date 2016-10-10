<template>
<section class="markdown">
	<h1>按钮</h1>
	<h2>代码演示</h2>
</section>
<demo :title="'基本用法'">
	<vue-Button>default</vue-Button>
	<vue-Button mode='primary'>primary</vue-Button>
	<vue-Button mode='ghost'>ghost</vue-Button>
	<vue-Button mode='dashed'>dashed</vue-Button>
</demo>
<demo :title="'按钮尺寸'">
	<vue-Button mode='primary' :size="'large'">Big</vue-Button>
	<vue-Button mode='primary'>default</vue-Button>
	<vue-Button mode='primary' :size="'small'">Small</vue-Button>
</demo>
<demo :title="'带icon的按钮'">
	<vue-Button mode='primary' :icon="'tag'">标签</vue-Button>
	<vue-Button mode='primary' :icon="'setting'">设置</vue-Button>
	<vue-Button mode='primary' :icon="'search'">搜索</vue-Button>
	<vue-Button mode='primary' :icon="'loading'">加载</vue-Button>
</demo>
<demo :title="'圆形图标按钮'">
	<vue-Button mode='primary' shape='circle' :icon="'setting'"></vue-Button>
	<vue-Button shape='circle' :icon="'search'"></vue-Button>
	<vue-Button shape='circle' :icon="'poweroff'"></vue-Button>
</demo>
<demo :title="'不可选按钮'">
	<vue-Button :disabled='true' mode='primary'>primary</vue-Button>
	<vue-Button :disabled='true'>default</vue-Button>
	<vue-Button :disabled='true' mode='dashed'>dashed</vue-Button>
	<vue-Button :disabled='true' mode='ghost'>ghost</vue-Button>
</demo>
<demo :title="'ButtonGroup'">
	<vue-button-group :size="'large'" style="padding-bottom: 8px;">
		<vue-Button mode='primary'>primary</vue-Button>
		<vue-Button>default</vue-Button>
		<vue-Button mode='ghost'>ghost</vue-Button>
		<vue-Button mode='dashed'>dashed</vue-Button>
	</vue-button-group>
	<br>
	<vue-button-group style="padding-bottom: 8px;">
		<vue-Button mode='primary'>primary</vue-Button>
		<vue-Button>default</vue-Button>
		<vue-Button mode='ghost'>ghost</vue-Button>
		<vue-Button mode='dashed'>dashed</vue-Button>
	</vue-button-group>
	<br>
	<vue-button-group :size="'small'">
		<vue-Button mode='primary'>primary</vue-Button>
		<vue-Button>default</vue-Button>
		<vue-Button mode='ghost'>ghost</vue-Button>
		<vue-Button mode='dashed'>dashed</vue-Button>
	</vue-button-group>
</demo>
<section class="markdown api-container">
	<h1>API</h1>
	<h2>Button props</h2>
	<p>可以将多个 Button 放入 Button.Group 的容器中。通过设置 size 为 large small 分别把按钮组合设为大、小尺寸。</p>
	<vue-table :data-source="apiData" :columns="apiCols" :size="'middle'"></vue-table>
</section>

</template>
<script type="text/javascript">
import demo from '../vueDemo/vue-demo'
import vueButton from '../button/vue-button'
import vueButtonGroup from '../button/vue-buttonGroup'
import vueTable from '../table/index'
export default {
	data() {
		return {
			apiCols: [	
				{title: '参数', dataIndex: 'a', key: '1'},
				{title: '说明', dataIndex: 'b', key: '2'},
				{title: '类型', dataIndex: 'c', key: '3'},
				{title: '默认值 ', dataIndex: 'd', key: '4'},
				{title: '备注', dataIndex: 'e', key: '5'}
			],
			apiData: [
				{a: 'mode', b: '设置按钮样式类型', c: 'String: primary ghost dashed', d:'default', e: '-', key: 'a'},
				{a: 'htmlType', b: '设置button原生的type值', c: 'String', d:'-', e: '-', key: 'b'},
				{a: 'icon', b: '设置按钮的图标类型', c: 'String', d:'-', e: '-', key: 'c'},
				{a: 'shape', b: '设置按钮形状', c: 'String：circle', d: '-', e: '-',  key: 'd'},
				{a: 'size', b: '设置按钮大小', c: 'String：large small', d: 'default', e: '-',  key: 'd'}
			],
		}
	},
	components: {
		vueButton,
		vueTable,
		demo,
		vueButtonGroup
	}
}
</script>