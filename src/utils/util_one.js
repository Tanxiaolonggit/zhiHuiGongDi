function formatDate(now) { 
    let year=now.getFullYear();  //取得4位数的年份
    let month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    let date=now.getDate();      //返回日期月份中的天数（1到31）
    let hour=now.getHours();     //返回日期中的小时数（0到23）
    let minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    let second=now.getSeconds(); //返回日期中的秒数（0到59）
    return year+"-"+month+"-"+date
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
    isLogin
}