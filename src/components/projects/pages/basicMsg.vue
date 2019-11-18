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
                        <span v-if='projectDetail.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                        <span style="color:#fa8c16;background:#fff7e6">{{projectDetail.demoProject==1?'示范工程':'非示范工程'}}</span>
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
import markers from '../../../../src/assets/image/maps/markers.png'
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
            map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注   
            map.enableScrollWheelZoom(true);    // 允许滚轮缩放
            this.addMarker(point)
        },
        //创建中心点
        addMarker(point){  // 创建图标对象   
                var myIcon = new BMap.Icon(markers, new BMap.Size(24, 35), {    
                    // 指定定位位置。   
                    // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
                    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
                    // 图标中央下端的尖角位置。    
                    anchor: new BMap.Size(0, 35),    
                    // 设置图片偏移。   
                    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
                    // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
                    // imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移    
                });      
                // 创建标注对象并添加到地图   
                var marker = new BMap.Marker(point, {icon: myIcon});    
                map.addOverlay(marker);    
        }  
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
            width:100%;
            justify-content: space-between;
            box-sizing: border-box;
            .otherMsg_left{
                div{
                    margin:10px 0;
                    span{
                        font-size: 12px;
                        display: inline-block;
                        text-align: center;
                        margin-right: 10px;
                        white-space: nowrap;
                    }
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