<template>
    <div class='projects'>
        <div class="crumbs">
            <span @click="toProjectList">项目  </span>
            <span> / {{projctName}}</span>
        </div>
        <a-layout v-if='funList' class="layOut">
            <!-- 左侧功能列表 -->
            <a-layout-sider class="layOut_left" width="256" style="background: #fff;flex:1;">
                <a-menu
                    style="width:100%;"
                    :defaultSelectedKeys="['projectInfo']"
                    mode="inline"
                >
                    <a-menu-item key='projectInfo' v-if="funList.projectInfo==1" @click="toggleTab(0)">
                        <span >项目简介</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.video==1" @click="toggleTab(1)">
                        <span >安防监控</span>
                    </a-menu-item> 
                    <a-sub-menu >
                        <span slot="title"><span>员工管理</span></span>
                        <a-menu-item key="3" v-if="funList.person.person==1" @click="toggleTab(2)">实名制信息</a-menu-item>
                        <a-menu-item key="4" v-if="funList.person.sign==1" @click="toggleTab(3)">考勤管理</a-menu-item>
                    </a-sub-menu>
                    <a-menu-item v-if="funList.salary==1" @click="toggleTab(4)">
                        <span >薪资管理</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.device==1" @click="toggleTab(5)">
                        <span >设备管理</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.environment==1" @click="toggleTab(6)">
                        <span >环境监测</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.dangerProject==1" @click="toggleTab(7)">
                        <span >危大工程</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.inspection==1" @click="toggleTab(8)">
                        <span >检验监管</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.supervisionReport==1" @click="toggleTab(9)">
                        <span >监理报告</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.warn==1" @click="toggleTab(10)">
                        <span >预警信息</span>
                    </a-menu-item> 
                     <a-menu-item v-if="funList.material==1" @click="toggleTab(11)">
                        <span >建材管理</span>
                    </a-menu-item> 
                     <a-menu-item v-if="funList.qualityAccept==1" @click="toggleTab(12)">
                        <span >质量验收</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.examine==1" @click="toggleTab(13)">
                        <span >巡检信息</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.statistics==1" @click="toggleTab(14)">
                        <span >统计分析</span>
                    </a-menu-item> 
                    <a-menu-item v-if="funList.seniorFun==1" @click="toggleTab(15)">
                        <span >特色功能</span>
                    </a-menu-item> 
                </a-menu>
                
            </a-layout-sider>
            <!-- 右侧功能详情 -->
            <div class="project_content">
                <basicMsg @listenProjectName='listenProjectName' v-if="selectTab==0"></basicMsg>
                <videoSurveillance v-else-if="selectTab==1"></videoSurveillance>
                <personList v-else-if="selectTab==2"></personList>  
                <sign v-else-if="selectTab==3"></sign>    
                <salary v-else-if="selectTab==4"></salary>   
                <towerCrane v-else-if="selectTab==5"></towerCrane>    
                <environment v-else-if="selectTab==6"></environment>      
                <dangerProject v-else-if="selectTab==7"></dangerProject>
                <inspection v-else-if="selectTab==8"></inspection>
                <warns v-else-if="selectTab==10"></warns>
                <buildingMaterial v-else-if="selectTab==11"></buildingMaterial>
            </div>
        </a-layout>
    </div>
</template>
<script>
// 基本信息
import basicMsg from '../../../components/projects/pages/basicMsg'
// 人员列表
import personList from '../../../components/projects/pages/personList'
// 安防监控
import videoSurveillance from '../../../components/projects/pages/videoSurveillance'
// 出勤管理
import sign from '../../../components/projects/pages/sign'
// 薪资管理
import salary from '../../../components/projects/pages/salary'
// 设备管理
import towerCrane from '../../../components/projects/pages/towerCrane'
// 环境监测
import environment from '../../../components/projects/pages/environment'
// 危大工程
import dangerProject from '../../../components/projects/pages/dangerProject'
// 检验监管
import inspection from '../../../components/projects/pages/inspection'
// 预警信息
import warns from '../../../components/projects/pages/warns'
// 建材管理
import buildingMaterial from '../../../components/projects/pages/buildingMaterial'
export default {
    name:'project',
    components:{
        basicMsg,videoSurveillance,personList,salary,towerCrane,environment,sign,
        dangerProject,inspection,
        warns,buildingMaterial
    },
    data(){
        return{
            projctName:'',
            projectId:this.$route.params.projectId,
            // 左侧功能列表
            funList:null,
            // 侧边栏当前选中项
            selectTab:0,
        }
    },
    mounted(){
        this.getSelectProjectfun()
    },
    methods:{
        toggleTab(i){
            this.selectTab=i
        },
        // 监听子组件 接受项目名称
        listenProjectName(e){
            this.projctName=e
        },
        // 获取项目左侧功能列表
        getSelectProjectfun(){
            this.$axios.post('/t_dz_projectfun/selectProjectfun',{
                projectId:this.projectId
            }).then((res)=>{
                this.funList=res.data[0]
            })
        },
        // 返回项目列表页
        toProjectList(){
            this.$router.replace({path:'/webContent/project'})
        }
    }
}
</script>
<style lang="less" scoped>
    .projects{
        height: 92%;
        // 面包屑导航
        .crumbs{
            height: 4%;
            padding: 0 10px;
            span:nth-of-type(1){
                cursor: pointer;
            }
            span:nth-of-type(1):hover{
                color: #1890ff;
            }
        }
        // layOut布局
        .layOut{
            height: 96%;
            display:flex;
            // 左边slider选择栏
            .layOut_left{
                height: 100%;
                overflow-y: auto;
                .ant-menu-item{
                    margin: 0;
                }
            }
            // 右边项目详情
            .project_content{
                flex:1;
                font-size: 16px;
                color: #333;
                margin-left: 10px;
            }
        }
        
    }
</style>
