<template>
    <div class="inspection">
        <div class="inspectionTitle"><span @click="toList">检验检测项目</span> <span v-if='reportDetail'> / 详情</span></div>
        <div v-if='!reportDetail' class="inspectionList">
            <div class="head">
                <span>检验检测报告</span>
                <a-select :defaultValue="0" style="width: 240px" @change="typeChange">
                    <a-select-option v-for='(item,index) in reportType' :key='"reportType"+index' :value="index">{{item}}</a-select-option>
                </a-select>
            </div>
            <div class="cont">
                <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                    <template slot="detail" slot-scope="text,rows">
                        <a @click="toDetail(text,rows)">详情</a>
                    </template>
                </a-table>
                <a-pagination showQuickJumper  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </div>
        </div>
        <div v-else class="inspectionDetail">
            <div class="basicMsg">
                <div class="basicMsgTitle">基本信息</div>
                <div class="basicMsgCont">
                    <div>
                        <p><span>工程名称</span><span>{{213}}</span></p>
                        <p><span>结构部位</span><span>{{reportDetail.checkOptions}}</span></p>
                        <p><span>检测机构</span><span>{{reportDetail.checkCompany}}</span></p>
                        <p><span>委托单位</span><span>{{reportDetail.entrustUnit}}</span></p>
                        <p><span>生产厂家</span><span>{{reportDetail.manufacturer}}</span></p>
                        <p><span>委托日期</span><span>{{reportDetail.entrustDate}}</span></p>
                        <p><span>主检人</span><span>{{reportDetail.mainInspection}}</span></p>
                        <p><span>使用前状态</span><span>{{reportDetail.preUseStatus}}</span></p>
                        <p><span>检测结论</span><span>{{reportDetail.checkResult}}</span></p>
                    </div>
                    <div>
                        <p><span>检测项目</span><span>{{reportDetail.checkProject}}</span></p>
                        <p><span>监督单位</span><span>{{reportDetail.superviseUnit}}</span></p>
                        <p><span>建设单位</span><span>{{123}}</span></p>
                        <p><span>检测类别</span><span>{{reportDetail.checkCategory}}</span></p>
                        <p><span>检测日期</span><span>{{reportDetail.checkDate}}</span></p>
                        <p><span>报告日期</span><span>{{reportDetail.reportDate}}</span></p>
                        <p><span>副检人</span><span>{{reportDetail.deputyInspection}}</span></p>
                        <p><span>湿度</span><span>{{reportDetail.shiDu}}</span></p>
                        <p><span>使用后状态</span><span>{{reportDetail.afterUseStatus}}</span></p>
                        <p><span>结论状态</span><span>{{reportDetail.checkResultSratus}}</span></p>
                    </div>
                    <div>
                        <p><span>报告编号</span><span>{{reportDetail.checkNum}}</span></p>
                        <p><span>委托编号</span><span>{{reportDetail.entrustNum}}</span></p>
                        <p><span>样品编号</span><span>{{reportDetail.sampleNum}}</span></p>
                        <p><span>检测标准</span><span>{{reportDetail.checkStandard}}</span></p>
                        <p><span>审核日期</span><span>{{reportDetail.auditorDate}}</span></p>
                        <p><span>批准人</span><span>{{reportDetail.approver}}</span></p>
                        <p><span>审核人</span><span>{{reportDetail.auditor}}</span></p>
                        <p><span>温度</span><span>{{reportDetail.wenDu}}</span></p>
                        <p><span>唯一标识</span><span>{{reportDetail.uniqueId}}</span></p>
                        <p><span>检测参数</span><span>{{reportDetail.checkParams}}</span></p>
                    </div>
                </div>
            </div>
            <div class="sampling">
                <div class="samplingTitle">取样信息</div>
                <div class="samplingCont">
                    <div style="border:2px solid #eee">
                        <div class="msg">基本信息</div>
                        <div class="msgCont">
                            <div>
                                <p><span>工程名称</span><span>{{213}}</span></p>
                                <p><span>检测项目</span><span>{{reportDetail.checkProject}}</span></p>
                                <p><span>唯一标识</span><span>{{reportDetail.uniqueId}}</span></p>
                            </div>
                            <div>
                                <p><span>委托单位</span><span>{{reportDetail.entrustUnit}}</span></p>
                                <p><span>检测类别</span><span>{{reportDetail.checkCategory}}</span></p>
                                <p><span>报告编号</span><span>{{reportDetail.checkNum}}</span></p>                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            projectId:this.$route.params.projectId,
            reportType:[],
            type:0,
            reportDetail:null,
            pageNum:1,
            pageSize:10,
            total:0,
            list:[],
            columns:[{
                title: '报告编号',
                align: 'center',
                dataIndex: 'checkNum',
            }, {
                title: '机构名称',
                align: 'center',
                dataIndex: 'checkCompany',
                scopedSlots: { customRender: 'checkCompany' },
            }, {
                title: '报告日期',
                align: 'center',
                dataIndex: 'reportDate',
            },{
                title: '检验检测结构部位',
                align: 'center',
                dataIndex: 'checkOptions',
            },{
                title:'检测结论',
                align: 'center',
                dataIndex:"checkResult",
            },{
              title:'',
              align: 'center',
              dataIndex:"detail",  
              scopedSlots: { customRender: 'detail' },
            }]
        }
    },
    mounted(){
        this.getReportType();
    },
    methods:{
        // 获取监测报告的类型
        getReportType(){
            this.$axios.post('/t_dz_check/selectCheckReportType',{
                projectId:this.projectId
            }).then((res)=>{
                this.reportType=res.data
                // 获取到类型列表后获取报告列表
                this.getSelectCheck()
            })
        },
        // 获取对应类型的检测报告
        getSelectCheck(){
            this.$axios.post('/t_dz_check/selectCheck',{
                projectId:this.projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                type:this.type
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
            })
        },
        // 报告类型切换
        typeChange(e){
            this.type=e;
            this.pageNum=1;   
            this.getSelectCheck();
        },
        // 下一页
        preNextPage(e){
            this.pageNum=e
            this.getSelectCheck();
        },
        // 返回列表
        toList(){
            this.reportDetail=null
        },
        // 报告详情
        toDetail(text, rows){
            this.reportDetail=rows
        }
    }
}
</script>
<style lang="less" scoped>
    .inspection{
        height: 100%;
        overflow-y: scroll;
        padding-top: 10px;   
        .inspectionTitle{
            font-size: 14px;
            margin-bottom: 10px;
            span:nth-of-type(1){
                cursor: pointer;
            }
        }
        .inspectionList{
            .head{
                background: #fff;
                padding: 20px;
                margin-bottom: 2px;
                span{
                    font-size: 16px;
                    font-weight: 600;
                    margin-right: 40px;
                }
            }
            .cont{
                padding: 20px;
                background:#fff;
                .pagination{
                    text-align: right;
                    margin-top: 10px;
                }
            }
        }
        .inspectionDetail{
            .basicMsg{
                margin-bottom: 20px;
                .basicMsgTitle{
                    padding: 20px;
                    background: #fff;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                .basicMsgCont{
                    background: #fff;
                    padding: 30px 20px;
                    display: flex;
                    justify-content: space-between;
                    div{
                        flex: 1;
                        p{
                            font-size: 14px;
                            line-height: 28px;
                            margin:0 0 20px 0;
                            span:nth-of-type(1){
                                margin-right: 20px;
                                font-weight: 600;
                            }
                        }
                    }
                    div:nth-of-type(2){
                        margin-left:20px;
                    }
                }
            }
            .sampling{
                .samplingTitle{
                    padding: 20px;
                    background: #fff;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                .samplingCont{
                    padding: 20px;
                    background: #fff;
                    box-sizing: border-box;
                    .msg{
                        border-bottom: 2px solid #eee;
                        padding: 20px;
                    }
                    .msgCont{
                        background: #fff;
                        padding: 30px 20px;
                        display: flex;
                        justify-content: space-between;
                        div{
                            flex: 1;
                            p{
                                font-size: 14px;
                                line-height: 28px;
                                margin:0 0 20px 0;
                                span:nth-of-type(1){
                                    margin-right: 20px;
                                    font-weight: 600;
                                }
                            }
                        }
                        div:nth-of-type(2){
                            margin-left:20px;
                        }
                    }
                }
            }   
        }
    }
</style>