<template>
  <div>

    <mt-swipe :auto="4000">
      <!-- lunbotuList 由父组件向子组件传值来设置 -->
      <mt-swipe-item v-for='item in lunbotuList' :key='item.id'>
        <img class="lunbo" :src="item.img" :class="{full:isfull}"></img>
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>
<script>
export default {
  props: ["lunbotuList","isfull"]
};

</script>
<style>
.mint-swipe{
  height:200px;
  text-align:center;
}
.lunbo{
  height:100%;
  text-align:center;
}
.full{
  height:100%;
  width:100%;
}
</style>