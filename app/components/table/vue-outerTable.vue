<template>
<div :class="clsName" :style="style">
    <div class="ant-table-title" v-if="title" v-html="titleVHTML"></div>
    <div class="ant-table-content">
       <!--  <div class="ant-table-fixed-left" 
        v-if="leftFixedColumns && leftFixedColumns.length">
        	<table-container 
	        	v-ref:el-left-fixed 
	        	:item-data="itemdata" 
	        	:columns="leftFixedColumns" 
	        	:fixed="LEFT" 
	        	:scroll="scroll" 
	        	:use-fixed-header="useFixedHeader" 
	        	:body-style="bodyStyle" 
	        	:expand-icon-as-cell="expandIconAsCell" 
	        	:show-header="showHeader" 
	        	:fixed-columns-head-rows-height="fixedColumnsHeadRowsHeight" 
	        	:fixed-columns-body-rows-height="fixedColumnsBodyRowsHeight" 
	        	:children-column-name="childrenColumnName" 
	        	:expanded-row-keys="expandedRowKeys" 
	        	:expanded-row-render="expandedRowRender" 
	        	:row-key="rowKey" 
	        	:row-class-name="rowClassName" 
	        	:current-hover-key="currentHoverKey" 
	        	:expanded-row-class-name="expandedRowClassName" 
	        	:on-row-click="onRowClick" 
	        	:on-expanded-rows-change="onExpandedRowsChange" 
	        	:expand-icon-column-index="expandIconColumnIndex" 
	        	:on-expand="onExpand" 
	        	:need-indent-spaced="needIndentSpaced" 
	        	:indent-size="indentSize" 
	        	:is-any-columns-fixed="isAnyColumnsFixed"
	        	:special-rows="specialRows"
	        	:on-select="onSelect"
	        	:selected-row-keys="selectedRowKeys"
	        	:current-sort-col="currentSortCol">
        	</table-container>
        </div> -->
        <div :class="isTableScroll">
        	<!-- {this.getTable()} -->
			<table-container 
				v-if="columns.length"
				v-ref:main-table 
				:is-main-table-body="TRUE"
				:item-data="itemdata" 
				:columns="columns" 
				:fixed="" 
				:scroll="scroll" 
				:use-fixed-header="useFixedHeader" 
				:body-style="bodyStyle" 
				:expand-icon-as-cell="expandIconAsCell" 
				:show-header="showHeader" 
				:fixed-columns-head-rows-height="fixedColumnsHeadRowsHeight" 
				:fixed-columns-body-rows-height="fixedColumnsBodyRowsHeight" 
				:children-column-name="childrenColumnName" 
				:expanded-row-keys="expandedRowKeys" 
				:expanded-row-render="expandedRowRender" 
				:row-key="rowKey" :row-class-name="rowClassName" 
				:current-hover-key="currentHoverKey" 
				:expanded-row-class-name="expandedRowClassName" 
				:on-row-click="onRowClick" 
				:on-expanded-rows-change="onExpandedRowsChange" 
				:expand-icon-column-index="expandIconColumnIndex" 
				:on-expand="onExpand" 
				:need-indent-spaced="needIndentSpaced" 
				:indent-size="indentSize" 
				:is-any-columns-fixed="isAnyColumnsFixed"
				:special-rows="specialRows"
				:on-select="onSelect"
				:selected-row-keys="selectedRowKeys"
				:current-sort-col="currentSortCol"
				:has-checkbox="hasCheckbox">
			</table-container>
        	<!-- {this.getFooter()} -->
        	<div v-if="footer" class="ant-table-footer" v-html="footerHtml">
      		</div>
        </div>
        <!-- <div class="ant-table-fixed-right" 
        v-if="rightFixedColumns && rightFixedColumns.length">
        	<table-container 
	        	v-ref:right-fixed 
	        	:is-right-fixed-table="TRUE"
	        	:item-data="itemdata" 
	        	:columns="rightFixedColumns" 
	        	:fixed="RIGHT" 
	        	:scroll="scroll" 
	        	:use-fixed-header="useFixedHeader" 
	        	:body-style="bodyStyle" 
	        	:expand-icon-as-cell="expandIconAsCell" 
	        	:show-header="showHeader" 
	        	:fixed-columns-head-rows-height="fixedColumnsHeadRowsHeight" 
	        	:fixed-columns-body-rows-height="fixedColumnsBodyRowsHeight" 
	        	:children-column-name="childrenColumnName" 
	        	:expanded-row-keys="expandedRowKeys" 
	        	:expanded-row-render="expandedRowRender" 
	        	:row-key="rowKey" 
	        	:row-class-name="rowClassName" 
	        	:current-hover-key="currentHoverKey" 
	        	:expanded-row-class-name="expandedRowClassName" 
	        	:on-row-click="onRowClick" 
	        	:on-expanded-rows-change="onExpandedRowsChange" 
	        	:expand-icon-column-index="expandIconColumnIndex" 
	        	:on-expand="onExpand" 
	        	:need-indent-spaced="needIndentSpaced" 
	        	:indent-size="indentSize" 
	        	:is-any-columns-fixed="isAnyColumnsFixed"
	        	:special-rows="specialRows"
	        	:on-select="onSelect"
	        	:selected-row-keys="selectedRowKeys"
	        	:current-sort-col="currentSortCol">
        	</table-container>
        </div> -->
    </div>
 </div>
</template>
<script type="text/javascript">
import tableContainer from './vue-tableContainer'
export default {
	props: {
		className: [String, Object],
		itemdata: {
			type: Array,
			default: () => {return []}
		},
		expandIconAsCell: {
			type: Boolean,
			default: false
		},
		defaultExpandAllRows: {
			type: Boolean,
			default: false
		},
		expandedRowKeys: Array,
		defaultExpandedRowKeys: {
			type: Array,
			default: () => {return []}
		},
		expandedRowRender: {
			type: Function,
			default: () => {}
		},
		useFixedHeader: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Array,
			default: () => {return []}
		},
		bodyStyle: {
			type: Object,
			default: () => {return {}}
		},
		style: {
			type: Object,
			default: () => {return {}}
		},
		rowKey: {
			type: [String, Function],
			default: 'key'
		},
		rowClassName: {
			type: Function,
			default: () => {return ''}
		},
		expandedRowClassName: {
			type: Function,
			default: () => {return ''}
		},
		childrenColumnName: {
			type: String,
			default: 'children'
		},
		onExpand: {
			type: Function,
			default: () => {}
		},
		onExpandedRowsChange: {
			type: Function,
			default: () => {}
		},
		indentSize: {
			type: Number,
			default: 15
		},
		onRowClick: Function,
		columnsPageRange: Array,
		columnsPageSize: {
			type: Number,
			default: 5
		},
		expandIconColumnIndex: {
			type: Number,
		},
		showHeader: {
			type: Boolean,
			default: true
		},
		title: Function,
		footer: Function,
		scroll: {
			type: Object,
			default: () => {return {}}
		},
		rowRef: {
			type: Function,
			default: () => {return null}
		},
		getBodyWrapper: {
			type: Function,
			default: body => body
		},
		specialRows: Array,
		onSelect: Function,
		selectedRowKeys: Array,
		currentSortCol: String,
		hasCheckbox: Boolean,
	},
	data () {
		return {
			nullArray: [],
			currentColumnsPage: 0,
			scrollPosition: 'left',
			fixedColumnsHeadRowsHeight: [],
			fixedColumnsBodyRowsHeight: [],
			currentHoverKey: null,
			isAnyColumnsFixedCache: '',
			titleVHTML: '',
			TRUE: true,
			LEFT: 'left',
			RIGHT: 'right',
		}
	},
	methods: {
		initParams () {
			this.initExpandedRowKeys()
		    this.setColumnsFixedCache()
		},
		initExpandedRowKeys() {
			let rows = this.itemdata;
		    if (this.defaultExpandAllRows) {
		        for (let i = 0; i < rows.length; i++) {
		        	const row = rows[i];
		        	this.expandedRowKeys.push(this.getRowKey(row));
		        	rows = rows.concat(row[this.childrenColumnName] || []);
		        }
		    } else {
		        this.expandedRowKeys = this.expandedRowKeys || this.defaultExpandedRowKeys;
		    }
		},
		setColumnsFixedCache() {
			this.isAnyColumnsFixedCache = this.columns.some(column => !!column.fixed);
		},
		getRowKey (record, index) {
		    const rowKey = this.props.rowKey;
		    if (typeof rowKey === 'function') {
		        return rowKey(record, index);
		    }
		    return typeof record[rowKey] !== 'undefined' ? record[rowKey] : index;
		},
		isAnyColumnsFixed() {
		    if (this.isAnyColumnsFixedCache === '') {
		        this.setColumnsFixedCache();
		    	//this.setCurrentColumns()获取当前的带有属性、类名的列的dom（Array）。对这些元素的属性进行判断
		    	return this.isAnyColumnsFixedCache;
		    }else{
		    	return this.isAnyColumnsFixedCache;
		    }
		    
		},
		/*
		setCurrentColumns() {
		    let columns = this.columns;
		    let columnsPageRange = this.columnsPageRange;
		    let columnsPageSize = this.columnsPageSize;
		    let currentColumnsPage = this.currentColumnsPage;
		    if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
		        return 
		    }
		    let cols =  columns.map((column, i) => {
		        let newColumn = Object.assign({},column);
		        if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
		        	const pageIndexStart = columnsPageRange[0] + currentColumnsPage * columnsPageSize;
		        	let pageIndexEnd = columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
			        if (pageIndexEnd > columnsPageRange[1]) {
			          	pageIndexEnd = columnsPageRange[1];
			        }
			        if (i < pageIndexStart || i > pageIndexEnd) {
			          	newColumn.className = newColumn.className || '';
			          	newColumn.className += ' ant-table-column-hidden';
			        }
			        newColumn = this.wrapPageColumn(newColumn, (i === pageIndexStart), (i === pageIndexEnd));
		        }
		      	return newColumn;
		    });
		    this.$set('columns', cols)
		},
		wrapPageColumn(column, hasPrev, hasNext) {
			console.log(hasPrev, hasNext, 'ha','hasNext')
		    // const { prefixCls } = this.props;
		    // const { currentColumnsPage } = this.state;
		    const currentColumnsPage = this.currentColumnsPage;
		    const maxColumnsPage = this.getMaxColumnsPage();
		    let prevHandlerCls = 'ant-table-prev-columns-page';
		    if (currentColumnsPage === 0) {
		        prevHandlerCls += ' ant-table-prev-columns-page-disabled';
		    }
		    const prevHandler = '<span className={prevHandlerCls} onClick={this.prevColumnsPage}></span>';
		    let nextHandlerCls = ' ant-table-next-columns-page';
		    if (currentColumnsPage === maxColumnsPage) {
		      	nextHandlerCls += ' ant-table-next-columns-page-disabled';
		    }
		    const nextHandler = '<span className={nextHandlerCls} onClick={this.nextColumnsPage}></span>';
		    if (hasPrev) {
		      	column.title = '<span>{prevHandler}{column.title}一二三</span>';
		      	column.className = `${column.className || ''} ant-table-column-has-prev`;
		    }
		    if (hasNext) {
		      	column.title = '<span>{column.title}{nextHandler}</span>';
		      	column.className = `${column.className || ''} ant-table-column-has-next`;
		    }
		    return column;
		},
		getMaxColumnsPage() {
		    const { columnsPageRange, columnsPageSize } = this;
		    return Math.ceil((columnsPageRange[1] - columnsPageRange[0] + 1) / columnsPageSize) - 1;
		},**/
	},
	created () {
		this.initParams()
	},
	ready() {
		// console.log(this.$els.elLeftFixed, this.$els.elRightFixed, this.$els.elMainTable)
	},
	watch: {
		itemdata (val, oldval) {
			if(this.$refs.leftFixed){
				this.$refs.leftFixed.resetScrollY();
			}
			if(this.$refs.mainTable){
				this.$refs.mainTable.resetScrollY();
			}
			if(this.$refs.rightFixed){
				this.$refs.rightFixed.resetScrollY();
			}			
		},

	},
	computed: {
		clsName () {
			let clsName = 'ant-table ';
			if(this.className){
				clsName += this.className
			}
			if(this.columnsPageRange){
				clsName += ' ant-table-columns-paging'
			}
			if(this.useFixedHeader || (this.scroll && this.scroll.y)){
				clsName += ' ant-table-fixed-header'
			}
			clsName += ` ant-table-scroll-position-${this.scrollPosition}`
			// const isTableScroll = this.isAnyColumnsFixed() || this.scroll.x || this.scroll.y;
			return clsName
		},
		isTableScroll() {
			if(this.isAnyColumnsFixed() || this.scroll.x || this.scroll.y){
				return 'ant-table-scroll'
			}
			return ''
		},
		titleVHTML () {
			if(this.title){
				return this.title(this.itemdata)
			}
		},
		needIndentSpaced() {
			return this.itemdata.some(record => record[this.childrenColumnName])
		},
		leftFixedColumns() {
		    const cols = this.columns.filter(
		      	column => column.fixed === 'left' || column.fixed === true
		    );
			return cols
		},
		rightFixedColumns() {
			const cols = this.columns.filter(
		      	column => column.fixed === 'right'
		    );
		    return cols
		},
		footerHtml() {
			if(this.footer){
				return this.footer(this.itemdata)
			}
			return null
		},
	},
	components: {
		tableContainer
	}
}
</script>
