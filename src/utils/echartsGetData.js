 import {getTime} from './util_one.js'
//  生成PM值图表格
 function creatPm25Fn(range,that){ //range 是用户选择的天数
    let myChart=that.$echarts.init(document.getElementById('pm25'))
    // X轴时间
    let times=that.fenChen1.map((item)=>{
            return getTime(item.time,range)
        })
        times.reverse();
    //pm2.5
    let pm25=that.fenChen1.map((item)=>{
            return item.value
        })
        pm25.reverse()
    // pm10
    let pm10=that.fenChen1.map((item)=>{
            return item.value
        })
        pm10.reverse()
    // echarts数据
    let option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['PM2.5','PM10']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : times
            }
        ],
        yAxis : [
            {
                type : 'value',
                min:0,
                max:150,
                axisLabel: {
                    formatter: '{value} μg/m³'
                }
            }
        ],
        series : [
            {
                name:'PM2.5',
                type:'bar',
                data:pm25,
                markLine : {
                    data : [
                        {'yAxis':115, name: '警戒线'}
                    ]
                }
            },
            {
                name:'PM10',
                type:'bar',
                data:pm10,
                markLine : {
                    data : [
                        {'yAxis':115, name : '警戒线'}
                    ]
                }
            }
        ]
    };
    myChart.setOption(option)
}
// 生成噪声表
function creatZaoShengFn(range,that){
    let myChart=that.$echarts.init(document.getElementById('zaoSheng'))
    // x轴时间轴
    let times=that.zaoSheng.map((item)=>{
            return getTime(item.time,range)
        })
        times.reverse();
    //噪音
    let zaoyin=that.zaoSheng.map((item)=>{
            return item.value
        })
        zaoyin.reverse()
    let option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : times,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    formatter: '{value} dB'
                }
            }
        ],
        series : [
            {
                name:'噪音',
                type:'bar',
                barWidth: '60%',
                data:zaoyin,
                markLine : {
                    data : [
                        {'yAxis':85, name: '警戒线'}
                    ]
                }
            }
        ]
    };
    myChart.setOption(option)
}
function creatFengSuFn(range,that){
    let myChart=that.$echarts.init(document.getElementById('fengsu'))
    // x轴时间轴
    let times=that.fengSu.map((item)=>{
            return getTime(item.time,range)
        })
        times.reverse();
    //噪音
    let fengsu=that.fengSu.map((item)=>{
            return item.value
        })
        fengsu.reverse()
    let option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : times
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    formatter: '{value} m/s'
                }
            }
        ],
        series : [
            {
                name:'风速',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:fengsu
            }
        ]
    };
    myChart.setOption(option)
}
function creatWenDuFn(range,that){
    let myChart=that.$echarts.init(document.getElementById('wendu'))
    // x轴时间轴
    let times=that.wenDu.map((item)=>{
        return getTime(item.time,range)
    })
        times.reverse();
//噪音
    let wendu=that.wenDu.map((item)=>{
        return item.value
    })
        wendu.reverse()
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} ℃'
            }
        },
        visualMap: {
            orient:'horizontal',
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 35,
                color: '#096'
            }, {
                gt:35,
                lte: 37,
                color: '#ffde33'
            }, {
                gt: 37,
                lte:40,
                color: '#ff9933'
            }, {
                gt: 40,
                lte: 60,
                color: '#cc0033'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: [
            {
                name:'温度',
                type:'line',
                data:wendu
            }
        ]
    };
    myChart.setOption(option)
}
export{
    creatPm25Fn,creatZaoShengFn,creatFengSuFn,creatWenDuFn
}