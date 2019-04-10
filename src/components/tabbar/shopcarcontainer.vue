<template>  
  <div class="goods-list-container">
    <div class="goods-list">

      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- item.id用于删除main.js里的car,i用于删除goodsinfo里面对应i索引的元素 -->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
          </div>
      </div>

      <!-- 商品结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.price}}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
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
    },

    remove(id,index){//点击删除，1.把goodslist里的对应索引的数据删除，2.把car里的id对应的数据删除
      this.goodslist.splice(index,1)//1.删除了goodslist里的对应索引的数据

      //2.把car里的id对应的数据删除
      this.$store.commit("deleteCarShop",id)
    },

    selectedChanged(id,val){//每当点击按钮，把selected状态传给store的selected
      this.$store.commit("updateGoodsSelected",{id,selected:val})
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
.mui-card{
  width:94%;
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
.jiesuan{
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.jiesuan .red{
  color: red;
  font-weight:bold;
}
</style>