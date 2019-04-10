<template>
<div class="photoinfo-container">
  <h3>{{photosinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photosinfo.add_time | dataFormat}}</span>
      <span>点击：{{photosinfo.click}}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <vue-preview :slides="slides1" ></vue-preview>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photosinfo.content"></div>
    <!-- 放置一个现成的评论子组件 -->
    <comment-box :id=this.id></comment-box>
</div>
  
</template>
<script>
import comment from '../subcomponents/comment.vue'
import { Toast } from 'mint-ui'
export default{
  data(){
    return{
      id:this.$route.params.id,
      photosinfo:{},//图片详情
      slides1:[]//缩略图
    };
  },
  created(){
    this.getPhotoInfo();
    this.getSmallList();
  },
  methods:{
    getPhotoInfo(){
      this.$http.get('api/getimageInfo/'+this.id).then( result =>{
        if(result.body.status===0){
          this.photosinfo=result.body.message[0];
        }
      })
    },
    getSmallList(){
      this.$http.get('api/getthumimages/'+this.id).then( result =>{
        if(result.body.status===0){
          result.body.message.forEach(item => {//循环每个图片的数据，补全图片的宽和高
            item.w=600;
            item.h=400;
            item.msrc=item.src;
          });
          //将图片数据添加到定义的缩略图数组中
          this.slides1=result.body.message;
        }else{
          Toast("获取图片详情失败")
        }
      })
    }
  },
  components:{
    'comment-box':comment
  }
}
</script>
<style>
.photoinfo-container{
  padding: 3px;
}
.photoinfo-container h3{
  color:#26a2ff;
  font-size:15px;
  text-align:center;
  margin:15px 0;
}
.photoinfo-container .subtitle{
  display:flex;
  justify-content: space-between;
  font-size: 13px;
}
.content{
  font-size:13px;
  line-height:30px;
}
</style>
