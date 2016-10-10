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
	<div :class="['ant-table', classString]">
		
	</div>
	<page :all-num="allNum"></page>
</div>
</template>
<script type="text/javascript">
import vueTable from './vue-table'
import {flatArray} from '../../util/util'
import page from '../Page'
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
			const expandIconAsCell = this.expandedRowRender && this.expandIconAsCell !== false;

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
					col.sortOrder = order;
					this.sortOrder = order;
				}
			}else{
				if(this.currentSortCol) {
					let cacheCol = this.getColByKey(this.currentSortCol, localCols);
					if(this.sortOrder === order){
						// cacheCol.sortOrder = null;
						delete cacheCol.sortOrder
						col.sortOrder = order;
						this.currentSortCol = key;
					}else{
						// cacheCol.sortOrder = null;
						delete cacheCol.sortOrder;
						col.sortOrder = order;
						this.currentSortCol = key;
						this.sortOrder = order;
					}
				}else{
					col.sortOrder = order
					this.currentSortCol = key;
					this.sortOrder = order;
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
			if(sortFn){
				data = data.sort(sortFn)
			}
			//供给分页用
			this.itemdata = data;
			this.allNum = data.length

		}
	},
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
		this.initParams();
	},
	watch: {
		
	},
	components: {
		vueTable,
		page
	}
}
</script>