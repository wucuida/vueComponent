<template>
<div :class="[clearfix, className ? className : '']">
	<vue-table
	:itemdata="itemdata"
	:columns="columns"
	:class-name="classString"
	:on-select="onSelect"
	:selected-row-keys="selectedRowKeys"
	:current-sort-col="currentSortCol">		
	</vue-table>
	<div class="ant-pagination ant-table-pagination">
		<pagination 
		:total="allNum"
		:default-current="defaultCurrent"
		:page-size="pageSize">
		</pagination>
	</div>
</div>
</template>
<script type="text/javascript">
import vueTable from './vue-table'
import {flatArray} from '../../util/util'
import pagination from '../pagination/vue-pagination'
export default {
	props: {
		dataSource:{
			type: Array,
			default: []
		},
		columns: {
			type: Array,
			required: true
		},
		prefixCls: {
			type: String,
			default: 'ant-table'
		},
		useFixedHeader: {
			type: Boolean,
			default: false
		},
		rowSelection: {
			type: Object,
			default: () => {return {}}
		},
		className: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'large'
		},
		loading: {
			type: Boolean,
			default: false
		},
		bordered: {
			type: Boolean,
			default: false
		},
		onChange: {
			type: Function,
			default: () => {}
		},
		locale: {
			type: Object,
			default: () => {return {}}
		},
		onSelect: Function,
	},
	data() {
		return {
			rowKey: 'key',
			//---------
			sortStateFromColumns: {},
			filters: {},
			sortOrder: '', 
			sortColumn: [], 
			itemdata: [],
			selectionDirty: false,
			//
			selectedRowKeys: [],
			currentSortCol: null,
			defaultCurrent: 1,
			pageSize: 4
		}
	},
	methods: {
		//==============================
		initParams() {
	      	this.pagination = {};
	    	this.selectedRowKeys = (this.rowSelection || {}).selectedRowKeys || [];
			//初始化checkbox选项
			this.getSortState();
			this.updateSort()
			//--------
			// let itemdata = this.getCurrentPageData();
			// let columns = this.renderRowSelection(); //暂时舍弃
			const expandIconAsCell = this.expandedRowRender && this.expandIconAsCell !== false;

		  	// this.itemdata = itemdata;
		},
		getSortState() {
			let sortOrderCol = this.getSortOrderColumns().filter(col => 'sortOrder' in col)[0];
			if(sortOrderCol){
				this.currentSortCol = sortOrderCol.key;
				let sortOrder = sortOrderCol.sortOrder;
				if(sortOrder in ['ascend', 'descend']){
					this.sortOrder = sortOrder
					this.currentSortCol = sortOrderCol.key
				}
			}
			
		},
		getSortOrderColumns(columns) {
		    //含有能被sorted的
		    return (columns || this.columns || []).filter(column => {
		    	return 'canSorted' in column && column.canSorted
		    });
		},
		handleClickOrderIcon(key, order) {
			let localCols = []
			//另设相同的cols,为了解决array中Objcect里的数据变化，vue不响应的问题
			this.columns.forEach((item) => {localCols.push(Object.assign({}, item))})
			let col = this.getColByKey(key, localCols);
			if(key === this.currentSortCol){
				if(this.sortOrder === order){
					// col.sortOrder = null;
					delete col.sortOrder
					this.sortOrder = null;
					this.currentSortCol = null;
				}else{
					this.sortOrder = order;
					col.sortOrder = order;
				}
			}else{
				if(this.currentSortCol) {
					let cacheCol = this.getColByKey(this.currentSortCol, localCols);
					if(this.sortOrder === order){
						// cacheCol.sortOrder = null;
						delete cacheCol.sortOrder
						this.currentSortCol = key;
						col.sortOrder = order;
					}else{
						// cacheCol.sortOrder = null;
						delete cacheCol.sortOrder;
						this.currentSortCol = key;
						this.sortOrder = order;
						col.sortOrder = order;
					}
				}else{
					this.$set('currentSortCol', key);
					this.sortOrder = order;
					col.sortOrder = order
				}
			}
			this.columns = localCols;
			this.updateSort();
		},
		getColByKey(key, cols) {
			if(cols){
				return cols.filter((col) => col.key && col.key === key)[0]
			}
			return this.columns.filter((col) => col.key && col.key === key)[0]
		},
		getSorterFn() {
		    const key = this.currentSortCol;
		    const sortOrder = this.sortOrder;
		    if(key && sortOrder){
			    let sortColumn = this.getColByKey(key);
			    if(sortColumn && sortColumn.sorter){
			    	return (a, b) => {
				      	const result = sortColumn.sorter(a, b);
					    if (result !== 0) {
					        return (sortOrder === 'descend') ? -result : result;
					    }
					    return 0;
			    	};
			    }else{
			    	return (a, b) => {
			    		const k = this.getColByKey(key).dataIndex;
			    		let r = 0;
			    		if(a[k] !== undefined){
						    if(b[k] !== undefined){
						      	r = a[k]-b[k]
						    }else{
						      	r = -1
						    }
						}else{
						    if(b.k !== undefined){
						      	r = 1
						    }else{
						      	r = a.key-b.key
						    }
					  	}
				      	if (r !== 0) {
					        return (this.sortOrder === 'descend') ? -r : r;
					    }
					    return r
			    	};
			    }
			}
			return;	    
		},
		updateSort() {
			//根据currentSortCol & this.sortOrder
			let data = this.dataSource;
			data = data.slice(0);
			let sortFn = this.getSorterFn();
			// data.forEach((d) => {console.log(Object.values(d), '前')})
			if(sortFn){
				data = data.sort(sortFn)
			}
			//供给分页用
			// data = data.slice(this.cursor * this.limit, (this.cursor+1)*this.limit)
			this.itemdata = data;
			this.allNum = data.length
			console.log(this.allNum, '-----')
			// data.forEach((d) => {console.log(Object.values(d), '后')})

		}
	},
	// events: {
	// 	wcd(key,order) {
	// 		console.log('event success', key, order)
	// 		this.handleClickOrderIcon(key, order)
	// 	}
	// },
	computed: {
		classString() {
		    let clsString = `ant-table-${this.size}`
		    if(this.bordered){
		    	clsString += ' ant-table-bordered'
		    }
		    return clsString
		}
	},
	created() {
		// this.columns.forEach((col) => {console.log(Object.values(col), '未处理');})	
		this.initParams();
		// this.columns.forEach((col) => {console.log(Object.values(col), '处理hou');})
	},
	// events: {
	// 	changePage (cursor, limit) {
	// 		this.$set('cursor', cursor - 1);
	// 		this.$set('limit', limit);
	// 	},
	// }
	watch: {
	},
	components: {
		vueTable,
		pagination
	}
}
</script>