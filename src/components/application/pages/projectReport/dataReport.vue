<template>
    <div class="dataReport">
        <a-breadcrumb>
            <a-breadcrumb-item>项目报表</a-breadcrumb-item>
            <a-breadcrumb-item>数据报告</a-breadcrumb-item>
        </a-breadcrumb>
        <a-tabs :defaultActiveKey="type" @change="pageChage">
            <!-- 项目数据汇总 -->
            <a-tab-pane class="page" v-for="(item,index) in 5" :tab="index==0?'项目数据汇总':index==1?'项目数据（安监）':index==2?'项目数据（质监）':index==3?'项目数据（清欠）':'项目数据（建管）'" :key="index">
                <div class="buttons">
                    <a-button @click="searchSwitch=true">查询</a-button>
                   <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
                </div>
                <a-table
                    :loading='isLoading' class="table1" :columns="index==0?columns0:index==1?columns1:index==2?columns2:index==3?columns3:columns4" :dataSource="list" :pagination='false'  bordered
                >
                    <template slot="projectName"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="buildingSide"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="supervisionUnit"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="constructionUnit"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="projectStatus"  slot-scope="text">
                        <a-tooltip  placement="right" :title="statuss(text)">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{statuss(text)}}</div>
                        </a-tooltip>   
                    </template>        
                    <template slot="chiefSupervisor"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{statuss(text)}}</div>
                        </a-tooltip>   
                    </template>  
                </a-table>
            </a-tab-pane>
        </a-tabs>
        <div v-if="searchSwitch" class="switchModal">
            <div class="bac" @click="qixiao()"></div>
            <div class="cont" >
                <div class="selects">
                    <span>项目状态：</span>
                    <div>
                        <a-select
                        style="width:100%;"
                        :defaultValue="searchData.projectStatus"
                        @change="selectProjectStatus"
                        >
                        <a-select-option value="1">筹备</a-select-option>
                        <a-select-option value="3">在建</a-select-option>
                        <a-select-option value="4">完工</a-select-option>
                        <a-select-option value="5">停工</a-select-option>
                        </a-select>
                    </div>
                </div>
                <div class="selects">
                    <span>项目名称：</span>
                    <div>
                        <input style="width:100%" v-model="searchData.projectName" type="text" />
                    </div>
                </div>
                <div class="selects">
                    <span>建设单位：</span>
                    <div>
                        <input style="width:100%" v-model="searchData.buildingSide" type="text" />
                    </div>
                </div>
                <div class="selects">
                    <span>监理单位：</span>
                    <div>
                        <input style="width:100%" v-model="searchData.supervisionUnit" type="text" />
                    </div>
                </div>
                <div class="selects">
                    <span>施工单位：</span>
                    <div>
                        <input style="width:100%" v-model="searchData.constructionUnit" type="text" />
                    </div>
                </div>
                <div class="buttons">
                    <a-button @click="qixiao()">取消</a-button>
                    <a-button type="primary" @click="submitSearch()">查询</a-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {projectStatus} from "../../../../utils/dataDictionary.js";
export default {
    data(){
        return{
            type:0,
            pageNum:1,
            pageSize:10,
            total:0,
            isLoading:false,
            searchData:{
                projectStatus:'',
                projectName:'',
                buildingSide:'',//建设
                supervisionUnit:'',//监理
                constructionUnit:'',//施工
            },
            searchSwitch:false,
            list:[],
            columns0:[],
            columns1:[
                {
                    title: "项目名称",
                    align: "center",
                    dataIndex: "projectName",
                    scopedSlots: { customRender: "projectName" }
                },
                {
                    title: "建设单位",
                    align: "center",
                    dataIndex: "buildingSide",
                    scopedSlots: { customRender: "buildingSide" }
                },
                {
                    title: "监理单位",
                    align: "center",
                    dataIndex: "supervisionUnit",
                    scopedSlots: { customRender: "supervisionUnit" }
                },
                {
                    title: "施工单位",
                    align: "center",
                    dataIndex: "constructionUnit",
                    scopedSlots: { customRender: "constructionUnit" }
                },
                {
                    title: "项目状态",
                    align: "center",
                    dataIndex: "projectStatus",
                    scopedSlots: { customRender: "projectStatus" }
                },
                {
                    title: "管理人员",
                    align: "center",
                    dataIndex: "guanLiRenYuan",
                },
                {
                    title: "作业工人",
                    align: "center",
                    dataIndex: "zuoYeRenYuan",
                },
                {
                    title: "考勤",
                    align: "center",
                    dataIndex: "signDeviceNum",
                },
                {
                    title: "视频监控摄像",
                    align: "center",
                    dataIndex: "videoNum",
                },
                {
                    title: "环境监测",
                    align: "center",
                    dataIndex: "environmentDeviceNum",
                },
                {
                    title: "升降机登记",
                    align: "center",
                    dataIndex: "sjjNum",
                },
                {
                    title: "升降机黑匣子",
                    align: "center",
                    dataIndex: "sjjHxz",
                },
                {
                    title: "塔吊登记",
                    align: "center",
                    dataIndex: "qzjNum",
                },
                {
                    title: "塔吊黑匣子",
                    align: "center",
                    dataIndex: "qzjHxz",
                },
                {
                    title: "危大工程",
                    align: "center",
                    dataIndex: "dangerProjectNum",
                },
                {
                    title: "监督员",
                    align: "center",
                    dataIndex: "chiefSupervisor",
                    scopedSlots: { customRender: "chiefSupervisor" }
                },
            ],
            columns2:[
                {
                    title: "项目名称",
                    align: "center",
                    dataIndex: "projectName",
                    scopedSlots: { customRender: "projectName" }
                },
                {
                    title: "建设单位",
                    align: "center",
                    dataIndex: "buildingSide",
                    scopedSlots: { customRender: "buildingSide" }
                },
                {
                    title: "监理单位",
                    align: "center",
                    dataIndex: "supervisionUnit",
                    scopedSlots: { customRender: "supervisionUnit" }
                },
                {
                    title: "施工单位",
                    align: "center",
                    dataIndex: "constructionUnit",
                    scopedSlots: { customRender: "constructionUnit" }
                },
                {
                    title: "项目状态",
                    align: "center",
                    dataIndex: "projectStatus",
                    scopedSlots: { customRender: "projectStatus" }
                },
                {
                    title: "管理人员",
                    align: "center",
                    dataIndex: "guanLiRenYuan",
                },
                {
                    title: "作业工人",
                    align: "center",
                    dataIndex: "zuoYeRenYuan",
                },
                {
                    title: "考勤",
                    align: "center",
                    dataIndex: "signDeviceNum",
                },
                {
                    title: "视频监控摄像",
                    align: "center",
                    dataIndex: "videoNum",
                },
                {
                    title: "环境监测",
                    align: "center",
                    dataIndex: "environmentDeviceNum",
                },
                {
                    title: "检测报告",
                    align: "center",
                    dataIndex: "checkNum",
                },
                {
                    title: "监理报告",
                    align: "center",
                    dataIndex: "supervisorReportNum",
                },
                {
                    title: "建材",
                    align: "center",
                    dataIndex: "materialReportNum",
                },
                {
                    title: "监督员",
                    align: "center",
                    dataIndex: "chiefSupervisor",
                    scopedSlots: { customRender: "chiefSupervisor" }
                },
            ],
            columns3:[
                {
                    title: "项目名称",
                    align: "center",
                    dataIndex: "projectName",
                    scopedSlots: { customRender: "projectName" }
                },
                {
                    title: "建设单位",
                    align: "center",
                    dataIndex: "buildingSide",
                    scopedSlots: { customRender: "buildingSide" }
                },
                {
                    title: "监理单位",
                    align: "center",
                    dataIndex: "supervisionUnit",
                    scopedSlots: { customRender: "supervisionUnit" }
                },
                {
                    title: "施工单位",
                    align: "center",
                    dataIndex: "constructionUnit",
                    scopedSlots: { customRender: "constructionUnit" }
                },
                {
                    title: "项目状态",
                    align: "center",
                    dataIndex: "projectStatus",
                    scopedSlots: { customRender: "projectStatus" }
                },
                {
                    title: "管理人员",
                    align: "center",
                    dataIndex: "guanLiRenYuan",
                },
                {
                    title: "作业工人",
                    align: "center",
                    dataIndex: "zuoYeRenYuan",
                },
                {
                    title: "考勤",
                    align: "center",
                    dataIndex: "signDeviceNum",
                },
                {
                    title: "工资专户",
                    align: "center",
                    dataIndex: "accountNum", 
                },
                {
                    title: "视频监控摄像",
                    align: "center",
                    dataIndex: "videoNum",
                },
                {
                    title: "监督员",
                    align: "center",
                    dataIndex: "chiefSupervisor",
                    scopedSlots: { customRender: "chiefSupervisor" }
                },
            ],
            columns4:[
                {
                    title: "项目名称",
                    align: "center",
                    dataIndex: "projectName",
                    scopedSlots: { customRender: "projectName" }
                },
                {
                    title: "建设单位",
                    align: "center",
                    dataIndex: "buildingSide",
                    scopedSlots: { customRender: "buildingSide" }
                },
                {
                    title: "监理单位",
                    align: "center",
                    dataIndex: "supervisionUnit",
                    scopedSlots: { customRender: "supervisionUnit" }
                },
                {
                    title: "施工单位",
                    align: "center",
                    dataIndex: "constructionUnit",
                    scopedSlots: { customRender: "constructionUnit" }
                },
                {
                    title: "项目状态",
                    align: "center",
                    dataIndex: "projectStatus",
                    scopedSlots: { customRender: "projectStatus" }
                },
                {
                    title: "管理人员",
                    align: "center",
                    dataIndex: "guanLiRenYuan",
                },
                {
                    title: "作业工人",
                    align: "center",
                    dataIndex: "zuoYeRenYuan",
                },
                {
                    title: "app采集人数",
                    align: "center",
                    dataIndex: "appUseNum",
                },
                {
                    title: "app考勤人次",
                    align: "center",
                    dataIndex: "appSignNum",
                },
                {
                    title: "总考勤人次",
                    align: "center",
                    dataIndex: "signNum",
                },
                {
                    title: "视频监控摄像",
                    align: "center",
                    dataIndex: "videoNum",
                }
            ],
        }
    },
    watch:{
        "type":function(n,o){
            this.pageNum=1;
            this.searchData={
                projectStatus:'',
                projectName:'',
                buildingSide:'',//建设
                supervisionUnit:'',//监理
                constructionUnit:'',//施工
            }
            this.getReportData();
        }
    },
    mounted(){
        this.getReportData();
    },
    methods:{
        getReportData(){
            this.isLoading=true
            let url;
            switch(Number(this.type)){
                case 0:
                    url='/t_dz_dataReport/selectTotalDataReport';
                    break;
                case 1:
                    url='/t_dz_dataReport/selectAnJianDataReport';
                    break;
                case 2:
                    url='/t_dz_dataReport/selectZhiJianDataReport';
                    break;
                case 3:
                    url='/t_dz_dataReport/selectQingQianDataReport';
                    break;
                case 4:
                    url='/t_dz_dataReport/selectJianGuanDataReport';
                    break;
            }
            this.$axios.post(url,{
                ...this.searchData,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.isLoading=false;
                this.total=res.count;
                this.list=res.data;
                this.searchSwitch=false;
                console.log(res)
            })
        },
        pageChage(e){
            this.type=e;
        },
        // 查询项目状态选择
        selectProjectStatus(e){
            this.searchData.projectStatus = e;
        },
        // 查询界面点击查询
        submitSearch(){
            this.getReportData();
        },
        // 取消
        qixiao(){
            this.searchSwitch=false;
            this.searchData={
                projectStatus:'',
                projectName:'',
                buildingSide:'',//建设
                supervisionUnit:'',//监理
                constructionUnit:'',//施工
            }
        },
        // 刷新
        reRequst(){
            this.pageNum = 1;
            this.searchData={
                projectStatus:'',
                projectName:'',
                buildingSide:'',//建设
                supervisionUnit:'',//监理
                constructionUnit:'',//施工
            }
            this.getReportData();
        },
        //项目状态
        statuss(num){
            return projectStatus(num);
        }
    }
}
</script>
<style lang="less" scoped>
    .dataReport{
        height: 100%;
        position: relative;
        .page{
            padding:0 10px;
            box-sizing: border-box;
            .buttons{
                text-align: right;
                margin-bottom: 20px;
            }
        }
        .switchModal{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            .bac{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background: rgba(0, 0, 0, 0.5);
            }
            .cont{
                background: #fff;
                position: absolute;
                width: 40%;
                left: 50%;
                top: 20%;
                transform: translateX(-50%) ;
                box-sizing: border-box;
                padding:20px 40px;
                border-radius: 4px;
                .selects {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    span {
                        width:30%;
                    }
                    div {
                        width: 70%;
                        input {
                            border: 1px solid #d9d9d9;
                            height: 30px;
                            box-sizing: border-box;
                            border-radius: 4px;
                            padding: 11px;
                        }
                    }
                }
                .buttons {
                    margin: 0 auto;
                    width: 60%;
                    display: flex;
                    justify-content: space-between;
                }
            }            
        }
    }
</style>