<template>
  <div>

    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll" >
          <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)" data-wid="tab-top-subpage-1.html">
            {{item.title}}
          </a>
        </div>
      </div>  
    </div>

    
    <!-- 图片列表区域 -->
    <ul class="photos-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>


  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
import { Toast } from "mint-ui"

export default{
  data(){
    return {
      cates:[],//手动添加全部中的信息
      list:[],
    }
  },
  created(){
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted(){//当组件中的Dom结构被渲染好并放到页面中后，会执行这个钩子函数
    mui('.mui-scroll-wrapper').scroll({
      deceleration:0.0005
    })
  },
  methods :{
    getAllCategory(){//获取顶部导航条数据
      this.$http.get('api/getimgcategory').then(result=>{
        if(result.body.status===0){
          //手动拼接一个 全部 列表
          result.body.message.unshift({title: "全部",id: 0})
          this.cates=result.body.message;
          }else{
           Toast('加载失败')
          }
      })
    },
    getPhotoListByCateId(cateId){//获取图片id
      this.$http.get('api/getimages/'+cateId).then(result=>{
        if(result.body.status===0){
           this.list=result.body.message;          
          }else{
           Toast('加载失败')
         }
      })
    }
  }
}
</script>
}
<style>
* {
touch-action: pan-y;
}

.photos-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
.photos-list  li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
.photos-list img {
  width: 100%;
  vertical-align: middle;
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photos-list .info {
  background: white;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
  color: #fff;
}
.photos-list .info-title {
  font-size: 14px;
}
.photos-list .info-body {
  font-size: 13px;
  height:41px;
  overflow:hidden;
}
</style>