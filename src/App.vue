<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header fixed title="巨蛋今天也很快乐" style="z-index:20">
      <span @click="goback" slot="left">
        <mt-button icon="back" v-show="flag">返回</mt-button>
      </span>
    </mt-header>

		<!-- 中间router-view区域 -->
		<transition>
			<router-view></router-view>
		</transition>


    <!-- 底部tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜素</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default{
  data(){
    return {
      flag:false
    }
  },
  created(){
    // if(this.$route.path==)
    this.flag=this.$route.path==="/home"?false:true
  },
  methods:{
    goback(){
      //点击回退
      this.$router.go(-1);
    }
  },
  watch:{//监听事件
    "$route.path":function(newval){//如果路由地址发生变化
      if(newval == "/home"){
        this.flag=false;
      }else{
        this.flag=true;
      }     
    }
  }
}
</script>


<style scoped>
.app-container{
  padding:40px 0 50px 0;
	overflow-x: hidden;
	position:absolute;
	width:100%;
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position:absolute;
}
.v-enter-active,
.v-leave-active{
	transition:all 0.5s ease;
}
.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
