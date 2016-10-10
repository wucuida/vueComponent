<template>
<section class="markdown">
	<h1>按钮</h1>
	<h2>代码演示</h2>
</section>
<demo :title="'基本用法'">
	<vue-checkbox>checkbox</vue-checkbox>
</demo>
<demo :title="'不可用'">
	<vue-checkbox :disabled="true">checkbox</vue-checkbox>
	<vue-checkbox :checked="true" :disabled="true">checkbox</vue-checkbox>
</demo>
<demo :title="'绑定事件'">
	<vue-checkbox v-ref:v-checkbox :checked="true" @click="doSomeThing">checkbox</vue-checkbox>
</demo>
<section class="markdown api-container">
	<h1>API</h1>
	<h2>checkbox props</h2>
	<vue-table :data-source="apiData" :columns="apiCols" :size="'middle'"></vue-table>
</section>
</template>
<script type="text/javascript">
import vueTable from '../table/index'
import vueCheckbox from '../checkbox/vue-checkbox'
import demo from '../vueDemo/vue-demo'
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
				{a: 'checked', b: '指定当前是否选中', c: 'Boolean', d:'false', e: '-', key: 'a'},
				{a: 'disabled', b: '设置当前是否为无效', c: 'Boolean', d:'false', e: '-', key: 'b'},
			],
		}
	},
	methods: {
		doSomeThing() {
			console.log('点击checkbox', this.$refs.vCheckbox.getChecked())
		}
	},
	components: {
		vueTable,
		vueCheckbox,
		demo
	}
}
</script>