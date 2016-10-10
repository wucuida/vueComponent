<template>
<span v-if="useFixedHeader">
	<!-- useFixedHeader为真  -->
	<div
	class="ant-table-header"
	:style="headStyle"
	@mouseover="detectScrollTarget"
	@touchstart="detectScrollTarget"
	@scroll="handleBodyScroll"
	v-el:head-table
	>
		<table :class="tableClassName" :style="innerTableStyle">
			<colgroup>
		        <col v-if="expandIconAsCell && fixed !== 'right'"
		          class="ant-table-expand-icon-col"
		          key="ant-table-expand-icon-col"
		        ></col>
		        <col v-for="c in realCol"
		        key={{c.key}} 
		        :style="{width: c.width + 'px',minWidth: c.width + 'px'}" 
		        >
		        </col>
	        </colgroup>
	        <thead v-if="showHeader"
	        class="ant-table-thead"}>
	        	<tr :style="headTrStyle">
	        		<!-- <th v-for="c in (culumns或当前的culumns)"
	        		key={c.key} colSpan={c.colSpan} className={c.className || ''} >{c.title}</th> -->
	        		<th v-if="hasCheckbox"  style="text-align: center">
	        			<vue-checkbox @click="clickCheckbox" :checked="selectPageAll"></vue-checkbox>
	        		</th>
	        		<th v-if="expandIconAsCell && fixed !== 'right'"
	        		key="ant-table-expandIconAsCell"
	        		class="ant-table-expand-icon-th">&nbsp;
	        		</th>
	        		<th v-for="c in columns"
	        		v-if="c.colSpan != 0"
	        		key={{c.key}}
	        		colspan={{c.colSpan}}
	        		:class="[c.className,  (c.key === currentSortCol)? 'ant-table-column-sort': '']">
	        			<span>
					          	{{c.title}}
					          	<div class="ant-table-column-sorter"
					          	v-if="c.canSorted">
						            <span 
						            :class="['ant-table-column-sorter-up', c.sortOrder === 'ascend' ? 'on' : 'off']"
						              title="↑"
						              @Click="toggleSortOrder(c.key, 'ascend')"
						            >
						              <icon type="caret-up"></icon>
						            </span>
						            <span 
						            :class="['ant-table-column-sorter-down', c.sortOrder === 'descend' ? 'on' : 'off']"
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
	          
	    </table>
	</div>
	<!-- columns 主table-body  -->
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
		        :style="{width: c.width + 'px',minWidth: c.width + 'px'}" >
		        </col>
	        </colgroup>
		    <tbody class="ant-table-tbody">
		        <tr is='table-body' v-for="(i,item) in itemData"
			        :model="item"
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
			        :visible="TRUE"
			        :on-expand="onExpand"
			        :need-indent-spaced="needIndentSpaced"
			        :indent="indent"
			        :indent-size="indentSize"
			        :expand-icon-as-cell="expandIconAsCell"
			        :special-rows="specialRows"
			        :has-checkbox="hasCheckbox"
			        :is-checked="selectAllCheckbox || (selectedRowKeys.indexOf(getRowKey(item, i)) !== -1)"
			        :on-select="onSelect"
		        ></tr>
		    </tbody>
		</table>
	</div>
	<!-- columns 左/右固定 -->
	<!-- <div v-if="columns.length && (!isMainTableBody)" 
	class="ant-table-body-outer" 
	:style="bodyStyle">
		<div
		class="ant-table-body-inner"
		@mouseover="detectScrollTarget"
		@touchstart="detectScrollTarget"
		@scroll="handleBodyScroll"
		v-el:fixed-columns-body-left-or-right
		>	<table :class="tableClassName">
				<colgroup>
			         <col v-if="expandIconAsCell && fixed !== 'right'"
			          class="ant-table-expand-icon-col"
			          key="ant-table-expand-icon-col"
			        ></col>
			        <col v-for="c in realCol"
			        key={{c.key}} 
			        :style="{width: c.width + 'px',minWidth: c.width + 'px'}" >
			        </col>
		        </colgroup>
			    <tbody class="ant-table-tbody">
			        <tr is='table-body' v-for="(i,item) in itemData"
				        :model="item"
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
				        :visible="TRUE"
				        :on-expand="onExpand"
				        :need-indent-spaced="needIndentSpaced"
				        :indent="indent"
				        :indent-size="indentSize"
				        :expand-icon-as-cell="expandIconAsCell"
			        	:is-right-fixed-table="isRightFixedTable"
			        	:special-rows="specialRows"
			        	:has-checkbox="hasCheckbox"
			        	:is-checked="selectAllCheckbox || (selectedRowKeys.indexOf(getRowKey(item, i)) !== -1)"
			        	:on-select="onSelect"
			        ></tr>
			    </tbody>
			</table>
		</div>
	</div> -->
</span>	
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
		        			<vue-checkbox @click="clickCheckbox" :checked="selectPageAll"></vue-checkbox>
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
					          	<div class="ant-table-column-sorter"
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
			        <tr is='table-body' v-for="(i,item) in itemData"
				        :model="item"
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
				        :visible="TRUE"
				        :on-expand="onExpand"
				        :need-indent-spaced="needIndentSpaced"
				        :indent="indent"
				        :indent-size="indentSize"
				        :expand-icon-as-cell="expandIconAsCell"
				        :special-rows="specialRows"
				        :has-checkbox="hasCheckbox"
				        :is-checked="selectAllCheckbox || (selectedRowKeys.indexOf(getRowKey(item, i)) !== -1)"
				        :on-select="onSelect"
			        ></tr>
			    </tbody>
		</table>
	</div>
	<!-- useFixedHeader为假 左/右固定 -->
	<!-- <div v-if="columns.length && (!isMainTableBody)" 
	class="ant-table-body-outer" :style="bodyStyle">

		<div
		class="ant-table-body-inner"
		@mouseover="detectScrollTarget"
		@touchstart="detectScrollTarget"
		@scroll="handleBodyScroll"
		v-el:fixed-columns-body-left-or-right>
			<table :class="tableClassName">
				<colgroup>
			        <col v-if="expandIconAsCell && fixed !== 'right'"
			          class="ant-table-expand-icon-col"
			          key="ant-table-expand-icon-col"
			        ></col>
			        <col v-for="c in realCol"
			        key={{c.key}} 
			        :style="{width: c.width + 'px',minWidth: c.width + 'px'}"
			        >
			        </col>
		        </colgroup>
		        <thead v-if="showHeader"
		        class="ant-table-thead"}>
		        	<tr :style="headTrStyle">
		        		<th v-if="hasCheckbox" style="text-align: center">
		        			<vue-checkbox @click="clickCheckbox"></vue-checkbox>
		        		</th>
		        		<th v-if="expandIconAsCell && fixed !== 'right'"
		        		key="ant-table-expandIconAsCell"
		        		class="ant-table-expand-icon-th">&nbsp;
		        		</th>
		        		<th v-for="c in columns"
		        		v-if="c.colSpan != 0"
		        		key={{c.key}}
		        		colspan={{c.colSpan}}
		        		:class="[c.className,  (c.key === currentSortCol)? 'ant-table-column-sort': '']">
		        			<span>
					          	{{c.title}}
					          	<div class="ant-table-column-sorter"
					          	v-if="c.canSorted">
						            <span 
						            :class="['ant-table-column-sorter-up', c.sortOrder === 'ascend' ? 'on' : 'off']"
						              title="↑"
						              @Click="toggleSortOrder(c.key, 'ascend')"
						            >
						              <icon type="caret-up"></icon>
						            </span>
						            <span 
						            :class="['ant-table-column-sorter-down', c.sortOrder === 'descend' ? 'on' : 'off']"
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
			        <tr is='table-body' v-for="(i,item) in itemData"
				        :model="item"
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
				        :visible="TRUE"
				        :on-expand="onExpand"
				        :need-indent-spaced="needIndentSpaced"
				        :indent="indent"
				        :indent-size="indentSize"
				        :expand-icon-as-cell="expandIconAsCell"
			        	:is-right-fixed-table="isRightFixedTable"
			        	:special-rows="specialRows"
			        	:has-checkbox="hasCheckbox"
			        	:is-checked="selectAllCheckbox || (selectedRowKeys.indexOf(getRowKey(item, i)) !== -1)"
			        	:on-select="onSelect"
			        ></tr>
			    </tbody>
			</table>
		</div>
	</div> -->
</span>
</template>
<script type="text/javascript">
import tableBody from './vue-tableBody'
import icon from '../icon/vue-icon'
import vueCheckbox from '../checkbox/vue-checkbox'
import {measureScrollbar, debounce} from '../../util/util.js'
export default {
	data() {
		return {
			TRUE: true,
			indent: 0,
			scrollPosition: 'left',
			hasCheckbox: true,
			selectAllCheckbox: false,
			selectPageAll: false,
			// selectedRowKeys: ['1','2']
		}
	},
	props: {
		//EXTRA: expandIconAsCell getColGroup
		//		columns getColGroup (外部prop的columns)
		//		showHeader getHeader (外部showheader 是否展示header)
		//		fixedColumnsHeadRowsHeight getheader (外部state)
		itemData: Array,
		columns: Array,
		fixed: [String, Boolean],
		scroll: Object,
		useFixedHeader: Boolean,
		bodyStyle: Object,
		expandIconAsCell: Boolean,
		showHeader: Boolean,
		fixedColumnsHeadRowsHeight: Array,
		fixedColumnsBodyRowsHeight:Array,
		//table-body所需要的参数
		childrenColumnName: String,
		expandedRowKeys: Array,
		expandedRowRender: Function,
		rowKey: [String, Function],
		rowClassName: Function,
		currentHoverKey: null,
		expandedRowClassName: Function,
		onRowClick: Function,
		onExpandedRowsChange: Function,
		expandIconColumnIndex: Number,
		onExpand: Function,
		needIndentSpaced: Boolean,
		indentSize: Number,
		isAnyColumnsFixed: null,
		//
		isMainTableBody: {
			type: Boolean,
			default: false
		},
		isRightFixedTable: {
			type: Boolean,
			default: false
		},
		specialRows: Array,
		onSelect: Function,
		selectedRowKeys: {
			type: Array,
			default: () => {return []}
		},
		//需要外部的{sortedcol:_, sortorder:_ }
		currentSortCol: String,

	},
	computed: {
		headTrStyle() {
			return (this.fixedColumnsHeadRowsHeight[0] && this.columns) ? {height: fixedColumnsHeadRowsHeight[0]} : null;
		},
		realCol() {
			let cols = [];
			for(let c of this.columns){
				if(c.colSpan !== 0){
					cols.push(c)
				}
			}
			return cols			
		},
		// currentSortCol() {
		// 	//当前被sort的列的key
		// }
	},
	methods: {
		initParams() {
			const { columns, fixed, prefixCls, scroll = {}} = this;
		    let useFixedHeader = this.useFixedHeader;
		    // const bodyStyle = { ...this.props.bodyStyle };
		    const bodyStyle = Object.assign({}, this.bodyStyle)
		    const headStyle = {};

		    let tableClassName = '';

			if (scroll.x || columns) {
		      	tableClassName = 'ant-table-fixed';
		     	bodyStyle.overflowX = bodyStyle.overflowX || 'auto';
		    }

		    if (scroll.y) {
		      	// maxHeight will make fixed-Table scrolling not working
		      	// so we only set maxHeight to body-Table here
		      	if (fixed) {
		        	bodyStyle.height = bodyStyle.height || scroll.y;
			    } else {
			        bodyStyle["max-height"] = (bodyStyle["max-height"] || scroll.y) + 'px';
			    }
			    bodyStyle.overflowY = bodyStyle.overflowY || 'scroll';
			    useFixedHeader = true;

			    // Add negative margin bottom for scroll bar overflow bug
			    const scrollbarWidth = measureScrollbar();
			    if (scrollbarWidth > 0) {
			    	(fixed ? bodyStyle : headStyle).marginBottom = `-${scrollbarWidth}px`;
			        (fixed ? bodyStyle : headStyle).paddingBottom = '0px';
			    }
		    }
		    //
		    const innerTableStyle = {};
		    if (this.isMainTableBody && scroll.x) {
		        // not set width, then use content fixed width
		        if (scroll.x === true) {
		          innerTableStyle.tableLayout = 'fixed';
		        } else {
		          innerTableStyle.width = scroll.x + 'px';
		        }
		    }
		    
		    if(!this.isMainTableBody){
		    	delete bodyStyle.overflowX
		    	delete bodyStyle.overflowY
		    }
		    this.tableClassName = tableClassName
		    this.innerTableStyle = innerTableStyle;
		    this.headStyle = headStyle;
		    this.bodyStyle = bodyStyle;
		    // console.log(this.innerTableStyle, this.headStyle)
		    // console.log(this.bodyStyle, 'this.bodyStyle')
		    //set v-el 和显示的组件
		 //    if(this.columns && this.columns.length){
		 //    	delete bodyStyle.overflowX;
       		//	delete bodyStyle.overflowY;
			// 	if (columns[0].fixed === 'left' || columns[0].fixed === true) {
			//         this.showRight = false
			//     }else if (columns[0].fixed === 'right') {
			//         this.showRight = true;
			//     } 
			// }
		},
		resetScrollY() {
			if(this.useFixedHeader){
				this.$els.headTable.scrollLeft = 0 
			}
			if(this.columns.length){
				this.$els.bodyTable.scrollRight = 0
			}
		},
		syncFixedTableRowHeight() {
		    // const headRows = this.$els.headTable.querySelectorAll(`tr`) || [];
		    // const bodyRows = this.$els.bodyTable.querySelectorAll('.ant-table-row') || [];
		    const headRows = this.$els.headTable ? this.$els.headTable.querySelectorAll(`tr`) : [];
			const bodyRows = this.$els.bodyTable.querySelectorAll('.ant-table-row') || [];
		    const fixedColumnsHeadRowsHeight = [].map.call(
		      	headRows, row => row.getBoundingClientRect().height || 'auto'
		    );
		    const fixedColumnsBodyRowsHeight = [].map.call(
		     	bodyRows, row => row.getBoundingClientRect().height || 'auto'
		    );
		    if (shallowequal(this.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) &&
		        shallowequal(this.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
		      	return;
		    }
		    this.timer = setTimeout(() => {
		      	this.fixedColumnsHeadRowsHeight = fixedColumnsHeadRowsHeight;
		      	this.fixedColumnsBodyRowsHeight = fixedColumnsBodyRowsHeight;
		    });
		},
		update() {
			this.resetScrollY();
		    // this.syncFixedTableRowHeight();
		    if (this.isAnyColumnsFixed) {
			      	this.resizeEvent = addEventListener(
			        window, 'resize', debounce(this.syncFixedTableRowHeight, 150)
		      	);
		    }
		},
		handleBodyScroll(e) {
		    // Prevent scrollTop setter trigger onScroll event
		    // http://stackoverflow.com/q/1386696
		    if (e.target !== this.scrollTarget) {
		      	return;
		    }

		    const { scroll = {} } = this;
		    const { headTable, bodyTable} = this.$els;
		    if (scroll.x) {
		      	if (e.target === bodyTable && headTable) {
		        	headTable.scrollLeft = e.target.scrollLeft;
		      	} else if (e.target === headTable && bodyTable) {
		        	bodyTable.scrollLeft = e.target.scrollLeft;
		      	}
		      	if (e.target.scrollLeft === 0) {
		        	this.$set('scrollPosition', 'left');
		      	} else if (e.target.scrollLeft + 1 >= e.target.children[0].getBoundingClientRect().width -
		        	e.target.getBoundingClientRect().width) {
		        	this.$set('scrollPosition', 'right');
		      	} else if (this.scrollPosition !== 'middle') {
		        	this.$set('scrollPosition', 'middle');
		      	}
		    }
		    if (scroll.y) {
		    	if(this.columns && this.columns.length){
		    		let leftOrR = this.$els.fixedColumnsBodyLeftOrRight;
		        	if (leftOrR && e.target !== leftOrR) {
			        	leftOrR.scrollTop = e.target.scrollTop;
			      	}
		    	}
		      	if (bodyTable && e.target !== bodyTable) {
		        	bodyTable.scrollTop = e.target.scrollTop;
		      	}
		    }
		},
		detectScrollTarget(e) {
		    if (this.scrollTarget !== e.currentTarget) {
		      	this.scrollTarget = e.currentTarget;
		    }
		},
		toggleSortOrder(key, order) {
			this.$parent.$parent.handleClickOrderIcon(key, order)
		},
		getRowKey(record, index) {
		    const rowKey = this.rowKey;
		    if (typeof rowKey === 'function') {
		      	return rowKey(record, index);
		    }
		    return typeof record[rowKey] !== 'undefined' ? record[rowKey] : index;
		},
		clickCheckbox() {
			if(this.selectPageAll){
				this.$parent.$parent.selectAll(false);
				this.selectPageAll = false
			}else{
				this.$parent.$parent.selectAll(true);
				this.selectPageAll = true
			}
			
			// this.$parent.selectedRowKeys = []
			// this.selectAllCheckbox = !this.selectAllCheckbox;
		},
		syncChangeHeaderWidth() {
			if(this.useFixedHeader){
				const headThs = this.$els.headTable.querySelectorAll('th') || [];
				const bodyTds = this.$els.bodyTable.querySelectorAll('tr')[0].querySelectorAll('td')|| [];
				//http://zhang-xiao.github.io/2015/09/15/js%E5%9B%BA%E5%AE%9A%E8%A1%A8%E5%A4%B4/
				// headThs[0].width = 200 + 'px'
				headThs.forEach((th, index) => {
					th.width = bodyTds[index].getBoundingClientRect().width + 'px'
				})
			}
		}
	},
	created() {
		// this.columns.forEach((col) => {console.log(Object.values(col), '未处理');})	
		if(this.columns && this.columns.length){
			this.initParams()	
		}
		
	},
	ready() {
		// this.update()
		// console.log(this.isMainTableBody)
		// console.log(this.useFixedHeader)
		// console.log(this.$els.headTable, this.$els.bodyTable)
		//同步调整header列的宽度和table body相适应
		this.syncChangeHeaderWidth()
	},
	watch: {
		columns(val, oldval) {
			// this.initParams()
			// this.syncFixedTableRowHeight();
		},
		scrollPosition(val, oldval){
			this.$parent.scrollPosition = val;
		},
		currentSortCol(val, oldVal){
		}

	},
	beforeDestroy() {
		clearTimeout(this.timer);
	    if (this.resizeEvent) {
	      	this.resizeEvent.remove();
	    }
	},
	components: {
		tableBody,
		icon,
		vueCheckbox,
	}
}
</script>
<style>
/*::-webkit-scrollbar {
    height: 12px;
    width: 12px;
}

::-webkit-scrollbar-thumb {
    background: #66152f;
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

::-webkit-scrollbar-corner {
    background: #fff;
}*/
</style>