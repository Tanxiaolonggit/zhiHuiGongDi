<template>
    <div class='projects'>
        <a-breadcrumb class="crumbs">
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>{{projctName}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout class="layOut">
            <a-layout-sider class="layOut_left" width="256" style="background: #fff;flex:1;">
                <a-menu
                    style="width:100%;"
                    :defaultSelectedKeys="[0]"
                    mode="inline"
                >
                    <a-menu-item :key="index" v-for='(item,index) in funData' @click="toggleTab(index)">
                        <span >{{item.name}}</span>
                    </a-menu-item> 
                </a-menu>
            </a-layout-sider>
            <div class="project_content">
                <basicMsg @listenProjectName='listenProjectName' v-if="selectTab==0"></basicMsg>
                <personList v-else-if="selectTab==1"></personList>    
            </div>
        </a-layout>
    </div>
</template>
<script>
import basicMsg from '../../../components/projects/pages/basicMsg'
import personList from '../../../components/projects/pages/personList'
export default {
    name:'project',
    components:{
        basicMsg,personList
    },
    data(){
        return{
            projctName:'',
            projectId:this.$route.params.projectId,
            // 左侧列表
            funData:[
                {
                    name:'项目简介',
                    isShow:false
                },
                {
                    name:'员工信息',
                    isShow:false
                },
                {
                    name:'监控管理',
                    isShow:false
                },
                {
                    name:'考勤管理',
                    isShow:false
                },
                {
                    name:'薪资管理',
                    isShow:false
                },
                {
                    name:'设备管理',
                    isShow:false
                },
                {
                    name:'环境监测',
                    isShow:false
                },
                {
                    name:'危大工程',
                    isShow:false
                },
                {
                    name:'隐患检排',
                    isShow:false
                },
                {
                    name:'检验检测',
                    isShow:false
                },
                {
                    name:'监理报告',
                    isShow:false
                },
                {
                    name:'预警信息',
                    isShow:false
                },
                {
                    name:'建材管理',
                    isShow:false
                },
                {
                    name:'质量验收',
                    isShow:false
                },
                {
                    name:'统计分析',
                    isShow:false
                },
                {
                    name:'特色功能',
                    isShow:false
                },
            ],
            funList:{},
            // 侧边栏当前选中项
            selectTab:0
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
                this.funListHideShow(res.data[0])
            })
        },
        // 控制功能显示隐藏
        funListHideShow(listData){
            this.funData.forEach((item,index)=>{
                switch(index){
                    case 0:
                        item.isShow=listData.projectInfo==1?true:false;
                    case 1:
                        item.isShow=listData.personInfo==1?true:false;
                    case 2:
                        item.isShow=listData.monitor==1?true:false;
                    case 3:
                        item.isShow=listData.attendance==1?true:false;
                    case 4:
                        item.isShow=listData.salary==1?true:false;
                    case 5:
                        item.isShow=listData.device==1?true:false;
                    case 6:
                        item.isShow=listData.environment==1?true:false;
                    case 7:
                        item.isShow=listData.dangerProject==1?true:false;
                    case 8:
                        item.isShow=listData.hiddenDanger==1?true:false;
                    case 9:
                        item.isShow=listData.inspection==1?true:false;
                    case 10:
                        item.isShow=listData.supervisionReport==1?true:false;
                    case 11:
                        item.isShow=listData.warn==1?true:false;
                    case 12:
                        item.isShow=listData.material==1?true:false;
                    case 13:
                        item.isShow=listData.qualityAccept==1?true:false;
                    case 14:
                        item.isShow=listData.statisticsAnalysis==1?true:false;
                    case 15:
                        item.isShow=listData.seniorFun==1?true:false;
                    break;
                }
            })
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
