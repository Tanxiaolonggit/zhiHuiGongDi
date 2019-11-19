<template>
    <div  class="towerCrane">
        <div class="pageTitle">设备运行监控<span v-if='towerDetail'> / 项目设备详情</span></div>
        <div v-if='!towerDetail' class="shebeilist">
            <div class="sheibeiBlock" v-for='(item,index) in towerCraneList' :key='index+"shebei"' @click="towerCraneDetail(item)">
                <div class="out">
                    <div>
                        <img src='../../../assets/image/towerCrane/resizeApi.png'/>
                    </div>
                    <div>
                        <p>{{item.recordNum}}</p>
                        <p><span>安装企业</span><span>{{item.installUnit}}</span></p>
                        <p><span>备案日期</span><span>{{item.recordDate}}</span></p>
                        <p><span>黑匣子状态</span><span :style="{color:item.blackBoxStatus==1?'#52c41a':'#f5222d',background:item.blackBoxStatus==1?'#f6ffed':'#fff1f0'}">{{item.blackBoxStatus==1?'已安装':'未安装'}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="shebeiDetail">
            <div class="back"><a-button type="primary"  @click="toList"> <a-icon type="left" />设备列表</a-button></div>
            <div v-if='towerDetail' class='copy'>
                <div class="copyname">起重机械备案</div>
                <div class="copyCont">
                    <div>
                        <p><span>备案编号</span><span>{{towerDetail.recordNum}}</span></p>
                        <p><span>出厂日期</span><span>{{towerDetail.productDate}}</span></p>
                        <p><span>产权单位</span><span>{{towerDetail.propertyRight}}</span></p>
                        <p><span>制造厂家</span><span>{{towerDetail.manufacturer}}</span></p>
                        <p><span>设备流水号</span><span>{{towerDetail.devcieSn}}</span></p>
                    </div>
                    <div>
                        <p><span>设备类型</span><span>{{towerDetail.deviceType}}</span></p>
                        <p><span>备案日期</span><span>{{towerDetail.recordDate}}</span></p>
                    </div>
                    <div>
                        <p><span>规格型号</span><span>{{towerDetail.specifications}}</span></p>
                        <p><span>主要参数</span><span>{{towerDetail.mainParameter}}</span></p>
                        <p><span>产权许可证</span><span>{{towerDetail.propertyRightLicense}}</span></p>
                        <p><span>制造许可证编号</span><span>{{towerDetail.ManuLicense}}</span></p>
                    </div>
                </div>
            </div>
            <div v-if='towerMsg' class="copyother">
                <div class="copyotherTitle">
                    <span>设备状态</span>
                    <span>设备当前运行情况</span>
                </div>
                <div class="copyotherCont">
                    <section>
                        <div><img src="../../../assets/image/towerCrane/resizeApi.png"></div>
                        <div>
                            <p><span>设备剩余寿命</span><span>{{towerDetail.deviceLife}}年</span></p>
                            <p><span>进场日期</span><span>{{towerDetail.enterDate}}</span></p>
                            <p><span>安装日期</span><span>{{towerDetail.installDate}}</span></p>
                            <p><span>进24小时预警：</span><span>{{warnsData.oneDay}}次</span></p>
                            <p><span>进7天预警：</span><span>{{warnsData.sevenDay}}次</span></p>
                            <p><span>进30天预警：</span><span>{{warnsData.eleDay}}次</span></p>
                        </div>
                    </section>
                    <section>
                        <div><img src="../../../assets/image/towerCrane/resizeApi.png"></div>
                        <div>
                            <p><span>设备状态</span><span :style="{border:'1px solid',padding:'2px',fontSize:'12px',color:towerMsg.deviceStatus==1?'#52c41a':'#f5222d',background:towerMsg.deviceStatus==1?'#f6ffed':'#fff1f0'}">{{towerMsg.deviceStatus==1?'在线':'离线'}}</span></p>
                            <p><span>负荷量</span><span>{{towerMsg.deviceLoad}}Kg</span></p>
                            <p><span>负载率</span><span> <a-progress v-if='towerMsg.deviceLoadRate' type="circle" :percent="Number(towerMsg.deviceLoadRate)" :width="40" /></span></p>
                            <p><span>小车幅度</span><span>{{towerMsg.deviceRange}}°</span></p>
                            <p><span>风速(m/s)</span><span>{{towerMsg.windSpeed}}</span></p>
                            <p><span>高度(m)</span><span>{{towerMsg.deviceHeight}}</span></p>  
                            <p><span>吊钩高度(m)</span><span>{{towerMsg.deviceHookHeight}}</span></p>  
                            <p><span>斜角</span><span>{{towerMsg.deviceBeveAngle}}°</span></p>      
                            <p><span>力矩</span><span>{{towerMsg.deviceMoment}}%</span></p>  
                            <p><span>安全载重</span><span>{{towerMsg.deviceSafeLoad}}Kg</span></p>
                            <p><span>数据采集时间</span><span>{{towerMsg.dataSampleTime}}</span></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {throttle} from '../../../utils/util_one.js'
export default {
    data(){
        return{
            projectId:this.$route.params.projectId,
            towerCraneList:[],
            towerDetail:null,
            towerMsg:null,
            warnsData:{
                'oneDay':0,
                'sevenDay':0,
                'eleDay':0
            }
        }
    },
    watch:{
        'towerDetail':function(n,o){
            if(!n){
                this.warnsData={
                    'oneDay':0,
                    'sevenDay':0,
                    'eleDay':0
                }
            }
        }
    },
    mounted(){
        this.getTowerCrane();
    },
    methods:{
        // 获取设备列表
        getTowerCrane(deviceId){
            this.$axios.post('/t_dz_device/selectDeviceById',{
                projectId:this.projectId,
                pageNum:1,
                pageSize:100,
                deviceId:deviceId
            }).then((res)=>{
                if(!deviceId){
                    this.towerCraneList=res.data
                }else{
                    this.towerDetail=res.data[0]
                    console.log(res)
                }
            })
        },
        // 获取设备详情
        towerCraneDetail:throttle(function(item){
            this.getTowerCrane(item.deviceId)
            this.getTowerMsg(item.deviceId)
        },1000),
        // 获取设备状态
        getTowerMsg(deviceId){
            this.$axios.post('/t_dz_tadiaodevice/selectTaDiaoDeviceNow',{
                projectId:this.projectId,
                pageNum:1,
                pageSize:100,
                deviceId:deviceId
            }).then((res)=>{
                // 获取设备预警次数
                this.getDeviceWarn(deviceId,1)
                this.getDeviceWarn(deviceId,7)
                this.getDeviceWarn(deviceId,30)
                this.towerMsg=res.data[0]
            })
        },
        // 获取预警次数
        getDeviceWarn(id,range){
            this.$axios.post('/t_dz_tadiaodevice/selectTaDiaoDeviceWarn',{
                projectId:this.projectId,
                deviceId:id,
                range:range,
            }).then((res)=>{
                switch(range){
                    case 1:
                        this.warnsData.oneDay=res.count
                        break;
                    case 7:
                        this.warnsData.sevenDay=res.count
                        break;
                    case 30:
                        this.warnsData.eleDay=res.count
                        break;
                }
            })
        },
        // 返回设备列表
        toList(){
            this.towerDetail=null
        }
    }
}
</script>
<style lang="less" scoped>
    .towerCrane{
        height: 100%;
        overflow-y: scroll;
        .pageTitle{
            font-size: 14px;
            padding:10px 0;
            box-sizing: border-box;
        }
        .shebeilist{
            width: 100%;
            .sheibeiBlock{
                cursor: pointer;
                box-sizing: border-box;
                width: 50%;
                display: inline-flex;
                .out{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 20px;
                    display: flex;
                    background: #fff;
                    div:nth-of-type(1){
                        margin-right: 20px;
                    }
                    div:nth-of-type(2){
                        flex: 1;
                        overflow: hidden;
                        p{
                            font-size: 14px;
                            margin:0 0 10px 0;
                            padding: 0;
                            line-height: 1;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            span{
                                display: inline-block;
                            }
                            span:nth-of-type(1){
                                margin-right: 20px;
                            }
                        }
                        p:nth-of-type(1){
                            font-size: 18px;
                            margin-bottom: 30px;
                        }
                        p:nth-last-of-type(1){
                            span:nth-of-type(2){
                                border: 1px solid;
                                padding: 2px;
                                font-size: 12px;
                                border-radius: 4px;
                            }
                        }
                    }
                }      
            }
            .sheibeiBlock:nth-of-type(2n-1){
                padding-right: 5px;
                padding-bottom: 5px;
            }
            .sheibeiBlock:nth-of-type(2n){
                padding-left: 5px;
                padding-bottom: 10px;
            }
        }
        .shebeiDetail{
            .back{
                padding: 20px 0 20px 20px;
                background: #ffffff;
                margin-bottom: 2px;
            }
            .copy{
                line-height: 1;
                margin-bottom: 20px;
                .copyname{
                    font-size: 18px;
                    font-weight: 600;
                    padding: 20px 0 20px 20px;
                    background: #fff;
                    margin-bottom: 5px;
                }
                .copyCont{
                    display: flex;
                    padding: 20px;
                    box-sizing: border-box;
                    background: #fff;
                    div{
                        flex: 1;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        p{
                            margin-bottom: 20px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            span{
                                display: inline-block;         
                            }
                            span:nth-of-type(1){
                                margin-right: 10px;
                                font-weight: 600;
                            }
                        }
                        
                    }
                }
            }
        }
        .copyother{
            .copyotherTitle{
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                background: #fff;
                margin-bottom: 1px;
                span{
                    display: block;
                    flex: 1;
                    font-size: 18px;
                    color:#333;
                    font-weight: 600;
                }
            }
            .copyotherCont{
                background: #fff;
                display: flex;
                box-sizing: border-box;
                padding: 10px;
                section{
                    flex: 1;
                    display: flex;
                    div:nth-of-type(1){
                        margin-right: 20px;
                    }
                    div:nth-of-type(2){
                        font-size: 14px;
                        p{
                            margin: 0 0 20px 0;
                            span:nth-of-type(1){
                                margin-right: 10px;
                                font-weight: 600;
                            }
                        }
                    }
                    
                }
            }
        }
    }
</style>