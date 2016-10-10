<template>
<div style="">
	<!-- <h2>table 基本使用</h2>
	<vue-table :columns="cols" 
	:itemdata="itemsdata" 
	></vue-table>
	<h2>Fixed columns 固定列的table</h2>
	<vue-table :columns="cols2" 
	:itemdata="itemsdata2" 
	:scroll="scroll"
	:expanded-row-render="hanshu"
	:expand-icon-as-cell="expandIconAsCell"
	></vue-table> -->
	<h2>table 简单演示</h2> 
	<!-- <vue-table :columns="cols3" 
	:itemdata="itemsdata3" 
	:expanded-row-render="hanshu"
	:expand-icon-as-cell="expandIconAsCell"
	:rows-height="rowsHeight"
	:use-fixed-header="t"
	></vue-table>
	<test ></test> -->
	<wrap-table
	:data-source="itemsdata3"
	:columns="cols3"
	:expand-icon-column-index="iconIndex"
	:on-select="onSelect"
	:row-selection="rowSelection"
	:size="size"
	>
	</wrap-table>
</div>
</template>
<script type="text/javascript">
import vueTable from './vue-table'
import test from '../test'
import wrapTable from './vue-wrapTable'
// import vueTableRow from './vue-tableRow'
export default {
	props: {
		wcd: null,
	},
	data () {
		return {
			
			size: 'large',//'middle','small'
			iconIndex: 2,
			t: true,
			scroll:{ x: 1400 },
			hanshu: (record) => record.title,
			expandIconAsCell:false,
			rowSelection: {selectedRowKeys: ['1', '3', '5']},
		/*
			// cols: [
			// 		{
			// 		  title: 'Name', dataIndex: 'name', key:'name', width: 100,
			// 		}, {
			// 		  title: 'Age', dataIndex: 'age', key:'age', width: 100,
			// 		}, {
			// 		  title: 'Address', dataIndex: 'address', key:'address', width: 200,
			// 		}, {
			// 		  title: 'Apeartions', dataIndex: '', key:'opeartions', render: () => '<a href="#">Delete</a>',}
			// ],
			// itemsdata: [
			// 			  { name: 'Jack', age: 28, address: 'some where', key:'1' },
			// 			  { name: 'Rose', age: 36, address: 'some where', key:'2' }
			// 			],
			// itemsdata2: [
			// 			  { a: '123', b: 'xxxxxxxx', d: 3, key: '1' },
			// 			  { a: 'cdd', b: 'edd12221', d: 3, key: '2' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '3' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '4' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '5' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '6' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '7' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '8' },
			// 			  { a: '133', c: 'edd12221', d: 2, key: '9' },
			// 			],
			// cols2: [
			// 		  { title: 'title1', dataIndex: 'a', key: 'a', width: 100, fixed: 'left' },
			// 		  { title: 'title2', dataIndex: 'b', key: 'b', width: 100, fixed: 'left' },
			// 		  { title: 'title3', dataIndex: 'c', key: 'c' },
			// 		  { title: 'title4', dataIndex: 'b', key: 'd' },
			// 		  { title: 'title5', dataIndex: 'b', key: 'e' },
			// 		  { title: 'title6', dataIndex: 'b', key: 'f' },
			// 		  { title: 'title7', dataIndex: 'b', key: 'g' },
			// 		  { title: 'title8', dataIndex: 'b', key: 'h' },
			// 		  { title: 'title9', dataIndex: 'b', key: 'i' },
			// 		  { title: 'title10', dataIndex: 'b', key: 'j' },
			// 		  { title: 'title11', dataIndex: 'b', key: 'k' },
			// 		  { title: 'title12', dataIndex: 'b', key: 'l', width: 100, fixed: 'right' },
			// 		],
		*/
			cols3: [
					  { title: 'title1', dataIndex: 'a', key: 'a', width: 100 },
					  { title: 'title2', dataIndex: 'b', key: 'b', width: 100 },
					  { title: 'title3', dataIndex: 'c', key: 'c' },
					  { title: 'title4', dataIndex: 'b', key: 'd' },
					  { title: 'title5', dataIndex: 'b', key: 'e' },
					  { title: 'title6', dataIndex: 'b', key: 'f',
					  render: () => '<div>div内容</div>'
					     },
					  { title: 'title7', dataIndex: 'c', key: 'g', canSorted: true},
					  { title: 'title8', dataIndex: 'a', key: 'h',  canSorted: true},
					  { title: 'title9', dataIndex: 'b', key: 'i',  },
					  { title: 'title10', dataIndex: 'b', key: 'j' },
					  { title: 'title11', dataIndex: 'b', key: 'k', },
					  { title: 'title12', dataIndex: 'b', key: 'l', width: 100, }
					],
			itemsdata3: [
						  { a: '9', b: 'xxxxxxxx', d: 3, key: '1' ,children: [{ key: 11,name: 'aa',age: 33,address: 'I am aa'}, {key: 12,name: 'ab',age: 33,address: 'I am ab',children: [{key: 121, name: 'aba',age: 33, address: 'I am aba'}]}]},
						  { a: '8', b: 'efds1', d: 3, key: '2' },
						  { a: '7', c: '1', d: 2, key: '3' },
						  { a: '6', c: '2', d: 2, key: '4' },
						  { a: '5', c: '3', d: 2, key: '5' },
						  { a: '4', c: '4', d: 2, key: '6' },
						  { a: '3', c: '5', d: 2, key: '7' },
						  { a: '2', c: '6', d: 2, key: '8' },
						  { a: '1', c: '7', d: 2, key: '9' },
						],
			rowsHeight: [ {key: '2', color: 'green'},{key: '1', color: 'red'}]
		}

	},
	methods: {
		onSelect() {
			console.log(this, '-------')
		}
	},
	watch: {
		ps() {
			console.log('ps 变化')
		}
	},
	components: {
		vueTable,
		test,
		wrapTable
	},
	created() {
		// console.log(this.wcd)
		// setTimeout(() => {
		// 	this.ps.filter((item) => item.k === 1)[0].v = 'mmm'
		// },4000)
	}
}
</script>