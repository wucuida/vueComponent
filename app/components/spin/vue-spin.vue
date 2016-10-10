<template>
<div v-if="noSlot" :class="spinCls">
    <span class="{{prefixCls}}-dot"></span>
    <div v-if="tip" class="{{prefixCls}}-text">{{tip}}</div>
</div>
<div v-if="!noSlot" :class="{'ant-spin-nested-loading': spinning}">
 	<div :class="spinCls">
        <span class="{{prefixCls}}-dot"></span>
        <div v-if="tip" class="{{prefixCls}}-text">{{tip}}</div>
	</div>
  	<div class="{{prefixCls}}-container">
    	<slot></slot>
  	</div>
</div>
</template>
<script type="text/javascript">
export default {
	// data() {
	// 	return {
	// 		prefixCls: 'ant-spin'
	// 	}
	// }
	props: {
		size: {
			coerce(val) {
				if(val === 'small')
					return 'sm'
				if(val === 'large')
					return 'lg'
				return ''
			}
		},
		spinning: {
			type: Boolean,
			default: true
		},
		tip: String,
		prefixCls: {
			type: String,
			default: 'ant-spin'
		},
		extraCls: String,
	},
	computed:{
		noSlot() {
			return !this._slotContents
		},
		spinCls() {
			const prefixCls = this.prefixCls;
			return [
				prefixCls, 
				this.extraCls,
				`${prefixCls}-${this.size}`,
				{'ant-spin-spinning': this.spinning}, 
				{'ant-spin-show-text': !!this.tip}
			]
		}
	},
}
</script>