<template>
<span v-if="useFixedHeader">
	<div
	class="rc-table-header"
	:style="headStyle"
	@mouseover="detectScrollTarget"
	@touchstart="detectScrollTarget"
	@scroll="handleBodyScroll"
	v-el:head-table
	>
		<table :class="tableClassName" :style="innerTableStyle">
			<colgroup>
		         <col v-if="expandIconAsCell && fixed !== 'right'"
		          class="rc-table-expand-icon-col"
		          key="rc-table-expand-icon-col"
		        ></col>
		        <col v-for="c in realCol"
		        key={{c.key}} 
		        :style="{width: c.width; minWidth: c.width}">
		        </col>
	        </colgroup>
	        <thead v-if="showHeader"
	        class="rc-table-thead"}>
	        	<tr :style="headTrStyle">
	        		<!-- <th v-for="c in (culumns或当前的culumns)"
	        		key={c.key} colSpan={c.colSpan} className={c.className || ''} >{c.title}</th> -->
	        		<th v-if="expandIconAsCell && fixed !== 'right'"
	        		key="rc-table-expandIconAsCell"
	        		class="rc-table-expand-icon-th">" "
	        		</th>
	        		<th v-for="c in columns"
	        		v-if="c.colSpan != 0"
	        		key={{c.key}}
	        		colspan={{c.colSpan}}
	        		class={{c.className}}>{{c.title}}
	        		</th>
	        	</tr>
	      	</thead>
	          
	    </table>
	</div>
	<div v-if="nullTableBody"
	class="rc-table-body"
	:style="bodyStyle"
	@mouseover="detectScrollTarget"
	@touchstart="detectScrollTarget"
	@scroll="handleBodyScroll"
	v-el:body-table
	>
	    <tbody class="rc-table-tbody">
	        <table-body v-for="(i,colmun) in columns"
		        :model="colmun"
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
	        ></table-body>
	    </tbody>
	</div>
	<div v-if="!nullTableBody" class="rc-table-body-outer" :style="bodyStyle">
		<div v-if="showRight"
		class="rc-table-body-inner"
		@mouseover="detectScrollTarget"
		@touchstart="detectScrollTarget"
		@scroll="handleBodyScroll"
		v-el:fixed-columns-body-left
		>
		    <tbody class="rc-table-tbody">
		        <table-body v-for="(i,colmun) in columns"
			        :model="colmun"
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
		        ></table-body>
		    </tbody>
		</div>
		<div v-if="showRight"
		class="rc-table-body-inner"
		@mouseover="detectScrollTarget"
		@touchstart="detectScrollTarget"
		@scroll="handleBodyScroll"
		v-el:fixed-columns-body-right
		>
		    <tbody class="rc-table-tbody">
		        <table-body v-for="(i,colmun) in columns"
			        :model="colmun"
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
		        ></table-body>
		    </tbody>
		</div>
	</div>
</span>	
</template>
<script type="text/javascript">
import tableBody from './vue-tableBody'
import {measureScrollbar, debounce} from '../../util/util.js'
export default {
	data() {
		return {
			TRUE: true,
			indent: 0,
			scrollPosition: 'left',
			nullTableBody: true,
			showRight: false
		}
	},
	props: {
		//EXTRA: expandIconAsCell getColGroup
		//		columns getColGroup (外部prop的columns)
		//		showHeader getHeader (外部showheader 是否展示header)
		//		fixedColumnsHeadRowsHeight getheader (外部state)
		
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
		isAnyColumnsFixed: null

	},
	computed: {
		headTrStyle() {
			return (this.fixedColumnsHeadRowsHeight[0] && this.columns) ? {height: fixedColumnsHeadRowsHeight[0]} : null;
		},
		realCol() {
			let cols = [];
			for(let c of this.realColumns){
				if(c.colSpan !== 0){
					cols.push(c)
				}
			}
			return cols			
		},
	},
	methods: {
		inintParams() {
			const { columns, fixed, prefixCls, scroll = {}} = this;
			console.log(columns, fixed, prefixCls, scroll, 'test---')
		    let useFixedHeader = this.useFixedHeader;
		    // const bodyStyle = { ...this.props.bodyStyle };
		    const bodyStyle = Object.assign({}, this.bodyStyle)
		    const headStyle = {};

		    let tableClassName = '';

			if (scroll.x || columns) {
		      	tableClassName = 'rc-table-fixed';
		     	bodyStyle.overflowX = bodyStyle.overflowX || 'auto';
		    }

		    if (scroll.y) {
		      	// maxHeight will make fixed-Table scrolling not working
		      	// so we only set maxHeight to body-Table here
		      	if (fixed) {
		        	bodyStyle.height = bodyStyle.height || scroll.y;
			    } else {
			        bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
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
		    if (!columns && scroll.x) {
		        // not set width, then use content fixed width
		        if (scroll.x === true) {
		          innerTableStyle.tableLayout = 'fixed';
		        } else {
		          innerTableStyle.width = scroll.x;
		        }
		    }
		    this.innerTableStyle = innerTableStyle;
		    this.headStyle = headStyle;
		    //set v-el 和显示的组件
		    if(this.columns && this.columns.length){
		    	delete bodyStyle.overflowX;
      			delete bodyStyle.overflowY;
				this.nullTableBody = false;
				if (columns[0].fixed === 'left' || columns[0].fixed === true) {
			        this.showRight = false
			    }else if (columns[0].fixed === 'right') {
			        this.showRight = true;
			    } 
			}
		},
		resetScrollY() {
			console.log(this.$els.headTable, this.$els, '----els')
			this.$els.headTable.scrollLeft = 0
			this.$els.bodyTable.scrollRight = 0
		},
		syncFixedTableRowHeight() {
		    const headRows = this.$els.headTable.querySelectorAll(`tr`) || [];
		    const bodyRows = this.$els.bodyTable.querySelectorAll('.rc-table-row') || [];
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
		    this.syncFixedTableRowHeight();
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
		    const { headTable, bodyTable, fixedColumnsBodyLeft, fixedColumnsBodyRight } = this.$els;
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
		      	if (fixedColumnsBodyLeft && e.target !== fixedColumnsBodyLeft) {
		        	fixedColumnsBodyLeft.scrollTop = e.target.scrollTop;
		      	}
		      	if (fixedColumnsBodyRight && e.target !== fixedColumnsBodyRight) {
		        	fixedColumnsBodyRight.scrollTop = e.target.scrollTop;
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
	},
	created() {
		console.log(this.useFixedHeader, 'useFixedHeader')
		console.log(this.columns, 'created')
		this.inintParams()
		this.update()
		
	},
	watch: {
		columns(val, oldval) {
			this.syncFixedTableRowHeight();
		}
	},
	beforeDestroy() {
		clearTimeout(this.timer);
	    if (this.resizeEvent) {
	      	this.resizeEvent.remove();
	    }
	},
	components: {
		tableBody
	}
}
</script>