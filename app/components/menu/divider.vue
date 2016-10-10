<template>
	<li :class="liClassName"></li>
</template>
<script type="text/javascript">
	export default {
		props: {
			className: {
				type: String,
				default: ''
			},
			rootPrefixCls: {
				type: String,
			}

		}
		data () {

		},
		computed:{
			liClassName () {
				let liClass = this.className +' ' + `${rootPrefixCls}-item-divider`
				return liClass
			}
		}
	}
</script>