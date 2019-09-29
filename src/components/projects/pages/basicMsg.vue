<template>
    <div  class="basicMsg">
        <div v-if="projectDetail" class="basicMsg_top">
            <div class="projectName">
                <div>项目名称：{{projectDetail.projectName}}</div>
            </div>
            <div class="otherMsg">
                <div class="otherMsg_left">
                    <div>所属区域：{{area}}</div>
                    <div>建设规模：{{projectDetail.projectScale}}㎡</div>
                    <div>项目造价：{{projectDetail.projectCost}}万元</div>
                    <div>状态：
                        <span :style="{background:projectDetail.projectStatus==1?'#edf7f1':'#f8f2f1',color:projectDetail.projectStatus==1?'#1bd177':'#f6485c'}">{{projectDetail.projectStatus==1?'在建':'竣工'}}</span>
                    </div>
                </div>
                <div class="otherMsg_mid">
                    <div>计划开工日期：{{projectDetail.planBeginTime}}</div>
                    <div>计划竣工日期：{{projectDetail.planEndTime}}</div>
                    <div>项目地址：{{projectDetail.projectAddress}}</div>
                </div>
                <div class="otherMsg_right">
                    <div>建设单位：{{projectDetail.buildingSide}}</div>
                    <div>监理单位：{{projectDetail.supervisionUnit}}</div>
                    <div>勘察单位：{{projectDetail.explorationUnit}}</div>
                    <div>设计单位：{{projectDetail.designUnit}}</div>
                    <div>施工单位：{{projectDetail.constructionUnit}}</div>
                </div>
            </div>
        </div>
        <div class="basicMsg_bot">
            <div id="container"></div> 
        </div>
    </div>    
</template>
<script>
var map;
export default {
    name:'basicMsg',
    data(){
        return{
            name:'金科照母山项目85-1/05地块二标段工程',
            area:'两江新区',
            status:1,
            projectId:this.$route.params.projectId,
            projectDetail:null
        }
    },
    mounted(){
        // 获取项目基础信息
        this.getInfo();
        this.createMap() 
    },
    methods:{
        getInfo(){
            this.$axios.post('/t_dz_project/selectProjectInfoById',{
                projectId:this.projectId
            }).then((res)=>{
                this.projectDetail=res.data[0]         
                // 将项目名字发送给父组件
                this.$emit('listenProjectName',this.projectDetail.projectName)
                this.createMap(this.projectDetail.posLng,this.projectDetail.posLat)
            })
        },
        // 创建地图实例
        createMap(lng,lat){
            map = new BMap.Map("container"); 
            let point = new BMap.Point(lng,lat);  // 创建中心点坐标  
            map.centerAndZoom(point, 12);  //写入中心点坐标           
            map.enableScrollWheelZoom(true);    // 允许滚轮缩放
        },
    }
}
</script>
<style lang="less" scoped>
// 地图组件
#container{
    height: 100%;
}
.basicMsg{   
    height: 100%;
    overflow-y: scroll;
    .basicMsg_top{
        background: #ffffff;
        box-sizing: border-box;
        padding: 10px 10px 36px 10px;
        font-size: 15px;
        .projectName{      
           
        }
        .otherMsg{
            padding-top: 10px;
            display: flex;
            width: 80%;
            justify-content: space-between;
            box-sizing: border-box;
            .otherMsg_left{
                div{
                    margin:10px 0;
                }
                span{
                    font-size: 14px;
                    display: inline-block;
                    width: 40px;
                    text-align: center;
                }
            }
            .otherMsg_mid{
                div{
                    margin: 10px 0;
                }
            }
            .otherMsg_right{
                div{
                    margin: 10px 0;
                }
            }
        }
    }
    .basicMsg_bot{
        width: 100%;
        height: 700px;
        box-sizing: border-box;
        background: #fff;
        padding: 10px;
        margin-top: 10px;
    }
}

</style>