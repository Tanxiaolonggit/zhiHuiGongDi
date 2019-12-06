import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import axios2 from './axios';
import echarts from 'echarts' ;
import '../src/assets/css/antd.css';
// 中文日历
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn')
axios.defaults.baseURL='http://47.98.254.131:8678';
// axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios2;//把axios挂载到vue上
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(Antd);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
