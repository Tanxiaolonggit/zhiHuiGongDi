<template>
    <div class="realName">
        <a-tabs :defaultActiveKey="type" @change="pageChage">
            <!-- 按类别 -->
            <a-tab-pane class="page" tab="按类别" :key="1">
                <div class="buttons">
                    <a-button>查询</a-button>
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
                        <span class="status" :style="{background:record.status.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.status.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.status.projectStatus)}}</span>
                        <span class="status" v-if='record.status.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                        <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.status.demoProject==1?'示范':'非示范'}}</span>
                    </template>
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
            </a-tab-pane>
            <!-- 按岗位 -->
            <a-tab-pane class="page" tab="按岗位" :key="2">
                <div class="buttons">
                    <a-button>查询</a-button>
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
                        <span class="status" :style="{background:record.status.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.status.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.status.projectStatus)}}</span>
                        <span class="status" v-if='record.status.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                        <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.status.demoProject==1?'示范':'非示范'}}</span>
                    </template>
                    <template  slot="position" slot-scope="text,record">
                        <div v-for="(value,key,index) in record.position" :key='"poi"+index'>{{key+':'+value}}</div>
                    </template>
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </a-tab-pane>
            <!-- 按工种 -->
            <a-tab-pane class="page" tab="按工种" :key="3">
                <div class="buttons">
                    <a-button>查询</a-button>
                    <a-button style="margin:0 10px;" type="primary">打印</a-button>
                    <a-button>导出</a-button> 
                </div>
                <a-table class="table2" :columns="columns3" :dataSource="list" :pagination='false'  bordered>   
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
                        <span class="status" :style="{background:record.status.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.status.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.status.projectStatus)}}</span>
                        <span class="status" v-if='record.status.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                        <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.status.demoProject==1?'示范':'非示范'}}</span>
                    </template>
                    <template  slot="technicalType" slot-scope="text,record">
                        <div v-for="(value,key,index) in record.technicalType" :key='"poi"+index'>{{gangWei(key)+':'+value}}</div>
                    </template>
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import {projectStatus,technicalTypes} from '../../../../utils/dataDictionary.js'
export default {
    data(){
        return{
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
                title:"建设单位人数",
                align: 'center',
                dataIndex:"buildingSideNum",
            },{
                title:"施工单位人数",
                align: 'center',
                dataIndex:"constructionUnitNum",  
            },{
                title:"作业人数",
                align: 'center',
                dataIndex:"workerNum",  
            },{
                title:"总人数",
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
                title:'岗位及人数',
                align: 'center',
                dataIndex:"position", 
                scopedSlots: { customRender: 'position' },
            },{
                title:"总人数",
                align: 'center',
                dataIndex:"totalNum",  
            }],
            columns3: [{
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
                title:'岗位及人数',
                align: 'center',
                dataIndex:"technicalType", 
                scopedSlots: { customRender: 'technicalType' },
            },{
                title:"总人数",
                align: 'center',
                dataIndex:"totalNum",  
            }],
            list:[]
        }
    },
    watch:{
        'type':function(n,o){
            this.pageNum=1;
            this.getRealName();
        }
    },
    mounted(){
        this.getRealName();
    },
    methods:{
        // 获取实名制管理报表
        getRealName(){
            let url;
            switch(this.type){
                case 1:
                    url='/t_dz_person/selectPersonReportByClass'
                    break;
                case 2:
                    url='/t_dz_person/selectPersonReportByPosition'
                    break;
                case 3:
                    url='/t_dz_person/selectPersonReportByTecType'
                    break;
            }
            this.$axios.post(url,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                res.data.forEach((item)=>{
                    item.status=JSON.parse(item.status)
                    if(this.type==2){
                        item.position=JSON.parse(item.position)
                    }else if(this.type==3){
                        item.technicalType=JSON.parse(item.technicalType)
                    }
                })
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
        preNextPage(){
            this.pageNum=e
        },
        //岗位数组字典
        gangWei(num){
            return technicalTypes(num)
        }
    }
}
</script>
<style lang="less" scoped>
    .realName{
        height: 100%;
        overflow-y: scroll;
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
    }
    .pagination{
        text-align: right;
        margin-top: 10px;
    }
</style>