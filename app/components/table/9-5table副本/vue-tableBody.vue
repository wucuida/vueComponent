<template>
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
<tr v-if="showExtra"
key={{`${key}-extra-row`}}
:style="showExtraStyle"
:class="extraTrClass"
>
   	<td v-if="expandIconAsCell && fixed !== 'right'"
   		key="ant-table-expand-icon-placeholder" >
   	</td>
	<td colSpan={{columns.length}}>
		{{msg}}
	  <!-- {fixed !== 'right' ? expandedRowContent : '&nbsp;'}
		} -->
	</td>
</tr>
<table-body v-if="hasChildren"
	v-for="(i,col) in childrenColumn"
	:model="col"
	:children-column-name="childrenColumnName"
	:expanded-row-keys="expandedRowKeys"
	:expanded-row-render="expandedRowRender"
	:outer-index="i"
	:row-key="rowKey"
	:row-class-name="rowClassName"
	:current-hover-key="currentHoverKey"
	:fixed="fixed"
	:fixed-columns-body-rows-height="fixedColumnsBodyRowsHeight"
	:expanded-row-class-name="expandedRowClassName"
	:on-row-click="onRowClick"
	:expand-icon-column-index="expandIconColumnIndex"
	:columns="columns"
	:visible="subVisible"
	:on-expand="onExpand"
	:need-indent-spaced="needIndentSpaced"
	:indent="indent+1"
	:indent-size="indentSize"
	:expand-icon-as-cell="expandIconAsCell"
	:has-checkbox="hasCheckbox"
></table-body>
</template>
<script type="text/javascript">
import tableRow from './vue-tableRow'
import Vue from 'vue'
export default {
	name: 'table-body',
	props: {
		model: Object,
		childrenColumnName: String,//'children'
		expandedRowKeys: Array,
		expandedRowRender: Function,
		outerIndex: Number,//for循环的i
		rowKey: {
			type: [String, Function],
		},
		rowClassName: {
			type: Function,
			default: () => {return ''}
		},
		currentHoverKey: null,
		fixed: [String, Boolean],
		fixedColumnsBodyRowsHeight: Array,
		expandedRowClassName: Function,
		//-----------
		onRowClick: {
			type: Function,
			default: () => {}
		},
		expandIconColumnIndex: {
			type: Number,
		},
		columns: Array,
		visible: Boolean,
		onExpand: Function,
		needIndentSpaced: Boolean,
		indent: Number,
		indentSize: Number,
		expandIconAsCell: Boolean,
		isRightFixedTable: {
			type: Boolean,
			default: false
		},
		specialRows: Array,
		hasCheckbox: Boolean,
		isChecked: Boolean,
		onSelect: Function,
	},
	data () {
		return {
			msg: ' ',
			special: {},
		}
	},
	computed: {
		hasChildren () {
			return !!this.model[this.childrenColumnName]
		},
		childrenColumn() {
			return this.model[this.childrenColumnName];
		},
		key () {
			return this.getRowKey(this.model, this.outerIndex)
		},
		className () {
			let className = this.rowClassName(this.model, this.outerIndex);
		    const key = this.getRowKey(this.model, this.outerIndex);
		    if (this.currentHoverKey === key) {
		        className += ' ant-table-row-hover';
		        
		    }else{
		    	if((this.outerIndex % 2) === 1){
		    		className += ' ant-table-row-odd'
		    	}
		    }
		    
		    return className
		},
		rowStyle () {
			const style = (this.fixed && this.fixedColumnsBodyRowsHeight[this.outerIndex]) ? {
		        height: this.fixedColumnsBodyRowsHeight[this.outerIndex],
		    } : {};
		    let allStyle;
		    if(Object.keys(this.special).length){
		    	allStyle = Object.assign(style, this.special)
		    }
		    return allStyle
		},
		showExtraStyle() {
			if(this.subVisible){
				return {display: ''}
			}
			return {display: 'none'}
		},
		subVisible () {
			return this.visible && this.isRowExpanded
		},
		extraTrClass() {
			const cls = this.expandedRowClassName(this.model, this.outerIndex)
			return `ant-table-row-expanded-row ${cls}`
		},
	},
	methods: {
		isRowExpanded(record) {
		    return typeof this.findExpandedRow(record) !== 'undefined';
		},
		findExpandedRow(record) {
		    const rows = this.expandedRowKeys.filter(i => i === this.getRowKey(record));
		    return rows[0];
		},
		getRowKey(record, index) {
		    const rowKey = this.rowKey;
		    if (typeof rowKey === 'function') {
		      	return rowKey(record, index);
		    }
		    return typeof record[rowKey] !== 'undefined' ? record[rowKey] : index;
		},
		handleRowHover(isHover, key) {
		    this.currentHoverKey = isHover ? key : null
		},
		onRowDestroy(record) {
		    const expandedRows = this.expandedRowKeys.concat();
		    const rowKey = this.getRowKey(record);
		    let index = -1;
		    expandedRows.forEach((r, i) => {
		        if (r === rowKey) {
		        	index = i;
		        }
		    });
		    if (index !== -1) {
		      expandedRows.splice(index, 1);
		    }
		    // this.onExpandedRowsChange(expandedRows);
		    if (!this.expandedRowKeys) {
		      	this.$set('expandedRowKeys', expandedRows)
		    }
		    // this.onExpandedRowsChange(expandedRows)
		},
		onExpanded(expanded, record) {
		    const info = this.findExpandedRow(record);
		    if (typeof info !== 'undefined' && !expanded) {
		      this.onRowDestroy(record);
		    } else if (!info && expanded) {
		      	const expandedRows = this.expandedRowKeys.concat();
		      	expandedRows.push(this.getRowKey(record));
		      	// this.onExpandedRowsChange(expandedRows);
		      	if (!this.expandedRowKeys) {
		      		this.$set('expandedRowKeys', expandedRowKeys);
		    	}
		    	// this.onExpandedRowsChange(expandedRowKeys);
		    }
		    this.onExpand(expanded, record);
		},
		// onExpandedRowsChange(expandedRowKeys) {
		//     if (!this.expandedRowKeys) {
		//       	this.$setState('expandedRowKeys', expandedRowKeys);
		//     }
		//     this.props.onExpandedRowsChange(expandedRowKeys);
		// },
		initParams() {
			this.checkSpecialRow()
			const isRowExpanded = this.isRowExpanded(this.model)
			let expandedRowContent;
			if (this.expandedRowRender && isRowExpanded) {
	        	expandedRowContent = this.expandedRowRender(this.model, this.outerIndex);
	      	}
	      	if(this.fixed !== 'right'){
	      		this.msg = expandedRowContent
	      	}
	      	this.isRowExpanded = isRowExpanded;
	      	this.expandedRowContent = expandedRowContent;
			this.showExtra =  expandedRowContent && isRowExpanded
		},
		checkSpecialRow() {
			if(this.specialRows && this.specialRows.length){
				const key = this.getRowKey(this.model, this.outerIndex)
				for(let r of this.specialRows){
					if(key === r.key){
						this.special = r;
						break;
					}
				}
			}
		}
	},
	created () {
		this.initParams();
		// console.log(this.expandedRowKeys, 'body expandedRowKeys')空array
	},
	components: {
		tableRow
	}
}
// Vue.component('table-body', tableBody)
// export {tableBody as default}
</script>