<template>
<td v-if="(merge.colSpan !== 0) && (merge.rowSpan !== 0)"
colspan={{merge.colSpan}} 
rowspan={{merge.rowSpan}} 
:class="column.className" 
key={{column.key}}>
 	<span 
	:style="indentStyle" 
	class="ant-table-row-indent indent-level-{{indent}}" 
	></span>
	<expand-icon
	:expandable="expandable" 
	:on-expand="onExpand" 
	:need-indent-spaced="needIndentSpaced" 
	:expanded="expanded" 
	:record="record"
	v-if="isColumnHaveExpandIcon"
	></expand-icon>
	
	<!-- <span v-html='text'></span> -->
	<span v-my-directive="text"></span>
	<span v-if="!(text || isColumnHaveExpandIcon)">&nbsp;</span>
</td>
</template>
<script type="text/javascript">
import expandIcon from './vue-expandicon'
import objectPath from 'object-path'
export default {
	props: {
		record: Object,
		isColumnHaveExpandIcon: Boolean,
		index: Number,
		expanded: Boolean,
		expandable: null,
		onExpand: Function,
		needIndentSpaced: Boolean,
		indent: Number,
		indentSize: Number,
		column: Object
	},
	data () {
		return {
			text: '错误显示！！！',
		}
	},
	components: {
		expandIcon
	},
	conputed: {
		indentStyle () {
			let indent = this.indentSize * this.indent
			return `paddingLeft: ${indent}px`
		},
		// merge () {
		// 	let merge = {colSpan:'', rowSpan: ''}
		// 	const { dataIndex, render} = this.column;
		// 	let text =  objectPath.get(this.record, dataIndex);
		// 	if(render){
		// 		text = render(text, this.record, this.index);
		// 		this.text = text;
		// 		console.log('outer_____')
		// 		if(this.isInvalidCellText(text)){
		// 			console.log('inner_______')
		// 			merge = text.props;
		// 			this.text = text.children;
		// 		}
		// 	}
		// 	return merge
		// }
	},

	methods: {
		isInvalidCellText (text) {
			return Object.prototype.toString.call(text) === '[object Object]' && text
		},
		initParams() {
			let merge = {}
			const { dataIndex, render} = this.column;
			let text =  objectPath.get(this.record, dataIndex);
			this.text = text
			// console.log(dataIndex)
			// console.log(text)
			if(render){
				text = render(text, this.record, this.index);
				this.text = text;
				if(this.isInvalidCellText(text)){
					merge = text.props;
					// merge.colSpan = text.props.colSpan + 'px';
					// merge.rowSpan = text.props.rowSpan + 'px';
					this.text = text.children;
				}
			}
			this.merge = merge
		},
		test(e) {
			console.log('success change v-html actions')
			e.stopPropagation()
		}
	},
	created() {
		this.initParams()
	},
	directives: {
		myDirective (val) {
			this.el.innerHTML = val;
			this.vm.$compile(this.el);
		}
	}
}
</script>