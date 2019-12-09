<template>
    <div class="application">
        <div class="funcLeft">
            <a-layout v-if='funcList' class="layOut">
                <a-menu
                    style="width:100%;"
                    :defaultSelectedKeys="['0']"
                    :defaultOpenKeys="['sub1']"
                    mode="inline"
                >
                    <a-sub-menu key="sub1">
                        <div slot="title">基本档案</div>
                        <a-menu-item key='0' v-if='funcList.basicBlock.projectInfo'><router-link :to='{name:"projectInfo"}'>项目档案</router-link></a-menu-item>
                        <a-menu-item key='1' v-if='funcList.basicBlock.companyInfo'><router-link :to='{name:"companyInfo"}'>企业档案</router-link></a-menu-item>
                        <a-menu-item key='2' v-if='funcList.basicBlock.supplierInfo'><router-link :to='{name:"supplier"}'>供应商档案</router-link></a-menu-item>            
                        <a-menu-item key='3' v-if='funcList.basicBlock.checkInfo'><router-link :to='{name:"inspection"}'>检验检测对照管理</router-link></a-menu-item>
                        <a-menu-item key='4' v-if='funcList.basicBlock.concrete'><router-link :to='{name:"concrete"}'>混凝土项目对照管理</router-link></a-menu-item>
                        <a-menu-item key='5' v-if='funcList.basicBlock.bigDeviceInfo'><router-link :to='{name:"equipment"}'>起重设备档案</router-link></a-menu-item>
                        <a-menu-item key='6' v-if='funcList.basicBlock.specialPersonInfo'><router-link :to='{name:"specialPersonnel"}'>特种设备人员档案</router-link></a-menu-item>
                    </a-sub-menu>
                    <!-- 原本是三级 改为二级 标签页嵌套 -->
                    <a-sub-menu key="sub2">
                        <div slot="title">项目报表</div>
                        <a-menu-item key='7' v-if='JSON.stringify(funcList.projectBlock.person)!="{}"'><router-link :to='{name:"realNameReport"}'>实名制管理报表</router-link></a-menu-item>
                        <a-menu-item key='8' v-if='JSON.stringify(funcList.projectBlock.salary)!="{}"'>民工薪资专户</a-menu-item>
                        <a-menu-item key='9' v-if='JSON.stringify(funcList.projectBlock.supervisorReport)!="{}"'>监理报告</a-menu-item>
                        <a-menu-item key='10' v-if='JSON.stringify(funcList.projectBlock.devices)!="{}"'>设备统计</a-menu-item>
                        <a-menu-item key='11' v-if='JSON.stringify(funcList.projectBlock.dataReport)!="{}"'>数据报告</a-menu-item>
                        <a-menu-item key='12' v-if='JSON.stringify(funcList.projectBlock.sign)!="{}"'>考勤数据</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <div slot="title">监理管理</div>
                        <a-menu-item key='13' v-if='funcList.supervisorBlock.supervisorReport'>项目监理报告</a-menu-item>
                        <a-menu-item key='14' v-if='funcList.supervisorBlock.supervisorReportOverview'>监理报告总览</a-menu-item>
                        <a-menu-item key='15' v-if='funcList.supervisorBlock.supervisorSign'>监理到岗</a-menu-item>
                        <a-menu-item key='16' v-if='funcList.supervisorBlock.supervisorReportTemplate'>监理报告模板</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub4">
                        <div slot="title">内容管理</div>
                        <a-menu-item key='17' v-if='funcList.contentBlock.noticeBlockManage'>公告模块</a-menu-item>
                        <a-menu-item key='18' v-if='funcList.contentBlock.noticeContentManage'>公告维护</a-menu-item>
                        <a-menu-item key='19' v-if='funcList.contentBlock.salary'>薪资专户</a-menu-item>
                        <a-menu-item key='20' v-if='funcList.contentBlock.person'>员工管理</a-menu-item>
                        <a-menu-item key='21' v-if='funcList.contentBlock.hideDanger'>危大工程</a-menu-item>
                        <a-menu-item key='22' v-if='funcList.contentBlock.inspection'>检测管理</a-menu-item>
                        <a-menu-item key='23' v-if='funcList.contentBlock.material'>建材管理</a-menu-item>
                        <a-menu-item key='24' v-if='funcList.contentBlock.quality'>质量管理</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub5">
                        <div slot="title">系统设置</div>
                        <a-menu-item key='25' v-if='funcList.systemBlock.users'>用户管理</a-menu-item>
                        <a-menu-item key='26' v-if='funcList.systemBlock.auth'>权限管理</a-menu-item>
                        <a-menu-item key='27' v-if='funcList.systemBlock.userLog'>用户日志</a-menu-item>
                        <a-menu-item key='28' v-if='funcList.systemBlock.warnRule'>预警规则</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout>   
        </div>
        <div class="funcRight">
            <router-view class="router"></router-view>
        </div>
    </div>
</template>
<script>
import {isLogin,relogin} from '../../utils/util_one'
export default {
    name:'application',
    data(){
        return{
            funcList:null
        }
    },
    created(){
        // 页面刷新后重定向
        if(this.$route.path !== '/webContent/application/projectInfo'){
            this.$router.replace('/webContent/application/projectInfo')
        }
    },
    mounted(){
        if(isLogin()){
            this.getAppList();
        }else{
            relogin(this)
        }
    },
    methods:{
        // 获取左侧功能列表
        getAppList(){
            this.$axios.post('/t_dz_managecenter/selectManagerCenterFun',{
                userId:100031
            }).then((res)=>{
                this.funcList=res.data[0]
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .application{
        height: 92%;
        width: 100%;
        display: flex;
        .funcLeft{
            width: 15%;
            height: 100%;
            overflow: auto;
            .layOut{
                width: 100%;
                height: 100%;
            }
        }
        .funcRight{
            width:85%;
            height:100%;
            overflow-y: auto;
            box-sizing: border-box;
            .router{
                width:100%;
                height:100%;
            }
        }
    }
</style>
