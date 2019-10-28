import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import axios2 from './axios'
axios.defaults.baseURL='http://47.98.254.131:8678'
Vue.prototype.$axios = axios2;//把axios挂载到vue上
Vue.config.productionTip = false
Vue.use(Antd)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
