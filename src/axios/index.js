import Vue from 'vue';
import axios from './interceptor';
// Vue.component(Toast);
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export default{
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
          axios.post(url, data).then(
            response => {
              resolve(response);
            },
            err => {
              reject(err);
            }
          );
        });
    },
    get(url,data={}){
      return new Promise((resolve, reject) => {
        axios.get(url, data).then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
      });
    }
}