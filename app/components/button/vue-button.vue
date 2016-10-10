<template>
<button :class="['ant-btn', btnType, btnSize, btnShape, {'ant-btn-loading': loading}, {'ant-btn-clicked': clicked}]" @click="_click">
	<i class="anticon anticon-loading" v-if="loading"></i>
	<i class="anticon anticon-{{icon}}" v-if="icon"></i>
	<slot></slot>
</button>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			clicked: false
		}
	},
	props: {
		icon: String,
		shape: {
			validator: (val) => {
				return ['circle', 'circle-outline'].includes(val)
			}
		},
		size: {
			// validator: (val) => {
			// 	return ['large', 'small'].includes(val)
			// },
			coerce: (val) => {
				if(val === 'small')
					return 'sm'
				if(val === 'large')
					return 'lg'
				return ''
			}
		},
		loading: {
			type: Boolean,
			default: false
		},
		onClick: Function,
		mode: {
			validator: (val) => {
				return ['primary', 'ghost', 'dashed'].includes(val)
			}
		}
	},
	computed: {
		btnType() {
			if(this.mode)
				return `ant-btn-${this.mode}`
			return ''
		},
		btnShape() {
			if(this.shape)
				return `ant-btn-${this.shape}`
			return ''
		},
		btnSize() {
			if(this.size)
				return `ant-btn-${this.size}`
			return ''
		}
	},
	methods:{
	    _click(e){
	      	this.clicked = true;
	      	if(this.clickTimer) clearTimeout(this.clickTimer);
	      	this.clickTimer = setTimeout(()=>this.clicked = false,500);
	      	if(this.onClick){
	      		this.onClick(e)
	      	}
		}
	}
}
</script>