<template>  
  <div class="goods-list-container">
    <div class="goods-list">

      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
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
  data(){
    return {
      goodslist:[]//购物车里的商品
    }
  },
  created(){
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){//获取购物车商品列表

      //获取到store中所有商品的id,然后拼接出一个用逗号分隔的字符串
      let idArr=[];//存放id的数组
      this.$store.state.car.forEach(item => {
        idArr.push(item.id)
      });
      if(idArr.length<=0){
        return;
      }

      this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result=>{
        if(result.body.status===0){
          this.goodslist = result.body.message;
        }
      })
    }
  },
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
.info{
  padding-left:8px;
}
.goods-list .info .price{
  color:red;
  font-weight:bold;
}
</style>