<!-- object:{ children: value, props: { colSpan: 1, rowSpan:1 } } ==> 'children' is the text of this cell, props is some setting of this cell, eg: 'colspan' set td colspan, 'rowspan' set td rowspan -->
<template>
	<span :class="className" @click="handleClick" v-if="show">
    </span>
</template>
<script>
export default {
	props: {
		record: Object,
		expandable: null,
		expanded: {
			type: Boolean,
			default: false
		},
		needIndentSpaced: Boolean,
		onExpand: Function
	},
	computed: {
		className () {
			let clsName = 'ant-table-expand-icon'
			if(this.expandable){
				const expandClassName = this.expanded ? 'expanded' : 'collapsed';
				return clsName + ` ant-table-row-${expandClassName}`
			}else if(this.needIndentSpaced){
				return clsName + ' ant-table-row-spaced'
			}
			return ''
		},
		show () {
			return this.expandable || this.needIndentSpaced
		}
	},
	methods: {
		handleClick() {
			if(this.expandable){
				this.onExpand(!this.expanded, this.record)
			}
		}
	},
}
</script>