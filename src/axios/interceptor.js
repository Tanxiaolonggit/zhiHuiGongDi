import axios from 'axios';
import qs from 'qs';
// import { Toast } from 'vant';
import store from '../store'
axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
axios.interceptors.request.use(config => {
    config.method === 'post'
        ? config.data = qs.stringify({...config.data,...store.state.parameter})
        : config.params = {...config.params,...store.state.parameter};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
}, error => {  //请求错误处理
    // Toast.fail(error);
    Promise.reject(error)
});

axios.interceptors.response.use(
  res => {
    let result;
    switch (parseInt(res.data.code)) {
      case 0:
        result=res.data
        break;
    }
    //在这里对返回的数据进行处理
    return result;
  }, 
  error => {
  return Promise.reject(error);
});

export default axios; //暴露axios实例