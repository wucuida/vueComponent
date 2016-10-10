import vTable from './vue-wrapTable'
// var vTable = require('./vue-wrapTable')
// import vTable from './test'
if(window.vueComponents){
	window.vueComponents.vTable = vTable
}else{
	window.vueComponents = {vTable: vTable}
}
export default vTable