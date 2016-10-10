import {isArrayOfString} from './util'
export default {
	props: {
		multiple: {
			type: Boolean,			
		},
		defaultActiveFirst: {
			type: Boolean,			
		},
		activeKey: {
			type: String,
			default: ''
		},
		selectedKeys: {
			validator: isArrayOfString,
			required: true
		},
		defaultSelectedKeys: {
			validator: isArrayOfString
		},
		defaultOpenKeys: {
			validator: isArrayOfString
		},
		openKeys: {
			validator: isArrayOfString
		}
	},
	data () {
		return {
			prefixCls: 'vue-menu',
			className: '',
			mode: 'vertical',
			level: 1,
		    inlineIndent: 24,
		    visible: true,
		    focusable: true,
		    style: {},
		}
	},
	created () {
		let params = {
			children: this.$children,
			eventKey: this.eventKey,
			defaultActiveFirst: this.defaultActiveFirst
		};
		let originalActiveKey = '';
		console.log(params, 'params')
		console.log(originalActiveKey, 'originalActiveKey')
		this.activeKey = getActiveKey(params, originalActiveKey)
		console.log(this.activeKey)
	},
	computed: {
		// activeKey () {
		// }
	}
}