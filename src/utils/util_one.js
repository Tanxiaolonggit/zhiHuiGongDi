function formatDate(now) { 
    let year=now.getFullYear();  //取得4位数的年份
    let month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    let date=now.getDate();      //返回日期月份中的天数（1到31）
    let hour=now.getHours();     //返回日期中的小时数（0到23）
    let minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    let second=now.getSeconds(); //返回日期中的秒数（0到59）
    return year+"-"+month+"-"+date + ""
}
function timestampToTime() {
  var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
// 获取当前年+月
function timeYearMonth(now) {
  var date;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  if(now){
    date=new Date(now);
  }else{
    date = new Date();
  } 
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
  return Y +"-"+ M 
}
// 发送给后台的时间戳格式 年-月-日
var serverTimestamp = function (now) {
  var d = new Date(now)
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  let hours = d.getHours();
  let minute = d.getMinutes();
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  // return year + "-" + month + "-" + date + ' ' + hours + ":" + minute;
  return year + "-" + month + "-" + date 
}
// 发送给后台的时间戳格式 年-月-
var serverTimestamp2 = function (now) {
  var d = new Date(now)
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  let hours = d.getHours();
  let minute = d.getMinutes();
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  return year + "-" + month 
}
// 获取当前时间的时或月
function getTime(time,range){
  let d = new Date(time)
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let hours = d.getHours();
  let data;
  if(range==1){
    data=hours+'时'
  }else{
    data=month+'月'+date+'日'
  }
  return data
}
// 显示金额格式
function setAmountFormat(num){
  num = Number(num).toFixed(2);
  num = Number(num).toLocaleString();
  return num;//返回的是字符串23,245.12保留2位小数
}
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }
  
    let _lastTime = null
  
    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
}
// 判断用户是否登陆
function isLogin(){
  if(sessionStorage.getItem('userData')){
    return true
  }else{
    return false
  }
}
export{
    formatDate,
    throttle,
    timestampToTime,
    isLogin,
    serverTimestamp,
    serverTimestamp2,
    getTime,
    setAmountFormat,
    timeYearMonth
}