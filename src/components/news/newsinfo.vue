<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{newsinfo.title}}</h1>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dataFormat}}</span>
      <span>点击次数：{{newsinfo.click}}</span>
    </p>
    <hr>
    <!-- 内容 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区 弄成一个子组件，因为别的页面也有他 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
import { Toast } from 'mint-ui'
export default{
  data() {
    return {
      id:this.$route.params.id,
      newsinfo:{}
    };
  },
  created(){
    this.getNewsinfo();
  },
  methods:{
    getNewsinfo(){
       this.$http.get("api/getnew/"+this.id).then(result=>{
          if(result.body.status===0){
           this.newsinfo=result.body.message[0]; //注意【0】
          }else{
            Toast('新闻加载失败')
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
.newsinfo-container{
  padding:0 4px;
}
.newsinfo-container .title{
  font-size: 16px;
  text-align:center;
  margin:15px 0;
  color:tomato;
}
.newsinfo-container .subtitle{
  display:flex;
  justify-content: space-between;
  font-size: 13px;
  color: #226aff;
}
</style>