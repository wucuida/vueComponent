<template>
<tr @click="handleClick"
@mouseenter="handleMouseEnter"
@mouseleave="handleMouseLeave"
class="ant-table-row {{className}} ant-table-row-level-{{indent}}"
:style="rowStyle"
v-show="visible">
	<td v-if="hasCheckbox" style="text-align: center">
		<vue-checkbox :checked="isChecked" @click="changeChecked"></vue-checkbox>
	</td>
	<td v-if="expandIconAsCell && (!isRightFixedTable)" 
	class="ant-table-row-expand-icon-cell" 
	key="ant-table-expand-icon-cell">
		<expand-icon :expandable="expandable"
		:expanded="expanded"
		:on-expand="onExpand"
		:need-indent-spaced="needIndentSpaced"
		:record="record">
		</expand-icon>
	</td>
	<td is="table-cell" 
	v-for="(k, v) in columns"
    :record="record"
    :indent-size="indentSize"
    :indent="indent"
    :index="index"
    :expandable="expandable"
    :on-expand="onExpand"
    :need-indent-spaced="needIndentSpaced"
    :expanded="expanded"
    :is-column-have-expand-icon="isRightFixedTable? false : (expandIconAsCell ? false : (k === expandIconColumnIndex))"
    :column="v" 
    >
	</td>
</tr>
</template>
<script type="text/javascript">
import tableCell from './vue-tableCell'
import expandIcon from './vue-expandicon'
import vueCheckbox from '../checkbox/vue-checkbox'
export default {
	props: {
		onRowClick: {
			type: Function,
			default: () => {}
		},
		onDestroy: {
			type: Function,
			default: () => {}
		},
		onHover: {
			type: Function,
			default: () => {}
		},
		record: Object,
		expandIconColumnIndex: {
			type: Number,
		},
		columns: Array,
		rowStyle: Object,
		visible: Boolean,
		index: Number,
		hoverKey: null,
		expanded: Boolean,
		expandable: null,
		onExpand: Function,
		needIndentSpaced: Boolean,
		className: String,
		indent: Number,
		indentSize: Number,
		expandIconAsCell: Boolean,
		isRightFixedTable: {
			type: Boolean,
			default: false
		},
		hasCheckbox: Boolean,
		isChecked: Boolean,
		onSelect: Function,
	},
	methods: {
		handleClick () {
			this.onRowClick(this.record, this.index)
		},
		handleMouseEnter () {
			this.onHover(true, this.hoverKey)
		},
		handleMouseLeave () {
			this.onHover(false, this.hoverKey)
		},
		changeChecked() {
			this.isChecked = !this.isChecked;

		},
		initRender() {
			if(this.isChecked && this.onSelect){
				console.log('该执行onselect了')
			}
		}
 	},
 	computed: {
 	},
	components: {
		tableCell,
		expandIcon,
		vueCheckbox
	},
	destroyed () {
		this.onDestroy(this.record)
	},
	watch: {
		isChecked(val, oldVal) {
			if(val && this.onSelect){
				this.onSelect.apply(this)
				console.log('watch中执行的onselelct')
			}
		}
	},
	created() {
		this.initRender()
	}
}
</script>