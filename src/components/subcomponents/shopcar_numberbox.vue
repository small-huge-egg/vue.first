<template>
    <div class="numbox-container">
      <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- readonly	html语法 把输入字段设置为只读。 -->
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
      </div>
    </div>
  
  </template>
  <script>
  import mui from '../../lib/mui/js/mui.min.js'
  export default {
    mounted() {//当组件中的Dom结构被渲染好并放到页面中后，会执行这个钩子函数
      //初始化数字选择框组建
      mui(".mui-numbox").numbox();
    },
    methods:{
      countChanged(){//当文本框数量发生改变时
       this.$store.commit("updateGoodsInfo",{
         id:this.goodsid,
         count:this.$refs.numbox.value
       })
      },
    },
    props:["initcount","goodsid"]
  }
</script>
<style>
.numbox-container{
  display:inline-block;
}
</style>