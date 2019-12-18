<template>
    <div class="supervisionReport">
        <a-breadcrumb>
            <a-breadcrumb-item>项目报表</a-breadcrumb-item>
            <a-breadcrumb-item>监理报告</a-breadcrumb-item>
        </a-breadcrumb>
        <a-tabs :defaultActiveKey="type" @change="pageChage">
            <!-- 监理报告统计 -->
            <a-tab-pane class="page" tab="监理报告统计" :key="1">
                <div class="buttons">
                    <a-button @click="searchSwitch=true">查询</a-button>
                    <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
                    <a-button style="margin:0 10px;" type="primary">打印</a-button>
                    <a-button>导出</a-button> 
                </div>
                <a-table class="table1" :columns="columns" :dataSource="list" :pagination='false'  bordered>   
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
                    <template slot="num" slot-scope="text,record,index">
                        <span>{{(index+1)}}</span>
                    </template>
                    <template  slot="status" slot-scope="text,record">
                        <span class="status" :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.projectStatus)}}</span>
                        <span class="status" v-if='record.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                        <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.demoProject==1?'示范':'非示范'}}</span>
                    </template>
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
            </a-tab-pane>
            <!-- 监理报告明细 -->
            <a-tab-pane class="page" tab="监理报告明细" :key="2">
                <div class="buttons">
                    <a-button @click="searchSwitch=true">查询</a-button>
                    <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
                    <a-button style="margin:0 10px;" type="primary">打印</a-button>
                    <a-button>导出</a-button> 
                </div>
                <a-table class="table2" :columns="columns2" :dataSource="list" :pagination='false'  bordered>   
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
                    <template slot="num" slot-scope="text,record,index">
                        <span>{{(index+1)}}</span>
                    </template>
                    <template  slot="status" slot-scope="text,record">
                        <span class="status" :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.projectStatus)}}</span>
                        <span class="status" v-if='record.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                        <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.demoProject==1?'示范':'非示范'}}</span>
                    </template>
                    <template  slot="position" slot-scope="text,record">
                        <div v-for="(value,key,index) in record.position" :key='"poi"+index'>{{key+':'+value}}</div>
                    </template>
                    <template  slot="posprojectStatusition" slot-scope="text">
                        <a-tooltip  placement="left" :title="text==0?'专报':'急报'">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text==0?'专报':'急报'}}</div>
                        </a-tooltip> 
                    </template>
                    <template slot="reportDate"  slot-scope="text">
                        <a-tooltip  placement="left" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="reportTitle"  slot-scope="text">
                        <a-tooltip  placement="left" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="chiefSupervisor"  slot-scope="text">
                        <a-tooltip  placement="left" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="reportAuthor"  slot-scope="text">
                        <a-tooltip  placement="left" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>    
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </a-tab-pane>
        </a-tabs>
        <!-- 查询界面 -->
        <div v-if="searchSwitch" class="searchBlock">
            <div class="bac" @click="searchSwitch=false"></div>
            <div class="cont">
                <div class="selects">
                    <span>项目状态：</span>
                    <div>
                        <a-select style="width:100%;" :defaultValue='show_searchData.projectStatus' @change="selectProjectStatus">
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
                        <a-select style="width:100%;" :defaultValue='show_searchData.projectName' @change="selectProjectName">
                            <a-select-option :value="item.projectName" v-for='(item,index) in projectList' :key="'pro'+index">{{item.projectName}}</a-select-option> 
                        </a-select>      
                    </div> 
                </div>  
                <div class="selects">
                    <span>建设单位：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData.buildingSide" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>监理单位：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData.supervisionUnit" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>施工单位：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData.constructionUnit" type="text">    
                    </div> 
                </div>
                <div class="buttons">
                    <a-button  @click="searchSwitch=false">取消</a-button> 
                    <a-button type="primary" @click="submitSearch()">查询</a-button>
                </div>
            </div>    
        </div> 
    </div>
</template>
<script>
import {projectStatus} from '../../../../utils/dataDictionary.js'
import {pullProjectLists} from '../../../../utils/pubFunc.js'
export default {
    data(){
        return{
            // 判断是否在查询
            isSearch:false,
            // 查询界面开关
            searchSwitch:false,
            // 标签页类型
            type:1,
            pageNum:1,
            pageSize:10,
            total:0,
            columns: [{
                title: '序号',
                align: 'center',
                scopedSlots: { customRender: 'num' },  
            },{
                title: '项目名称',
                align: 'center',
                dataIndex: 'projectName',
                scopedSlots: { customRender: 'projectName' },  
            },{
                title: '建设单位',
                align: 'center',
                dataIndex: 'buildingSide',
                scopedSlots: { customRender: 'buildingSide' },  
            },{
                title: '监理单位',
                align: 'center',
                dataIndex: 'supervisionUnit',
                scopedSlots: { customRender: 'supervisionUnit' },  
            },{
                title:'施工单位',
                align: 'center',
                dataIndex:"constructionUnit",
                scopedSlots: { customRender: 'constructionUnit' },  
            },{
                title:'状态',
                align: 'center',
                dataIndex:"status",
                scopedSlots: { customRender: 'status' },
            },{
                title:"专报",
                align: 'center',
                dataIndex:"zhuanBaoNum",
            },{
                title:"急报",
                align: 'center',
                dataIndex:"jiBaoNum",  
            },{
                title:"合计",
                align: 'center',
                dataIndex:"totalNum",  
            }],
            columns2: [{
                title: '序号',
                align: 'center',
                scopedSlots: { customRender: 'num' },  
            },{
                title: '项目名称',
                align: 'center',
                dataIndex: 'projectName',
                scopedSlots: { customRender: 'projectName' },  
            },{
                title: '建设单位',
                align: 'center',
                dataIndex: 'buildingSide',
                scopedSlots: { customRender: 'buildingSide' },  
            },{
                title: '监理单位',
                align: 'center',
                dataIndex: 'supervisionUnit',
                scopedSlots: { customRender: 'supervisionUnit' },  
            },{
                title:'施工单位',
                align: 'center',
                dataIndex:"constructionUnit",
                scopedSlots: { customRender: 'constructionUnit' },  
            },{
                title:'状态',
                align: 'center',
                dataIndex:"status",
                scopedSlots: { customRender: 'status' },
            },{
                title:'类型',
                align: 'center',
                dataIndex:"posprojectStatusition", 
                scopedSlots: { customRender: 'posprojectStatusition' },
            },{
                title:"报告日期",
                align: 'center',
                dataIndex:"reportDate",  
                scopedSlots: { customRender: 'reportDate' },
            },{
                title:"标题",
                align: 'center',
                dataIndex:"reportTitle",  
                scopedSlots: { customRender: 'reportTitle' },
            },{
                title:"监理人",
                align: 'center',
                dataIndex:"chiefSupervisor",  
                scopedSlots: { customRender: 'chiefSupervisor' },
            },{
                title:"报告人",
                align: 'center',
                dataIndex:"reportAuthor",  
                scopedSlots: { customRender: 'reportAuthor' },
            }],
            list:[],
            // 查询用数据
            searchData:{
                projectStatus:'',
                projectName:'',
                buildingSide:'',
                supervisionUnit:'',
                constructionUnit:''
            },
            show_searchData:{
                projectStatus:'',
                projectName:'',
                buildingSide:'',
                supervisionUnit:'',
                constructionUnit:''
            },
            // 项目列表
            projectList:[]
        }
    },
    mounted(){
        this.getReports();
    },
    watch:{
        'type':function(n,o){
            // 标签页切换都需要关闭查询
            this.isSearch=false;
            this.pageNum=1;
            this.getReports();
        },
        "searchSwitch":function(n,o){
            if(n){
                // 拉取项目列表
                pullProjectLists(this).then((res)=>{
                    this.projectList=res
                })
            }else{
                this.show_searchData={
                    projectStatus:'',
                    projectName:'',
                    buildingSide:'',
                    supervisionUnit:'',
                    constructionUnit:''
                }
                this.searchData={
                    projectStatus:'',
                    projectName:'',
                    buildingSide:'',
                    supervisionUnit:'',
                    constructionUnit:''
                }
            }
        }
    },
    methods:{
        // 获取监理报告列表
        getReports(){
            let url;
            switch(this.type){
                case 1:
                    url='/t_dz_supervisorreport/selectSupervisorReportStatistics'
                    break;
                case 2:
                    url='/t_dz_supervisorreport/selectSupervisorReport'
                    break;
            }
            this.$axios.post(url,{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                ...this.searchData
            }).then((res)=>{
                this.searchSwitch=false;
                this.list=res.data
                this.total=res.count
            })
        },
        //项目状态字典
        statuss(num){
            return projectStatus(num)
        },
        // 标签页分页
        pageChage(e){
            this.type=e
        },
        // 翻页
        preNextPage(e){
            this.pageNum=e
            // 判断是查询翻页还是普通翻页
            this.getReports();
        },
        // 查询项目状态选择
        selectProjectStatus(e){
            this.show_searchData.projectStatus=e
        },
        // 查询项目名称选择
        selectProjectName(e){
            this.show_searchData.projectName=e
        },
        // 提交查询
        submitSearch(){
            // if(!this.show_searchData.projectStatus){
            //     this.$message.warning('请选择项目状态')
            // }else if(!this.show_searchData.projectName){
            //     this.$message.warning('请选择项目名称')
            // }else if(!this.show_searchData.buildingSide){
            //     this.$message.warning('请输入建设单位')
            // }else if(!this.show_searchData.supervisionUnit){
            //     this.$message.warning('请输入监理单位')
            // }else if(!this.show_searchData.constructionUnit){
            //     this.$message.warning('请输入施工单位')
            // }else{
                // 如果查询时关闭状态下查询 清空页面参数
                if(!this.isSearch){
                    this.pageNum=1;
                }
                this.searchData=JSON.parse(JSON.stringify(this.show_searchData))
                this.getReports();
            // }           
        },
        reRequst(){
            this.pageNum=1;
            // 关闭查询
            this.isSearch=false;
            this.getReports();
        }
    }
}
</script>
<style lang="less" scoped>
    .supervisionReport{
        height: 100%;
        overflow-y: scroll;
        position: relative;
        .page{
            padding: 10px;
            .buttons{
                text-align: right;
                margin-bottom: 20px;
            }
        }
        .status{
            font-size: 10px!important;
            display:block!important;      
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .status:nth-of-type(2){
            margin: 5px 0;
        }
        .searchBlock{
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            left: 0;
            top: 0;
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
                .selects{
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    span{
                        width: 30%;
                    }
                    div{
                        width: 70%;
                        input{
                            border: 1px solid #d9d9d9;
                            height: 30px;
                            box-sizing: border-box;
                            border-radius: 4px;
                            padding: 11px;
                        }
                    }
                }
                .buttons{
                    margin: 0 auto;
                    width: 60%;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
    .pagination{
        text-align: right;
        margin-top: 10px;
    }
</style>