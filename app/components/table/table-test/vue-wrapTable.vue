<template>
<div :class="[clearfix, className ? className : '']">
	<div :class="clsName" :style="style">
	    <div class="ant-table-title" v-if="title" v-html="titleVHTML"></div>
	    <div class="ant-table-content">
	    	<div :class="isTableScroll">
        	<!-- {this.getTable()} -->
        		<span v-if="!useFixedHeader">
					<!-- useFixedHeader为假 主table-body -->
					<div v-if="isMainTableBody"
					class="ant-table-body"
					:style="bodyStyle"
					@mouseover="detectScrollTarget"
					@touchstart="detectScrollTarget"
					@scroll="handleBodyScroll"
					v-el:body-table
					>
						<table :class="tableClassName" :style="innerTableStyle">
								<colgroup>
							        <col v-if="expandIconAsCell && fixed !== 'right'"
							          class="ant-table-expand-icon-col"
							          key="ant-table-expand-icon-col"
							        ></col>
							        <col v-for="c in realCol"
							        key={{c.key}} 
							        :style="{width: c.width + 'px',minWidth: c.width + 'px'}">
							        </col>
						        </colgroup>
						        <thead v-if="showHeader"
						        class="ant-table-thead"}>
						        	<tr :style="headTrStyle">
						        		<!-- <th v-for="c in (culumns或当前的culumns)"
						        		key={c.key} colSpan={c.colSpan} className={c.className || ''} >{c.title}</th> -->
						        		<th v-if="hasCheckbox" style="text-align: center">
						        			<vue-checkbox @click="clickCheckbox"></vue-checkbox>
						        		</th>
						        		<th v-if="expandIconAsCell && fixed !== 'right'"
						        		key="ant-table-expandIconAsCell"
						        		class="ant-table-expand-icon-th">&nbsp;
						        		</th>
						        		<th v-for="c in columns"
						        		track-by="$index"
						        		v-if="c.colSpan != 0"
						        		key={{c.key}}
						        		colspan={{c.colSpan}}
						        		:class="[c.className,  (c.key === currentSortCol)? 'ant-table-column-sort': '']"
						        		>
						        			<span>
									          	{{c.title}}
									          	<div className="ant-table-column-sorter"
									          	v-if="c.canSorted">
										            <span 
										            :class="['ant-table-column-sorter-up', (c.sortOrder === 'ascend') ? 'on' : 'off']"
										              title="↑"
										              @Click="toggleSortOrder(c.key, 'ascend')"
										            >
										              <icon type="caret-up"></icon>
										            </span>
										            <span 
										            :class="['ant-table-column-sorter-down', (c.sortOrder === 'descend') ? 'on' : 'off']"
										              title="↓"
										              @Click="toggleSortOrder(c.key, 'descend')"
										            >
										              <icon type="caret-down"></icon>
										            </span>
										          </div>
									        </span>
						        		</th>
						        	</tr>
						      	</thead>
						      	<tbody class="ant-table-tbody">
							        <tr is="table-row"
										:indent="indent"
										:indent-size="indentSize"
										:need-indent-spaced="needIndentSpaced"
										:class-name="className"
										:record="model"
										:expand-icon-as-cell="expandIconAsCell"
										:on-destroy="onRowDestroy"
										:index="outerIndex"
										:visible="visible"
										:on-expand="onExpanded"
										:expandable="(childrenColumn || expandedRowRender)"
										:expanded="isRowExpanded"
										:children-column-name="childrenColumnName"
										:columns="columns"
										:expand-icon-column-index="expandIconColumnIndex"
										:on-row-click="onRowClick"
										:row-style="rowStyle"
										:on-hover="handleRowHover"
										key={{key}}
										:hover-key="key"
										:is-right-fixed-table="isRightFixedTable"
										:has-checkbox="hasCheckbox"
										:is-checked="isChecked"
										:on-select="onSelect"
									></tr>
							    </tbody>
						</table>
					</div>
				</span>
	        	<!-- {this.getFooter()} -->
	        	<div class="ant-table-footer" v-html="footerHtml">
	      		</div>
        	</div>
        </div>
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
			// data.forEach((d) => {console.log(Object.values(d), '前')})
			if(sortFn){
				data = data.sort(sortFn)
			}
			//供给分页用
			this.itemdata = data;
			this.allNum = data.length
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
	watch: {
		
	},
	components: {
		vueTable,
		page
	}
}
</script>