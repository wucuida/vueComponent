<template>
	<li :class="itemCls">
		<slot name="beforeIcon"></slot>
		{{content}}
		<slot name="afterIcon"></slot>
	</li>
</template>
<script type="text/javascript">
import vueIcon from '../icon/vue-icon'
export default {
	props: {
		content: {
			type: String,
			default: '默认menu item '
		},
		itemType: {
			type: String,
			default: 'ITEM'
		},
		prefixCls: {
			type: String,
			default: 'ant-menu'
		}
	},
	data() {
		return {
			itemCls: '',
		}
	},
	methods:{
		renderCls() {
			switch(this.itemType){
				case 'ITEM':
					this.itemCls = `${this.prefixCls}-item`;
					break;
				case 'GROUPTITLEITEM':
					this.itemCls = `${this.prefixCls}-item-group-title}`;
					break;
				case 'SUBMENUTITLE':
					this.itemCls = `${this.prefixCls}-submenu-title`;
					break;
			}
		}
	},
	created() {
		this.renderCls()
	}
}
</script>