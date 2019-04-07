<template>
  <div class="goodsinfo-container">

    <!-- 小球 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="isview" ref="ball"></div>
    </transition>


    <!-- 商品轮播图区域 -->
    <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
				<swiper :lunbotuList="goodsinfo" :isfull="false"></swiper>
				</div>
			</div>
		</div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
			<div class="mui-card-header">{{goodsdetail.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
				  <p class="price">
            市场价:<del>￥{{goodsdetail.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsdetail.sell_price}}</span>
          </p>
          <p>购买数量&nbsp：<numbox style="display:inline" @getcount="getSelectedCount" :max="goodsdetail.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
				</div>
			</div>
    </div>
    
    <!-- 商品参数区域 -->
    <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
          <p>商品货号：{{goodsdetail.goods_no}}</p>
          <p>库存情况：{{goodsdetail.stock_quantity}}件</p>
          <p>上架时间：{{goodsdetail.add_time | dataFormat}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
    
  </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from "../subcomponents/goodsinfo_numberbox.vue"
export default {
  data() {
    return {
      id:this.$route.params.id,
      goodsinfo:[],//轮播图数据
      goodsdetail:{},//商品购买区域信息
      isview:false,//控制小球隐藏和显示
      selectedCount:1,//保存用户选中商品的数量，默认为1
    };
  },
  created(){
    this.getGoodsinfo();
    this.getGoodsDeatil();
  },
  methods:{

    // 轮播图区域
    getGoodsinfo(){
      this.$http.get("api/getthumimages/"+this.id).then(result=>{
        if(result.body.status===0){
          // 循环轮播图数组的每一项，为item添加img属性，因为轮播图组件只认识item.img
          result.body.message.forEach(item => {
            item.img=item.src;
          });
          this.goodsinfo= result.body.message;
        }
      })
    },

    //商品参数区和价格，标题等
    getGoodsDeatil(){
      this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
        if(result.body.status===0){
          this.goodsdetail = result.body.message[0];
        }
      })
    },

    //点击使用编程式导航跳转到图文介绍页面
    goDesc(id){
      this.$router.push({name:'goodsDesc',params:{id}})
    },
    goComment(id){
      this.$router.push({name:'goodsComment',params:{id}})
    },

    //点击加入购物车
    addToShopCar(){
      this.isview = !this.isview; 
    },

    //小球动画
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      el.offsetWidth;

      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取购物车上面的小球在页面中的位置
      const badgePosition = document.getElementById("badge").getBoundingClientRect();
      //translate值
      const xDist = badgePosition.left -  ballPosition.left;//translateX
      const yDist = badgePosition.top -  ballPosition.top;//translateY

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el){
      this.isview=!this.isview;
    },

    //获取子组件中所选的数量
    getSelectedCount(count){
      this.selectedCount = count;
      console.log("值为:" + this.selectedCount)
    }
  },

  components:{
    swiper,
    numbox
  }
}
</script>
<style>
.goodsinfo-container{
  background:#eee;
  overflow: hidden;
}
.now_price{
  color: red;
  font-weight: bold;
  font-size:16px;
}
.mui-card-footer{
  display: block;
}
.mui-card-footer button{
  margin:15px 0;
}
.ball{
  position:absolute;
  top:391px;
  left:154px;
  width:15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  z-index:15;
}
</style>