import VueRouter from 'vue-router'


//导入对应的路由组件
import homecontainer from './components/tabbar/homecontainer.vue'
import membercontainer from './components/tabbar/membercontainer.vue'
import shopcarcontainer from './components/tabbar/shopcarcontainer.vue'
import searchcontainer from './components/tabbar/searchcontainer.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photoList from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodsList from './components/goods/goodsList.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [//配置路由规则
    // account  goodslist
    { path: '/', redirect: '/home' },
    { path:'/home',component:homecontainer },
    { path:'/member',component:membercontainer },
    { path:'/shopcar',component:shopcarcontainer },
    { path:'/search',component:searchcontainer },
    { path:'/home/newslist',component:newslist },
    { path:'/home/newsinfo/:id',component:newsinfo },//动态路由，注意冒号
    //一会看看不加id
    { path:'/home/photoList',component:photoList },
    { path:'/home/photoinfo/:id',component:photoinfo },
    { path:'/home/goodsList/',component:goodsList },


  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router