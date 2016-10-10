<template>
<div :class="[clearfix, className ? className : '']">
	<!-- <vue-table
	:itemdata="itemdata"
	:columns="columns"
	:class-name="classString"
	:on-select="onSelect"
	:selected-row-keys="selectedRowKeys"
	:current-sort-col="currentSortCol">	
	</vue-table> -->
	<!--useFixedHeader-->	
	<vue-table
	v-ref:vue-table
	:itemdata="itemdata"
	:columns="columns"
	:class-name="classString"
	:on-select="onSelect"
	:selected-row-keys="selectedRowKeys"
	:current-sort-col="currentSortCol"
	:use-fixed-header="useFixedHeader"
	:title="title"
	:footer="footer"
	:expanded-row-render="expandRowRn"
	:expand-icon-column-index="expandIconColumnIndex"
	:expand-icon-as-cell="false"
	:special-rows="specialRows"
	:scroll="scroll"
	:on-row-click="onRowClick">	
	</vue-table>
	<div v-if="hasPagination" class="ant-pagination {{prefixCls}}-pagination">
	<!-- <div class="ant-pagination {{prefixCls}}-pagination"> -->
		<pagination 
		:total="allNum"
		:default-current="defaultCurrent"
		:page-size="pageSize"
		:on-change="pageChange">
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
			default: true
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
			default: true
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
		hasPagination: {
			type: Boolean,
			default: true
		},
		onRowClick: {
			type: Function,
			default: () => {}
		},
		//---
		specialRows: Array,
	},
	data() {
		return {
			expandIconColumnIndex: 0,
			expandRowRn: (record) => {return '<p>{record.description}</p>'},
			title: () => {return '表头'},
			footer: () => {return '表尾巴'},
			rowKey: 'key',
			//---------
			sortOrder: '', 
			itemdata: [],
			selectedRowKeys: [],
			currentSortCol: null,
			localData: null,
			defaultCurrent: 1,
			pageSize: 4,
			currentPage: null,
			//--------
			scroll: {x: 1400,y: 500}
		}
	},
	methods: {
		initRender() {
	      	this.pagination = {};
	    	this.selectedRowKeys = (this.rowSelection || {}).selectedRowKeys || [];
			this.getSortState();
			this.updateData()
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
			// this.updateData();
			this.updateSort()
			if(this.hasPagination){
				setTimeout(() => {this.$refs.vueTable.$refs.mainTable.syncChangeHeaderWidth()})
			}
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
		updateData() {
			this.updatePage();
			this.updateSort();
		},
		updateSort() {
			//优先使用localdata,它是本页数据
			let data = this.localData? this.localData: this.dataSource;
			data = data.slice(0);
			let sortFn = this.getSorterFn();
			if(sortFn){
				data = data.sort(sortFn);
			}
			//赋值itemdata,触发数据更新
			this.itemdata = data;
		},
		updatePage() {
			if(this.hasPagination){
				let data = this.dataSource;
				let currentPage = this.currentPage? this.currentPage: ((this.defaultCurrent === undefined) ? 1: this.defaultCurrent);
				this.currentPage = currentPage;
				let pageSize = (this.pageSize === undefined)? 10: this.pageSize;
				let pageData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
				this.allNum = data.length;
				this.localData = pageData;
			}			
		},
		pageChange(page) {
			this.currentPage = page;
			this.updateData()
			// 调整固定header适应table body,采用定时保证先把表格渲染出来之后再调整
			if(this.hasPagination){
				setTimeout(() => {this.$refs.vueTable.$refs.mainTable.syncChangeHeaderWidth()})
			}
			//换页清除 ‘全选’checkbox的状态
			this.selectedRowKeys = []
			this.$refs.vueTable.$refs.mainTable.selectPageAll = false;
			//处理scrollLeft不为0情况下换页，head的width不同步
			this.$refs.vueTable.$refs.mainTable.$els.bodyTable.scrollLeft = 0;

		},
		getSelectedRowKeys() {
			return this.selectedRowKeys
		},
		selectAll(toSelectAll) {
			this.selectedRowKeys = [];
			if(toSelectAll){
				this.itemdata.forEach((item) => {
					this.selectedRowKeys.push(item.key)
				})
			}
		}
	},
	computed: {
		classString() {
		    let clsString = `${this.prefixCls}-${this.size}`
		    if(this.bordered){
		    	clsString += ` ${this.prefixCls}-bordered`
		    }
		    return clsString
		}
	},
	created() {
		this.initRender();
	},

	watch: {
	},
	components: {
		vueTable,
		pagination
	}
}
</script>