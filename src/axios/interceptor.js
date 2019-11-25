import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue';
import store from '../store'
axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
axios.interceptors.request.use(config => {
    let user=null; 
    // 如果用户已经登陆 获取携带token
    if(sessionStorage.getItem('dzwhuser') && config.url!='/t_dz_user/userLogin'){
      user=JSON.parse(sessionStorage.getItem('dzwhuser'))
      config.data['userToken']=user.userToken
    }
    config.method === 'post'
        ? config.data = qs.stringify({
          ...config.data,
          ...store.state.parameter,
          })
        : config.params = {
          ...config.params,
          ...store.state.parameter,
        };
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
}, error => {  //请求错误处理
    Promise.reject(error)
});

axios.interceptors.response.use(
  res => {
    let result;
    switch (parseInt(res.data.code)) {
      case 0:
        result=res.data
        break;
      case 1:
        message.error('服务器开小差啦')
        break;
      case 101:
       message.error(res.data.msg)
       break;
      case 101:
        message.warning('暂无数据')
        break;
      case (102||103||104||105):
        // 重新登陆
      break;
    }
    //在这里对返回的数据进行处理
    return result;
  }, 
  error => {
  return Promise.reject(error);
});

export default axios; //暴露axios实例