<template>
  <div class="goods-list">

    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>{{item.stock_quantity}}</span>
        </p>
      </div>
    </div>


    <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return{
      pageindex:1,//分页的页数
      goodslist:[]//存放商品列表的数组
    }
  },
  created(){
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      this.$http.get('api/getgoods?pageindex='+this.pageindex).then( result =>{
        if(result.body.status===0){
          this.goodslist=this.goodslist.concat(result.body.message);
        }
      })
    },
    getmore(){
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id){//使用js形式实现路由导航
      //方法1：
      // this.$router.push("/home/goodsinfo/" + id);
      //方法2： 传递对象
      // this.$router.push({path:"/home/goodsinfo/" + id});
      //方法3： 传递命名的路由
      this.$router.push({name:"goodslist",params:{id}});
    }
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