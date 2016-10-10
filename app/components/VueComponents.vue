<template>
	<div class="vueComponents">{{msg}}
		<div>
			<fieldset>
				<legend>测试checkbox</legend>
        		<vue-checkbox 
				:checked="true"
				:on-change="change">
					<a>测试slot里传递html标签</a>
       			</vue-checkbox>
       			<vue-checkbox 
				:checked="true"
				:on-change="change">
					选择
       			</vue-checkbox>
       			<vue-radio :checked="false"></vue-radio>
			</fieldset>
			<br />
			<fieldset>
				<legend>测试递归树</legend>
				<!-- <div class="container">
					<div class="row">
						<div class="col-lg-3">
							<vue-ul :model="treeData" 
								:mode="mode"
								:on-item-click="onItemClick">					
							</vue-ul>
						</div>
					</div>
				</div> -->
				
				<!-- <vue-ul :model="treeData" 
					:mode="mode"
					:on-item-click="onItemClick">					
				</vue-ul> -->
			</fieldset>
			<br />
			<fieldset >
				<legend>测试导航栏</legend>
				<!--<div class="ant-menu">
						<div class="col-lg-3">
							 <vue-menu :model="treeData" 
								:mode="mode"
								:on-item-click="onItemClick">					
							</vue-menu>
						</div>
				</div> -->
				<div >
					<menu :source-data="menuData" :mode="'horizontal'"></menu>
				</div>
				<div style="width: 200px;">
					<menu :source-data="menuData" :mode="'vertical'"></menu>
				</div>
				<div style="width: 200px;">
					<menu :source-data="menuData" :mode="'inline'"></menu>
				</div>
			</fieldset>
			<br />
			<fieldset >
				<legend>测试table表格</legend>
				<div style="width: 1200px; margin: 0 auto;">
				<!-- <vue-table 
				:data-source="itemsdata1"
				:columns="cols1">
				</vue-table> -->
				</div>
			</fieldset>
		</div>
	</div>
</template>
<script>
	import vueCheckbox from './checkbox/vue-checkbox'
	import vueRadio from './radio/vue-radio'
	import menu from './menu/vue-menu'
	// import vueMenu from './vue-ul'
	// import vueUl from './vue-ul'
	import vueTable from './table/index'
	export default {
		data () {
			return {
				msg: 'vue 组件调试',
				treeData: {
				  name: 'My Tree',
				  key: 'parent',
				  children: [
				  	{name: '另一个'},
				  	{name: '还有一个'},
				    {
				      name: 'child folder',
				      children: [
				        {
				          name: 'one child folder',
				          children: [
				            { name: 'hello item ' },
				            { name: 'wat item' }
				          ]
				        },
				        { name: 'hello 2' },
				        { name: 'wat 2' },
				        {
				          name: 'another child folder',
				          children: [
				            { name: 'hello 3 ' },
				            { name: 'wat 3' }
				          ]
				        }
				      ]
				    }
				  ],
				},
				menuData: [
					{key: '00', title: '导航0'},
					{key: '01', title: '导航01'},
					{key: '02', title: '导航02'},
					{key: 'a', title: '导航一', children: ['1', '2', '3']},
					{key: '1', content:'选项1'},
					{key: '2', content:'选项2'},
					{key: '3', content:'选项3'},
					{key: 'b', title: '导航二', children: ['4', '5']},
					{key: '4', content: '选项4'},
					{key: '5', content: '二级菜单5', children: ['6', '7', '8']},
					{key: '6', content: '选项6'},
					{key: '7', content: '选项7', disabled: true},
					{key: '8', content: '选项8',children: ['9']},
					{key: '9', content: '选项9'},
					// {key: '10', content: '选项10'}
				],
				test: 'aTest',
				t: 10,
				isp: true,
				transitionName: 'fade',
				mode: 'horizontal',//vertical horizontal inline
				model: { a: '1333', c: 'eee', d: 2, key: '3' },
				cols1: [{ title: '姓名', dataIndex: 'a', key: '1' },
						{ title: '年龄', dataIndex: 'b', key: '2' },
						{ title: '电话', dataIndex: 'c', key: '3' },],
				itemsdata1: [{a: '张', b: '11', c: '1234',key: 'a'},
							{a: '王', b: '22', c: '3456', key: 'b'},
							{a: '李', b: '33', c: '5678', key: 'c'},
							{a: '赵', b: '44', c: '7890', key: 'd'}],
			}
		},
		components: {
			vueCheckbox,
			// vueMenu,
			// vueUl,
			vueTable,
			vueRadio,
			menu
		},
		methods: {
			//vue-checkbox
			foucus () {
				console.log('this is a test -- foucus');
			},
			blur () {
				console.log('this is a test -- blur');
			},
			change () {
				console.log('this is a test -- change');
			},
			//menu
			onItemClick () {
				console.log('this is a test -- click item')
			}
		},
		created () {

		},

	}
</script>
<style type="text/css">
	.vueComponents {
		background-color: #FFF;
	}

</style>