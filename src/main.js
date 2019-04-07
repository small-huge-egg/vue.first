//入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的router.js模块
import router from './router.js'

//2.1导入vue-resource 这是用于处理HTTP请求的插件
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//2.3设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//2.4全剧设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true; 


//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// //按需求导入mint-ui中的组件
// import { Header,Swipe, SwipeItem,Button } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
//因为用到了懒加载，只能全局定义mint-ui组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


//定义全局时间过滤器
import moment from 'moment'
Vue.filter('dataFormat',function(datastr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(datastr).format(pattern);
})


//导入app根组件
import app from './App.vue'
let vm = new Vue({
    el:"#app",
    render: c=>c(app),//一个组件占一个页面
    router//1.4挂载路由对象到VM实例上
})


// --host 192.168.199.207手机挂安插 