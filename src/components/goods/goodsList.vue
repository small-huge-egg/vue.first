<template>
  <div class="goods-list">

    <div class="goods-item">
      <img src="http://cdimg.good.cc/images/UploadImage/0/1636/1636603.jpg" alt="">
      <h1 class="title">小米Note 16G双网铜版</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥2199</span>
          <span class="old">￥2299</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>

    <div class="goods-item">
        <img src="http://cdimg.good.cc/images/UploadImage/0/1636/1636603.jpg" alt="">
        <h1 class="title">小米Note 16G双网铜版</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥2199</span>
            <span class="old">￥2299</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩60件</span>
          </p>
        </div>
      </div>

      <div class="goods-item">
          <img src="http://cdimg.good.cc/images/UploadImage/0/1636/1636603.jpg" alt="">
          <h1 class="title">小米Note 16G双网铜版</h1>
          <div class="info">
            <p class="price">
              <span class="now">￥2199</span>
              <span class="old">￥2299</span>
            </p>
            <p class="sell">
              <span>热卖中</span>
              <span>剩60件</span>
            </p>
          </div>
        </div> 

  </div>
</template>
<script>
export default {
  data() {
    return{}
  },
  created(){

  },
  methods:{

  }
}
</script>
<style>
.goods-list{
  display:flex;
  flex-wrap:wrap;
  padding:7px;
  justify-content: space-between;
}
.goods-list .goods-item{
  width:49%;
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  margin:3px 0;
  padding:2px;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  min-height: 200px;
}
.goods-item img{
  width:100%;
}
.goods-item .title{
  font-size: 14px;
}
.goods-item .info{
  background:#eee;
}
.now{
  color:red;
  font-weight: bold;
  font-size: 16px;
}
.old{
  text-decoration: line-through;
  font-size: 12px;
  margin-left:10px;
}
.sell{
  display: flex;
  justify-content: space-between;
}
</style>