<template>
  <div id="app">
    <layout></layout>
    <router-view />
  </div>
</template>
<script>
import layout from './views/layout.vue'
export default {
  components:{
    layout
  },
}
</script>
<style lang="less">
html,body{
  height:100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #fff;
  height: 100%;
}
html,body,div,p,span,ul,li,a{
  margin: 0;
  padding: 0;
}
body{
  // background: url('./assets/image/body/body_bac.jpg');
  // background-size:100% 100%;
}
</style>
