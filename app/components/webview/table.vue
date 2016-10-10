<template>
<section class="markdown">
	<h1>表格</h1>
	<h2>代码演示</h2>
</section>
<demo :title="'基本用法'">
	<vue-table
	:data-source="itemsData"
	:columns="colsData"
	:special-rows="specialRows">
	</vue-table>
</demo>
<demo :title="'带有可选框的table'">
	<vue-table
	:data-source="itemsData"
	:columns="colsData"
	:has-checkbox="true"
	:on-select="onSelect"
	:has-checkbox="true"
	:bordered="false"
	v-ref:my-table>
	</vue-table>
</demo>
<demo :title="'有分页的table'">
	<vue-table
	:data-source="itemsData2"
	:columns="colsData"
	:has-pagination="true">
	</vue-table>
</demo>
<demo :title="'加载状态的table'">
	<vue-table
	:data-source="itemsData"
	:columns="colsData"
	:loading="loading">
	</vue-table>
	<br />
	<vue-button mode="primary" @click="toggleClick">切换loading</vue-button>
</demo>
<demo :title="'固定表头的的table'">
	<vue-table
	:data-source="itemsData2"
	:columns="colsData"
	:use-fixed-header="true"
	:scroll="scroll">
	</vue-table>
</demo>
<demo :title="'额外展开行'">
	<vue-table
	:data-source="itemsData"
	:columns="colsData"
	:expanded-row-render="expandedRowRender">
	</vue-table>
</demo>
<demo :title="'有header和footer的table,点击行执行函数'">
	<vue-table
	:data-source="itemsData"
	:columns="colsData"
	:footer="footer"
	:title="title"
	:on-row-click="onRowClick"
	:loading="loading">
	</vue-table>
</demo>
<section class="markdown api-container">
	<h1>API</h1>
	<h2>Table props</h2>
	<vue-table :data-source="apiTableData" :columns="apiCols" :size="'middle'"></vue-table>
	<h2>Column props</h2>
	<vue-table :data-source="apiColumnData" :columns="apiCols" :size="'middle'"></vue-table>
</section>
</template>
<script type="text/javascript">
import vueTable from '../table/index'
import demo from '../vueDemo/vue-demo'
import vueButton from '../button/vue-button'
export default {
	data() {
		return {
			loading: false,
			msg: 'table',
			scroll:{ y:400 },
			colsData: [
				{ title: '姓名', dataIndex: 'a', key: '1' },
				{ title: '年龄', dataIndex: 'b', key: '2' },
				{ title: '电话', dataIndex: 'c', key: '3' },
			],
			itemsData: [
				{a: '张一', b: '11', c: '1234',key: 'a'},
				{a: '王二', b: '22', c: '3456', key: 'b'},
				{a: '李三', b: '33', c: '5678', key: 'c'},
				{a: '赵四', b: '44', c: '7890', key: 'd'}
			],
			itemsData2: [
				{a: '张一', b: '11', c: '12134',key: 'a'},
				{a: '张二', b: '22', c: '32456', key: 'b'},
				{a: '张三', b: '33', c: '56478', key: 'c'},
				{a: '张四', b: '44', c: '70890', key: 'd'},
				{a: '王一', b: '15', c: '1234',key: 'e'},
				{a: '王二', b: '64', c: '34546', key: 'f'},
				{a: '王三', b: '27', c: '5678', key: 'g'},
				{a: '王四', b: '82', c: '78990', key: 'h'},
				{a: '李一', b: '9', c: '12334',key: 'i'},
				{a: '李二', b: '22', c: '34256', key: 'g'},
				{a: '李三', b: '66', c: '5678', key: 'k'},
				{a: '李四', b: '44', c: '78190', key: 'l'},
				{a: '赵一', b: '34', c: '1234',key: 'm'},
				{a: '赵二', b: '22', c: '34516', key: 'n'},
				{a: '赵三', b: '33', c: '55678', key: 'o'},
				{a: '赵四', b: '17', c: '78790', key: 'p'}
			],
			specialRows: [ {key: 'a', color: 'red'}],
			apiCols: [	
				{title: '参数', dataIndex: 'a', key: '1'},
				{title: '说明', dataIndex: 'b', key: '2'},
				{title: '类型', dataIndex: 'c', key: '3'},
				{title: '默认值 ', dataIndex: 'd', key: '4'},
				{title: '备注', dataIndex: 'e', key: '5'}
			],
			apiTableData: [
				{a: 'dataSource', b: '数据数组', c: 'Array', d:'-', e: '必要参数', key: 'id1'},
				{a: 'columns', b: '表格列的配置描述，具体项见下表', c: 'Array', d:'-', e: '必要参数', key: 'id2'},
				{a: 'hasChekbox', b: '显示可选框', c: 'Boolean', d:'false', e: '-', key: 'id3'},
				{a: 'useFixedHeader', b: '固定表头', c: 'Boolean', d:'false', e: '与scroll搭配使用', key: 'id4'},
				{a: 'scroll', b: '纵向支持滚动，也可用于指定滚动区域的高度：{{  y: 300 }}', c: 'Object', d:'-', e: '与useFixedHeader搭配', key: 'id5'},
				{a: 'hasPagination', b: '分页', c: 'Boolean', d:'false', e: '可通过Pagination配置分页参数', key: 'id6'},
				{a: 'footer', b: '表格底部自定义渲染函数', c: 'Boolean', d:'-', e: 'Function(currentPageData)', key: 'id7'},
				{a: 'title', b: '表格头部自定义渲染函数', c: 'Boolean', d:'-', e: 'Function(currentPageData)', key: 'id8'},
				{a: 'size', b: "大型、正常或迷你类型，'large' 'middle' 'small'", c: 'String', d:"'large'", e: '-', key: 'id9'},
				{a: 'bordered', b: '是否展示外边框和列边框', c: 'Boolean', d:'true', e: '-', key: 'id10'},
				{a: 'specialRows', b: "特殊行样式数组{key: '2', color: 'green'}", c: 'Array', d:'-', e: '要保证key的正确', key: 'id11'},
				{a: 'onSelect', b: '有chechbox时选中的回调函数', c: 'Function', d:'-', e: 'Function(record)', key: 'id12'},
				{a: 'onRowClick', b: '点击某行时的回调函数', c: 'Function', d:'-', e: 'Function(record)', key: 'id13'},
				{a: 'selectedRowKeys', b: '默认checkbox选中的行的keys', c: 'Array', d:'-', e: "['a']", key: 'id14'},
				{a: 'expandedRowRender', b: '额外展开行的渲染函数，常用于当表格内容较多不能一次性完全展示时', c: 'Function', d:'-', e: "例：Function(record){return `<p>${record.e}</p>`}", key: 'id15'},
				{a: 'defaultExpandedRowKeys', b: '默认展开的行的key', c: 'Array', d:'-', e: "['a']", key: 'id16'},
				{a: 'anyClick', b: '有render函数时，真实的点击执行函数', c: 'Array', d: '-', e: '-', key: 'id17'},
				{a: 'pageSize', b: '有分页时，每页显示数目', c: 'Number', d: '4', e: '-', key: 'id18'},
						
			],
			apiColumnData: [
				{a: 'title', b: '列头显示文字', c: 'String', d:'-', e: '必需', key: 'a'},
				{a: 'key', b: '列的标志', c: 'String', d:'-', e: '必需', key: 'b'},
				{a: 'dataIndex', b: '列数据在数据项中对应的 key', c: 'String', d:'-', e: '必需', key: 'c'},
				{a: 'render', b: '单元格渲染函数', c: 'Function', d: '-', e: '注意绑定函数时用@符号，固定名称‘maskClick’,真实点击函数由anyClick提供',  key: 'd'}
			],
		}
	},
	methods: {
		toggleClick() {
			this.loading = !this.loading;
		},
		onSelect(record) {
			console.log('选择数据为：', record)
		},
		onRowClick(record) {
			console.log('点击行数据：', record)
		},
		footer(currentPageData) {
			return '<span>表格底部渲染</span>'
		},
		title(currentPageData) {
			return `<span>表格头部渲染：</span> 此页共<a>${currentPageData.length}</a>条数据`
		},
		expandedRowRender(record){
			return '姓名：' + record.a + '，年龄' + record.b + '岁，电话：' + record.c
		},
	},
	components: {
		demo,
		vueTable,
		vueButton
	}
}
</script>