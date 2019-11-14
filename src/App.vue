<template>
  <div id="app">
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
  min-width: 1000px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
html,body,div,p,span,ul,li,a{
  margin: 0;
  padding: 0;
}
</style>
