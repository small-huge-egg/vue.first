<template>  
  <div>
    
    <!-- 轮播图 -->
    <swiper-box :lunbotuList="this.lunbotuList" :isfull="true"></swiper-box>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <router-link to="/home/newslist">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div>
            </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/photoList">
              <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div>
            </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
              <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
              <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
              <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
              <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></router-link></li>
    </ul> 
  </div>  
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default {
  data(){
    return {
      lunbotuList:[
      ]
    };
  },
  created(){
    this.getLunbotu();
  },
  methods:{
     getLunbotu(){
       this.lunbotuList = [
         {src:"http://img.18183.com/uploads/allimg/171127/193-1G12G41254.jpg"},

         {src:"http://img.smzy.com/imges/2018/0509/20180509063234529.jpg"},
         {src:"http://img4.imgtn.bdimg.com/it/u=225587852,2212930322&fm=26&gp=0.jpg"}
       ]
       console.log(this.lunbotuList)
      //  this.$http.get('api/getlunbo').then(result=>{
      //     // console.log(result.body);
      //     if(result.body.status===0){
      //      this.lunbotuList=result.body.message;
      //     }else{
      //      Toast('加载失败')
      //    }
      //  })
     }
  },
  components:{
    'swiper-box':swiper
  }
}
</script>
<style scoped>
  .mint-swipe-item:nth-child(1){
    background-color:red
  }
  .mint-swipe-item:nth-child(2){
    background-color:blueviolet
  }
  .mint-swipe-item:nth-child(3){
    background-color:pink   
  }
  .mui-table-view{
    border:0;
    background-color:#fff;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:0;
    background-color:#fff;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell img{
    width:60px;
    height: 60px;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size:13px;
  }
</style>