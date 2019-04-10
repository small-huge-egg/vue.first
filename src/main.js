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


// 3.1注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js ，在刚调用的时候，先从本地存储中，把购物车的数据读出来放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
  state:{
    car:car
  },
  mutations:{
    addTocar(state,goodsinfo){//点击加入购物车，把商品信息保存到store中的car中
    //分析:
    //如果购物车已经有某件商品，则只用更改car中的数量
    //如果没有，则直接push goodsinfo中的数据
      let flag=false//假设购物车没有找到对应的商品
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count+=goodsinfo.count;
          flag=true;
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },

    updateGoodsInfo(state,refreshcount){//接收购物车页面的count值，更新car,更新本地存储
      state.car.some(item=>{
        if(item.id == refreshcount.id){
          item.count = parseInt(refreshcount.count)
          return true
        }
      })
      //当更新count之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },

    
    deleteCarShop(state,id){// 接收shopcontainer传来的id,把car里的id对应的数据删除
      state.car.some((item,index)=>{
        if(item.id==id){
          state.car.splice(index,1)
          return true;
        }
      }) 
      //当删除之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },

    //接收shopcontainer传来的selected,把car里的selected对应更改
    updateGoodsSelected(state,info){
      state.car.some(item => {
        if(item.id==info.id){
          item.selected = info.selected;
          return true;
        }
      })
      //当更新selected之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    getAllCount(state){//计算购物车总数量，并传给红色计数的地方
      let c=0;
      state.car.forEach(item=>{
        c+=item.count;
      })
      return c;
    },
    
    // 获取购物车里面的count传给shopcarcontainer
    // 创建一个对象，属性值为id,属性值为id对应商品的 count
    getGoodsCount(state){
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;
    },

    getGoodsSelected(state){
      let o={}
      state.car.forEach(item => {
        o[item.id]=item.selected
      })
      return o;
    },

    getGoodsCountAndAmount(state){//计算勾选的商品总数和价格
      let o = {
        count:0,//勾选的数量
        price:0,//勾选的总价格
      }
      state.car.forEach(item => {
        if(item.selected==true){
          o.count+=item.count;
          o.price+=item.price*item.count
        }
      })
      return o;
    }
  }
})


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
    router,//1.4挂载路由对象到VM实例上
    store,//挂载vuex
})


// --host 192.168.199.207手机挂安插 