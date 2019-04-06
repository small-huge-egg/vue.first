<template>  
    <div>
      <ul class="mui-table-view" v-for="item in newsList" :key="item.id">
          <li class="mui-table-view-cell mui-media">
            <router-link :to="'/home/newsinfo/'+item.id">
              <img class="mui-media-object mui-pull-left" :src="item.img_url">
              <div class="mui-media-body">
                <h1>{{item.title}}</h1>
                <span>{{item.add_time | dataFormat}}</span>
                <span>点击:{{item.click}}次</span>
              </div>
            </router-link>
          </li>
      </ul>
    </div>  
</template>
<script>
import { Toast } from 'mint-ui'
export default{
  data(){
    return {
      newsList:[]
    }
  },
  created(){
    this.getNewsList()  
  },
  methods:{
    getNewsList(){
      this.$http.get('api/getnewslist').then( result =>{
        if(result.body.status===0){
          this.newsList=result.body.message;
        }else{
          Toast("获取新闻失败")
        }
      })
    }
  }
}
</script>
<style scoped>
.mui-media-body h1{
  font-size:14px;
}
.mui-media-body span{
  width:82%;
  display:inline-flex;
  justify-content: space-between;
  font-size:12px;
  color:#226aff;
}
</style>