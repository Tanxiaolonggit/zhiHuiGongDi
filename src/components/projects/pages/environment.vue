<template>
    <div class="environment">
        <!-- 当前数据 -->
        <div v-if="nowEnvironment" class="nowEnvironment">
            <div class="nowEnvironmentTop">
                <div style="color:#1E90FF">
                    <section>实时PM2.5</section>
                    <section><span>{{nowEnvironment.fenChen1}}</span><span>μg/m³</span></section>
                </div>
                <div style="color:#008B45">
                    <section>实时PM10</section>
                    <section><span>{{nowEnvironment.fenChen2}}</span><span>μg/m³</span></section>
                </div>
                <div style="color:#008B45">
                    <section>实时噪音</section>
                    <section><span>{{nowEnvironment.zaoSheng}}</span><span>分贝</span></section>
                </div>
                <div style="color:#008B45">
                    <section>实时风速</section>
                    <section><span>{{nowEnvironment.fengSu}}</span><span>m/s</span></section>
                </div>
                <div style="color:#008B45">
                    <section>实时温度</section>
                    <section><span>{{nowEnvironment.wenDu}}</span><span>℃</span></section>
                </div>
            </div>
            <div class="nowEnvironmentBot">最近采集时段：{{nowEnvironment.dataSampleTime}}</div>
        </div>
        <!-- 按时段显示数据 -->
        <div class="timeEnvironment">
            <!-- PM值 -->
            <div class="pm charts">
                <div class="chartstitle">
                    <span>PM2.5</span>
                    <div>
                        <checkDays froms='PM' @getData='getData'></checkDays>
                    </div>
                </div>
                <div style="height:500px;" id='pm25'></div>
            </div>
            <!-- 噪声 -->
            <div class="zaosheng charts">
                <div class="chartstitle">
                    <span>噪音</span>
                    <div>
                        <checkDays froms='zaoSheng' @getData='getData'></checkDays>
                    </div>
                </div>
                <div style="height:500px;" id='zaoSheng'></div>
            </div>
            <!-- 风速 -->
            <div class="fengsu charts">
                <div class="chartstitle">
                    <span>风速</span>
                    <div>
                        <checkDays froms='fengSu' @getData='getData'></checkDays>
                    </div>
                </div>
                <div style="height:500px;" id='fengsu'></div>
            </div>
            <!-- 温度 -->
            <div class="wendu charts">
                <div class="chartstitle">
                    <span>风速</span>
                    <div>
                        <checkDays froms='wenDu' @getData='getData'></checkDays>
                    </div>
                </div>
                <div style="height:500px;" id='wendu'></div>
            </div>
        </div>
    </div>
</template>
<script>
import checkDays from '../../assembly/checkDays.vue'
import {getTime} from '../../../utils/util_one.js'
import {creatPm25Fn,creatZaoShengFn,creatFengSuFn,creatWenDuFn} from '../../../utils/echartsGetData.js'
export default {
    data(){
        return{
            projectId:this.$route.params.projectId,
            pageNum:1,
            pageSize:10,
            // 设备ID
            deviceId:null,
            // 当前环境
            nowEnvironment:null,
            //环境数据
            fenChen1:[],
            fengChen2:[],
            zaoSheng:[],
            fengSu:[],
            wenDu:[]
        }
    },
    components:{
        checkDays:checkDays
    },
    created(){
        // 获取设备ID
        this.getTimeEnvironment()
    },
    methods:{
        // 获取设备ID
        getTimeEnvironment(range){
            this.$axios.post('/t_dz_environment/selectEnvironmentDeviceId',{
                projectId:this.projectId,
                range:range
            }).then((res)=>{
                this.deviceId=res.data[0].deviceId
                // 获取当前环境
                this.getEnvironment(0)
                // 获取最近24小时的所有数据
                this.getEnvironment(1)
            })
        },
        // 获取环境信息
        getEnvironment(range,froms){
            return new Promise((resolve,reject)=>{
                this.$axios.post('/t_dz_environment/selectEnvironment',{
                    projectId:this.projectId,
                    deviceId:this.deviceId,
                    range:range
                }).then((res)=>{
                    // 获取最新
                    if(range==0){
                        this.nowEnvironment=res.data[0]
                    }else{ //获取时段
                        // 如果存在froms说明用户筛选
                        if(froms){
                            switch(froms){
                                case 'PM':
                                    this.fenChen1=res.data[0].fenChen1
                                    this.fenChen2=res.data[0].fenChen2
                                    this.creatPm25(range);
                                    break;
                                case 'zaoSheng':
                                    this.zaoSheng=res.data[0].zaoSheng
                                    this.creatZaoSheng(range);
                                    break;
                                case 'fengSu':
                                    this.fengSu=res.data[0].fengSu
                                    this.creatFengSu(range);
                                    break;
                                case 'wenDu':
                                    this.wenDu=res.data[0].wenDu
                                    this.creatWenDu(range);
                                    break;
                            }
                        }else{ //如果不存在 全部更新一次
                            this.fenChen1=res.data[0].fenChen1
                            this.fenChen2=res.data[0].fenChen2
                            this.creatPm25(range);
                            this.zaoSheng=res.data[0].zaoSheng
                            this.creatZaoSheng(range);
                            this.fengSu=res.data[0].fengSu
                            this.creatFengSu(range);
                            this.wenDu=res.data[0].wenDu
                            this.creatWenDu(range);
                        }
                        
                    }     
                })
            })
        },
        // 监听子组件 重新获取数据
        getData(e){
            this.getEnvironment(e.days,e.froms)
        },
        // 生成PM2.5图表
        creatPm25(range){ //range 是用户选择的天数
            //引入的创建pm图的方法 
            creatPm25Fn(range,this)
        },
        // 生成噪声表
        creatZaoSheng(range){
            //引入的创建噪声图的方法 
            creatZaoShengFn(range,this)
        },
        // 生成风速表
        creatFengSu(range){
            //引入的创建风速图的方法 
            creatFengSuFn(range,this)
        },
        // 生成温度表
        creatWenDu(range){
            //引入的创建温度图的方法 
            creatWenDuFn(range,this)
        }
    }
}
</script>
<style lang="less" scoped>
    .environment{
        box-sizing: border-box;
        padding-top:10px;
        min-width: 500px;
        height: 100%;
        overflow-y: scroll;
        .nowEnvironment{
            .nowEnvironmentTop{
                display: flex;
                div{
                    background: #fff;
                    flex: 1;
                    margin-right: 10px;
                    border-radius: 10px;
                    box-sizing: border-box;
                    padding: 20px;
                    section:nth-of-type(1){
                        font-size: 14px;
                        line-height: 1;
                    }
                    section:nth-of-type(2){
                        text-align: center;
                        margin-top: 10px;
                        span{
                            line-height: 1;
                        }
                        span:nth-of-type(1){
                            font-size: 40px;
                        }
                    }
                }
                div:nth-last-of-type(1){
                    margin: 0;
                }
            }
            .nowEnvironmentBot{
                text-align: center;
                padding:10px 0;
                font-size: 14px;
            }
        }
        .timeEnvironment{
            margin-top: 10px;
            .pm{
                background: #fff;
                border-radius: 10px;
                box-sizing: border-box;
                padding: 10px;
                margin-bottom: 10px;
            }
            .zaosheng{
                background: #fff;
                border-radius: 10px;
                padding: 10px;
                box-sizing: border-box;  
                margin-bottom: 10px;          
            }
            .fengsu{
                background: #fff;
                border-radius: 10px;
                padding: 10px;
                box-sizing: border-box;  
                margin-bottom: 10px;   
            }
            .wendu{
                background: #fff;
                border-radius: 10px;
                padding: 10px;
                box-sizing: border-box;  
            }
        }
    }
    .charts{
        .chartstitle{
            display: flex;
            justify-content: space-between;
        }
    }
</style>