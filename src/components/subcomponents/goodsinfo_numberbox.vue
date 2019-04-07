<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
      //子组件向父组件传值
      this.$emit("getcount",parseInt(this.$refs.numbox.value))
    },
  },
  props:["max"],//父组件向子组件传递的库存最大值
  watch: {
    //max属性监听
    max:function(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption("max",newVal);
    }
  }

  
  
}
</script>