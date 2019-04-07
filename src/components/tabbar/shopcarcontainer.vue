<template>  
  <div class="goods-list-container">
    <div class="goods-list">

      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img src="http://demo.dtcms.net/upload/201504/20/thumb_201504200119256512.jpg" alt="">
            <div class="info">
              <h1>小米很多时候看见很多客户到访</h1>
              <p>
                <span class="price">￥2199</span>
                <numbox></numbox>
                <a href="#">删除</a>
              </p>
            </div>
          </div>
          </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            
            <h1>小米很多时候看见很多客户到访</h1>
          </div>
        </div>
      </div>
      
    </div>
  </div>  
</template>
<script>
import numbox from "../subcomponents/shopcar_numberbox.vue";
export default{
  components:{
    numbox
  }
}
</script>
<style scoped>
.goods-list-container{
  background: #eee;
  overflow: hidden;
}
.mui-card-content-inner{
  display:flex;
  align-items: center;/*垂直居中*/
  /* justify-content: center;水平居中 */
}
.goods-list img{
  width:60px;
  height: 60px;
}
.goods-list h1{
  font-size: 13px;
  margin: 15px 0;
}

.goods-list .info .price{
  color:red;
  font-weight:bold;
}
</style>