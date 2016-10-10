<template>
<div style="">
	<h2>table 简单演示</h2> 
	<wrap-table
	:data-source="itemsdata3"
	:columns="cols3"
	:expand-icon-column-index="iconIndex"
	:on-select="onSelect"
	:row-selection="rowSelection"
	:size="size"
	:special-rows="specialRows"
	:on-row-click="onRowClick"
	:expanded-row-keys="expandedRowKeys"
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
			expandedRowKeys: ['2'],
			size: 'large',//'middle','small'
			iconIndex: 2,
			t: true,
			scroll:{ x: 1400 },
			hanshu: (record) => record.title,
			expandIconAsCell:false,
			rowSelection: {selectedRowKeys: []},
			cols3: [
					  { title: 'title1', dataIndex: 'a', key: 'a', width: 100 , fixed: 'left'},
					  { title: 'title2', dataIndex: 'b', key: 'b', width: 100 ,fixed: 'left'},
					  { title: 'title3', dataIndex: 'c', key: 'c' },
					  { title: 'title4', dataIndex: 'b', key: 'd' },
					  { title: 'title5', dataIndex: 'b', key: 'e' },
					  { title: 'title6', dataIndex: 'b', key: 'f',
					  render: () => '<button @click="test">按钮</button>'
					     },
					  { title: 'title7', dataIndex: 'c', key: 'g', canSorted: true},
					  { title: 'title8', dataIndex: 'a', key: 'h',  canSorted: true},
					  { title: 'title9', dataIndex: 'b', key: 'i', 
					  // render: () => {return {
							// 			      children: '<a href="#">{text}</a>',
							// 			      props: {
							// 			        colSpan: 5,
							// 			      }
							// 			    }
							// 		}
					  },
					  { title: 'title10', dataIndex: 'b', key: 'j' },
					  { title: 'title11', dataIndex: 'b', key: 'k', className: 'red-backgroud' },
					  { title: 'title12', dataIndex: 'b', key: 'l', width: 100, fixed: 'right'}
					],
			itemsdata3: [
						  { a: '9', b: 'xxxxxxxx', d: 3, key: '1' ,children: [{ key: 11,name: 'aa',age: 33,address: 'I am aa'}, {key: 12,name: 'ab',age: 33,address: 'I am ab',children: [{key: 121, name: 'aba',age: 33, address: 'I am aba'}]}],
						  description: '描述key为1的内容'},

						  { a: '8', b: 'efds1', d: 3, key: '2', description: '描述key为2的内容' },
						  { a: '70', c: '1', d: 2, key: '3', description: '描述key为3的内容'},
						  { a: '6', c: '23333333', d: 2, key: '4', description: '描述key为4的内容'},
						  { a: '5', c: '3', d: 3333333332, key: '5', description: '描述key为5的内容'},
						  { a: '4', c: '433333333', d: 2, key: '6', description: '描述key为6的内容' },
						  { a: '3', c: '5', d: 2, key: '7', description: '描述key为7的内容'},
						  { a: '2', c: '6', d: 2, key: '8', description: '描述key为8的内容'},
						  { a: '1', c: '7', d: 2, key: '9', description: '描述key为9的内容'},
						],
			specialRows: [ {key: '2', color: 'green'},{key: '1', color: 'red'}]
		}

	},
	methods: {
		onSelect(record) {
			console.log(record, '-------')
		},
		onRowClick(record, index) {
			console.log(record, index)
		},
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
	}
}
</script>
<style type="text/css">
.red-backgroud{
	
}
</style>