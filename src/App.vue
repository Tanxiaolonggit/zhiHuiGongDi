<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import layout from './views/layout.vue'
// antd-vue 国际化配置
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  data(){
    return{
      zh_CN
    }
  },
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
