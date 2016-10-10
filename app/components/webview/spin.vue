<template>
<div>
<section class="markdown">
	<h1>Spin 加载中</h1>
	<h2>代码演示</h2>
</section>
<demo :title="'基本用法'">
	<vue-spin></vue-spin>
</demo>
<demo :title="'各种大小的spin'">
	<vue-spin :size="'large'"></vue-spin>
	<vue-spin></vue-spin>
	<vue-spin :size="'small'"></vue-spin>
</demo>
<demo :title="'容器'">
	<div class="example">
		<vue-spin></vue-spin>
	</div>
	<pre>其中example {
	  text-align: center;
	  background: rgba(185, 221, 243,0.20);
	  border-radius: 4px;
	  margin-bottom: 20px;
	  padding: 30px 50px;
	  margin: 20px 0;
	}</pre>
</demo>
<demo :title="'卡片加载中'" :describe="'可以直接把内容内嵌到 Spin 中，将现有容器变为加载状态'">
	<vue-spin :spinning="loading">
		<p class="example">通过点击button,执行相应的click函数，来控制spinning参数在true和false
		之间切换，使此段落呈现加载和非加载状态。
		</p>
	</vue-spin>
	<vue-button :mode="'primary'" @click="toggleClick">切换加载状态</vue-button>
</demo>

<section class="markdown api-container">
	<h1>API</h1>
	<h2>Spin props</h2>
	<vue-table :data-source="apiData" :columns="apiCols" :size="'middle'"></vue-table>
</section>
</div>
</template>
<script type="text/javascript">
import vueSpin from "../spin/vue-spin"
import demo from '../vueDemo/vue-demo'
import vueTable from '../table/index'
import vueButton from '../button/vue-button'
export default {
	data() {
		return {
			loading: false,
			apiCols: [	
				{title: '参数', dataIndex: 'a', key: '1'},
				{title: '说明', dataIndex: 'b', key: '2'},
				{title: '类型', dataIndex: 'c', key: '3'},
				{title: '默认值 ', dataIndex: 'd', key: '4'},
				{title: '备注', dataIndex: 'e', key: '5'}
			],
			apiData: [
				{a: 'size', b: 'spin组件中点的大小', c: 'String: small default large', d:'default', e: '-', key: 'a'},
				{a: 'spinning', b: '用于内嵌其他组件的模式，可以关闭loading效果', c: 'Boolean', d:'-', e: '-', key: 'b'},
				{a: 'tip', b: '自定义描述文案', c: 'String', d:'-', e: '-', key: 'c'},
				{a: 'extraCls', b: '为spin添加额外class', c: 'String', d: '-', e: '不要直接在spin组件上直接绑定class,用此参数添加额外class,否则可能渲染不正确',  key: 'd'},
			],
		}
	},
	components: {
		vueSpin,
		demo,
		vueTable,
		vueButton
	},
	methods: {
		toggleClick() {
			this.loading = !this.loading
		}
	}
}
</script>
<style>
.example {
  text-align: center;
  background: rgba(185, 221, 243,0.20);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>