<template>
	<div class="outerName">
		<span :class="className" :style="vueStyle" v-if="testData.c && testData.r">
			<span :class="innerClass">{{t}}</span>
			<input name={{nam}}
			:class="inputClass"
			type={{type}} 
			readonly={{readOnly}} 
			disabled={{disabled}}
			checked={{checked}}
			@focus="handleFocus" 
			@blur="handleBlur"
			@change="handleChang"
			/>
		</span>
		<div v-for="t in testForObj" :style="{ fontSize: t.b + 'px', color: 'red' }" class="{{msg}}-44`">利用checkbox做一个测试
		<span v-for="(k, v) in testFor">
			<span v-if="(k == 0) && (!focus)">{{k}}---{{v}}</span>
		</span>
		<span v-if="shows1()" :class="shows1()? 'fef':'few'">shows1</span>
		<span v-html='testVHtml'></span>
		<span>{{{testVHtml}}}</span>
		</div>
		<slot></slot>
	</div>
	<div v-el="maybe">测试变量binding==el</div>
	<!-- <div><vue-test :datas="testDatas()" ></vue-test></div> -->
	<!-- <div key={{`${msg}-test`}}><vue-test v-for="t in testFor" :datas="t" ></vue-test></div> -->
	<!-- <span v-for="i in testUndefined">{{i}}-测试未定义</span> -->
	<vue-test :datas="maybe" ></vue-test>
	<span v-for="c in testUndefined" :style="{fontSize: c.a +'px'}">测试遍历绑定style</span>
	<span>{{{aaa}}}</span>
</template>
<script>
	import {noop} from '../../util/util'
	import vueTest from '../test'
	import Vue from 'vue'
	const vCheckbox = Vue.extend({
		methods: {
			testDatas () {
				return '测试 函数返回结果 绑定props 传递数据'
			},
			shows1 () {
				return true
			},
			handleChang (e) {
				this.focus = true;
				this.onFocus(e);
				// console.log(e)
			},
			handleBlur (e) {
				this.focus = false;
				this.onBlur(e)
				// console.log(e);
			},
			handleFocus (e) {
				const target = Object.assign({}, this.props, 
				{checked:e.target.checked,
					stopPropagation() {
						e.stopPropagation()
					},
					preventDefault() {
						e.preventDefault()
					}
				})
				this.onChange(target)
				// console.log(e);
			},
			hadleMouseEnter () {
				console.log('test mouse enter')
			},
			testClick () {
				console.log('测试点击')
			}
		},
		data () {
			return {
				maybe: 'eee',
				msg: 'checkbox 组件 调试',
				tq: 30,
				cc: {
					width: '30px',
					color: 'red'
				},
				focus: false,
				testData: {
					c: 30,
					r: 1
				},
				fef: 'geegg',
				tIndex: 2,
				testFor: ['ge', 'gew', 'gr'],
				testForObj: [{a:10, b:10}, {a:30,b:20}],
				testVHtml: '<a href="#" :class="wjgiei" onClick="testClick">{{msg}}</a>',
				testSlotBindEvent: '<span @Click="testClick" style="color: red">测试 slot 绑定event</span>',
				testUndefined: [{a:20},{a:30}],
			}
		},
		computed: {
			innerClass () {
				return this.prefixCls + '-inner'
			},
			inputClass () {
				return this.prefixCls + "-input"
			},
			colorStyle () {
				return `color:blue; text-align:center; font-size: ${this.t}px`
			},
			aaa () {

				return this.t + '测试+++++++++'
			}
		},
		props: {
			t: {
				type: Number,
				default: 9
			},
			name: {
				type: String,
				required:false
			},
			prefixCls: {
				type: String,
				// required: true,
				default: 'vue-checkbox'
			},
			vueStyle: {
				type: Object,
				// required: true,
				default: () => {return {}}
			},
			type: {
				type: String,
				// required: true,
				default: 'checkbox'
			},
			className: {
				type: String,
				// required: true,
				default: ''
			},
			defaultChecked: {
				type: [Number, Boolean],
				// required: true,
			},
			checked: {
				type: [Number, Boolean],
				// required: false,
				default: false
			},
			onFocus: {
				type: Function,
				// required: true,
				default: noop 
			},
			onBlur: {
				type: Function,
				// required: true,
				default: noop
			},
			onChange: {
				type: Function,
				// required:true,
				default: () => {console.log('test Function')}
			}
		},
		created () {

			console.log('checkbox created')
			// let checked = false;
			let checked = this.checked;
			if (typeof checked === 'boolean') {
		      	checked = checked ? 1 : 0;
		    }
		    const prefixCls = this.prefixCls;
			this.className = {
				[this.className]: !!this.className,
			    [prefixCls]: 1,
			    [`${prefixCls}-checked`]: this.checked,
			    [`${prefixCls}-checked-${checked}`]: !!this.checked,
			    [`${prefixCls}-focused`]: this.focus,
			    [`${prefixCls}-disabled`]: this.disabled,
			}
			//wcd test
			// setTimeout(() => {
			// 	this.testClick()
			// }, 1000)
			
			
			
		},
		ready() {
			setTimeout(() => {
				this.maybe= 'msg 改变了'
			}, 2000)
		},
		
		components: {
			vueTest,
		},
		watch: {
			ttt(val, oldval){
				let newmaybe = (val + '====再变')
				this.$set(maybe, newmaybe)
				console.log(this.maybe, 'ddd')
			}
		}

	})
	Vue.component('vue-checkbox', vCheckbox)
	export {vCheckbox as default};
</script>
<style>
	.wcdtest {
		font-size: 20px;
		color: green;
	}
</style>