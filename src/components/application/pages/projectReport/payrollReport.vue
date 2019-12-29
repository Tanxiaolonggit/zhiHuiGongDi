<template>
    <div class="payrollReport">
        <a-breadcrumb>
            <a-breadcrumb-item>项目报表</a-breadcrumb-item>
            <a-breadcrumb-item>实名制管理报表</a-breadcrumb-item>
        </a-breadcrumb>
        <a-tabs :defaultActiveKey="type" @change="pageChage">
            <!-- 工资专户 -->
            <a-tab-pane class="page" tab="工资专户" :key="1">
                <div class="buttons">
                    <a-button @click="searchSwitch=true">查询</a-button>
                    <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
                    <a-button style="margin:0 10px;" type="primary">打印</a-button>
                    <a-button>导出</a-button> 
                </div>
                <a-table :loading='isLoading' class="table1" :columns="columns" :dataSource="list" :pagination='false'  bordered>  
                    <template slot="num" slot-scope="text,record,index">
                        <span>{{(index+1)}}</span>
                    </template> 
                    <template slot="xiangqing" slot-scope="text,record,index">
                        <a @click="getDetail(record,1)">详情</a>
                    </template> 
                    <template slot="salaryBank"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryAccountName"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryCompanyAccount"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="transBalance"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="updateTime"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salarySource"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
            </a-tab-pane>
            <!-- 工资发放 -->
            <a-tab-pane class="page" tab="工资发放" :key="2">
                <div class="buttons">
                    <a-button @click="searchSwitch=true">查询</a-button>
                    <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
                    <a-button style="margin:0 10px;" type="primary">打印</a-button>
                    <a-button>导出</a-button> 
                </div>
                <a-table :loading='isLoading' class="table2" :columns="columns2" :dataSource="list" :pagination='false'  bordered>   
                    <template slot="num" slot-scope="text,record,index">
                        <span>{{(index+1)}}</span>
                    </template> 
                    <template slot="xiangqing" slot-scope="text,record,index">
                        <a @click="getDetail(record,2)">详情</a>
                    </template> 
                    <template slot="salaryBank"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryAccountName"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryCompanyAccount"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                </a-table>
                <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
            </a-tab-pane>
            <!-- 项目专户 -->
            <a-tab-pane class="page" tab="项目专户" :key="3">
                <div class="buttons">
                    <a-button @click="searchSwitch=true">查询</a-button>
                    <a-button style="margin-left:10px;" @click="reRequst()">刷新</a-button>
                    <a-button style="margin:0 10px;" type="primary">打印</a-button>
                    <a-button>导出</a-button> 
                </div>
                <a-table :loading='isLoading' class="table2" :columns="columns3" :dataSource="list" :pagination='false'  bordered> 
                    <template slot="num" slot-scope="text,record,index">
                        <span>{{(index+1)}}</span>
                    </template>  
                    <template slot="constructionUnit"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="projectName"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryBank"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryAccountName"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
                            <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                        </a-tooltip>   
                    </template>
                    <template slot="salaryCompanyAccount"  slot-scope="text">
                        <a-tooltip  placement="right" :title="text">
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
            <div v-if="type==1" class="cont">
                <div class="selects">
                    <span>银行名称:</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData1.salaryBank" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>账户名称：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData1.salaryAccountName" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>账户编码：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData1.salaryCompanyAccount" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>开户单位：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData1.salarySource" type="text">    
                    </div> 
                </div>
                <div class="buttons">
                    <a-button  @click="searchSwitch=false">取消</a-button> 
                    <a-button type="primary" @click="submitSearch()">查询</a-button>
                </div>
            </div>    
            <div v-else-if="type==2" class="cont">
                <div class="selects">
                    <span>银行名称:</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData2.salaryBank" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>账户名称：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData2.salaryAccountName" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>账户编码：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData2.salaryCompanyAccount" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>发放日期：</span>
                    <div>
                        <a-range-picker style="width:100%;" @change="checkDate" />    
                    </div> 
                </div>
                <div class="buttons">
                    <a-button  @click="searchSwitch=false">取消</a-button> 
                    <a-button type="primary" @click="submitSearch()">查询</a-button>
                </div>
            </div>
            <div v-else-if="type==3" class="cont">
                <div class="selects">
                    <span>银行名称:</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData3.salaryBank" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>账户名称：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData3.salaryAccountName" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>账户编码：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData3.salaryCompanyAccount" type="text">    
                    </div> 
                </div>
                <div class="selects">
                    <span>项目名称：</span>
                    <div>
                        <a-select style="width:100%;" :defaultValue='show_searchData3.projectName' @change="selectProjectName">
                            <a-select-option :value="item.projectName" v-for='(item,index) in projectList' :key="'pro'+index">{{item.projectName}}</a-select-option> 
                        </a-select>      
                    </div> 
                </div>  
                <div class="selects">
                    <span>施工单位：</span>
                    <div>
                        <input style="width:100%" v-model="show_searchData3.constructionUnit" type="text">    
                    </div> 
                </div>
                <div class="buttons">
                    <a-button  @click="searchSwitch=false">取消</a-button> 
                    <a-button type="primary" @click="submitSearch()">查询</a-button>
                </div>
            </div>
        </div> 
        <div v-if="detail" class="searchBlock">
            <div class="bac" @click="detail=false"></div>
            <div class="cont2" >
                <div v-if="type==1" >
                    <a-table :loading='isLoading2'  :columns="columns4" :dataSource="list2" :pagination='false'  bordered>
                        <template slot="num" slot-scope="text,record,index">
                            <span>{{(index+1)}}</span>
                        </template> 
                        <template slot="transTime"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                        <template slot="salaryAccountName"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                        <template slot="salaryCompanyAccount"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template>  
                        <template slot="receiverAccount"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                        <template slot="transType"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text==0?'收入':'支出'}}</div>
                            </a-tooltip>   
                        </template> 
                        <template slot="transAmount"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                        <template slot="transBalance"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                        <template slot="remark"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                    </a-table>
                    <a-pagination showQuickJumper class="pagination" @change='preNextPage2' :defaultCurrent="pageNum2" :defaultPageSize="pageSize2" :total="total2" />
                </div>
                <div  v-else-if="type==2">
                    <a-table :loading='isLoading2'  :columns="columns5" :dataSource="list2" :pagination='false'  bordered>
                        <template slot="num" slot-scope="text,record,index">
                            <span>{{(index+1)}}</span>
                        </template> 
                        <template slot="salaryOutTime"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template>  
                        <template slot="name"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template>  
                        <template slot="salarySelfAccount"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template>  
                        <template slot="totalPayAmount"  slot-scope="text">
                            <a-tooltip  placement="right" :title="text">
                                <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                            </a-tooltip>   
                        </template> 
                    </a-table>
                    <a-pagination showQuickJumper class="pagination" @change='preNextPage2' :defaultCurrent="pageNum2" :defaultPageSize="pageSize2" :total="total2" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {serverTimestamp} from '../../../../utils/util_one.js'
import {pullProjectLists} from '../../../../utils/pubFunc.js'
export default {
    data(){
        const that=this
        return{
            // 详情是否展示
            detail:false,
            // 是否加载中
            isLoading:false,
            // 详情是否显示i加载中
            isLoading2:false,
            // 判断是否在查询
            isSearch:false,
            // 查询界面开关
            searchSwitch:false,
            // 标签页类型
            type:1,
            pageNum:1,
            pageSize:10,
            total:0,
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    scopedSlots: { customRender: 'num' },  
                },
                {
                    title: '银行名称',
                    align: 'center',
                    dataIndex: 'salaryBank',
                    scopedSlots: { customRender: 'salaryBank' },  
                },
                {
                    title: '账户名称',
                    align: 'center',
                    dataIndex: 'salaryAccountName',
                    scopedSlots: { customRender: 'salaryAccountName' }, 
                },
                {
                    title: '账户编码',
                    align: 'center',
                    dataIndex: 'salaryCompanyAccount',
                    scopedSlots: { customRender: 'salaryCompanyAccount' }, 
                },
                {
                    title: '账户余额',
                    align: 'center',
                    dataIndex: 'transBalance',
                    scopedSlots: { customRender: 'transBalance' }, 
                },
                {
                    title: '更新时间',
                    align: 'center',
                    dataIndex: 'updateTime',
                    scopedSlots: { customRender: 'updateTime' }, 
                },
                {
                    title: '开户单位',
                    align: 'center',
                    dataIndex: 'salarySource',
                    scopedSlots: { customRender: 'salarySource' }, 
                },
                {
                    title: '账户流水',
                    align: 'center',
                    scopedSlots: { customRender: 'xiangqing' }, 
                }
            ],
            columns2: [
                {
                    title: '序号',
                    align: 'center',
                    scopedSlots: { customRender: 'num' },  
                },
                {
                    title: '银行名称',
                    align: 'center',
                    dataIndex: 'salaryBank',
                    scopedSlots: { customRender: 'salaryBank' },  
                },
                {
                    title: '账户名称',
                    align: 'center',
                    dataIndex: 'salaryAccountName',
                    scopedSlots: { customRender: 'salaryAccountName' }, 
                },
                {
                    title: '账户编码',
                    align: 'center',
                    dataIndex: 'salaryCompanyAccount',
                    scopedSlots: { customRender: 'salaryCompanyAccount' }, 
                },
                {
                    title: '发放金额',
                    align: 'center',
                    dataIndex: 'transAmount',
                    scopedSlots: { customRender: 'transAmount' }, 
                },
                {
                    title: '发放人数',
                    align: 'center',
                    dataIndex: 'count',
                    scopedSlots: { customRender: 'count' }, 
                },
                {
                    title: '发放流水',
                    align: 'center',
                    scopedSlots: { customRender: 'xiangqing' }, 
                }
            ],
            columns3: [
                {
                    title: '序号',
                    align: 'center',
                    scopedSlots: { customRender: 'num' },  
                },
                {
                    title: '项目名称',
                    align: 'center',
                    dataIndex:'projectName',
                    scopedSlots: { customRender: 'projectName' },
                },
                {
                    title: '施工单位',
                    align: 'center',
                    dataIndex:'constructionUnit',
                    scopedSlots: { customRender: 'constructionUnit' },
                },
                {
                    title: '账户名称',
                    align: 'center',
                    dataIndex:'salaryAccountName',
                    scopedSlots: { customRender: 'salaryAccountName' },
                },
                {
                    title: '账户编码',
                    align: 'center',
                    dataIndex:'salaryCompanyAccount',
                    scopedSlots: { customRender: 'salaryCompanyAccount' },
                },
                {
                    title: '银行名称',
                    align: 'center',
                    dataIndex:'salaryBank',
                    scopedSlots: { customRender: 'salaryBank' },
                }
            ],
            list:[],
            // 查询用数据1
            searchData1:{
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salarySource:''
            },
            show_searchData1:{
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salarySource:''
            },
             // 查询用数据2
            searchData2:{
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salaryOutTimeBegin:'',
                salaryOutTimeEnd:''
            },
            show_searchData2:{
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salaryOutTimeBegin:'',
                salaryOutTimeEnd:''
            },
             // 查询用数据3
            searchData3:{
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                projectStatus:'',
                constructionUnit:''
            },
            show_searchData3:{
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                projectStatus:'',
                constructionUnit:''
            },
            // 项目列表
            projectList:[],
            // 详情页
            pageNum2:1,
            pageSize2:10,
            total2:0,
            list2:[],
            // 用于查找的地址
            urls:null,
            // 用于查找的详情数据
            detailData:null,
            columns4:[
                {
                    title: '序号',
                    align: 'center',
                    scopedSlots: { customRender: 'num' },  
                },
                {
                    title:'业务日期',
                    align:'center',
                    dataIndex: 'transTime',
                    scopedSlots: { customRender: 'transTime' }, 
                },
                {
                    title:'账户名称',
                    align:'center',
                    dataIndex: 'salaryAccountName',
                    scopedSlots: { customRender: 'salaryAccountName' }, 
                },
                {
                    title:'账户编码',
                    align:'center',
                    dataIndex: 'salaryCompanyAccount',
                    scopedSlots: { customRender: 'salaryCompanyAccount' }, 
                },
                {
                    title:'对方账户',
                    align:'center',
                    dataIndex: 'receiverAccount',
                    scopedSlots: { customRender: 'receiverAccount' }, 
                },
                {
                    title:'交易类型',
                    align:'center',
                    dataIndex: 'transType',
                    scopedSlots: { customRender: 'transType' }, 
                },
                {
                    title:'交易金额',
                    align:'center',
                    dataIndex: 'transAmount',
                    scopedSlots: { customRender: 'transAmount' }, 
                },
                {
                    title:'交易余额',
                    align:'center',
                    dataIndex: 'transBalance',
                    scopedSlots: { customRender: 'transBalance' }, 
                },
                {
                    title:'附言',
                    align:'center',
                    dataIndex: 'remark',
                    scopedSlots: { customRender: 'remark' }, 
                }
            ],
            "columns5":[
                 {
                    title: '序号',
                    align: 'center',
                    scopedSlots: { customRender: 'num' },  
                },
                {
                    title:'业务日期',
                    align:'center',
                    dataIndex: 'salaryOutTime',
                    scopedSlots: { customRender: 'salaryOutTime' }, 
                },
                {
                    title:'姓名',
                    align:'center',
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' }, 
                },
                {
                    title:'账户编码',
                    align:'center',
                    dataIndex: 'salarySelfAccount',
                    scopedSlots: { customRender: 'salarySelfAccount' }, 
                },
                {
                    title:'金额',
                    align:'center',
                    dataIndex: 'totalPayAmount',
                    scopedSlots: { customRender: 'totalPayAmount' }, 
                },
            ]
        }
    },
    mounted(){
        this.getSalaryList();
    },
    watch:{
        'type':function(n,o){
            this.clearSeachData();
            this.pageNum=1;
            this.getSalaryList();
        },
        "searchSwitch":function(n,o){
            if(n){
                if(this.type==3){
                     // 拉取项目列表
                    pullProjectLists(this).then((res)=>{
                        this.projectList=res
                    })
                }
            }else{
                this.clearSeachData();
            }
        },
        "detail":function(n,o){
            if(!n){
                this.pageNum2=1;
                this.list2=[]
                this.urls=null;
                this.detailData=null
            }
        }
    },
    methods:{
        // 获取工资
        getSalaryList(){
            this.isLoading=true;
            let url;
            let search;
            let accountType;
            switch(this.type){
                case 1:
                    url='/t_dz_account/selectAccount'
                    search=JSON.parse(JSON.stringify(this.searchData1))
                    accountType=0
                    break;
                case 2:
                    url='/t_dz_salary/selectSalaryStatistics'
                    search=JSON.parse(JSON.stringify(this.searchData2))
                    break;
                case 3:
                    url='/t_dz_account/selectAccount'
                    search=JSON.parse(JSON.stringify(this.searchData3))
                    accountType=1
                    break;
            }
            this.$axios.post(url,{
                accountType:accountType,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                ...search
            }).then((res)=>{
                this.isLoading=false
                this.list=res.data
                this.total=res.count
                this.searchSwitch=false
            })
        },
        // 标签页分页
        pageChage(e){
            this.type=e
        },
        // 翻页
        preNextPage(e){
            this.pageNum=e
            this.getSalaryList();
        },
        preNextPage2(e){
            this.pageNum2=e
            console.log(this.pageNum2)
            this.getDetail()
        },
        // 查询项目名称选择
        selectProjectName(e){
            this.show_searchData3.projectName=e
        },
        // 提交查询
        submitSearch(){
            this.pageNum=1;
            switch(Number(this.type)){
                case 1:
                    this.searchData1=JSON.parse(JSON.stringify(this.show_searchData1))
                    break;
                case 2:
                    this.searchData2=JSON.parse(JSON.stringify(this.show_searchData2))
                    break;
                case 3:
                    this.searchData3=JSON.parse(JSON.stringify(this.show_searchData3))
                    break;

            }
            this.getSalaryList();
            this.searchSwitch=false        
        },
        reRequst(){
            this.pageNum=1;
            // 清空查询数据
            this.clearSeachData();
            this.getSalaryList();
        },
        // 工资发放查找选择日期
        checkDate(e){
            if(e.length==2){
                this.show_searchData2.salaryOutTimeBegin=serverTimestamp(e[0]._d)
                this.show_searchData2.salaryOutTimeEnd=serverTimestamp(e[1]._d)
            }else{
                this.show_searchData2.salaryOutTimeBegin=''
                this.show_searchData2.salaryOutTimeEnd=''
            }
        },
        // 获取详情
        getDetail(record,type){
            this.detail=true
            this.isLoading2=true
            if(record && type && type==1){
                this.urls='/t_dz_accountdetail/selectAccountDetail'
                this.detailData={
                    accountId:record.accountId,
                    salaryBank:record.salaryBank,
                    salaryCompanyAccount:record.salaryCompanyAccount,
                    salaryAccountName:record.salaryAccountName
                }
            }else if(record && type && type==2){
                this.urls='/t_dz_salary/selectSalary'
                this.detailData={
                    accountName:record.salaryAccountName,
                    salaryOutTimeBegin:record.transTime,
                    salaryOutTimeEnd:record.transTime,
                    salaryCompanyAccount:record.salaryCompanyAccount,
                }
            }
            this.$axios.post(this.urls,{
                pageNum:this.pageNum2,
                pageSize:this.pageSize2,
                ...this.detailData
            }).then((res)=>{
                this.list2=res.data
                this.total2=res.count
                this.isLoading2=false
            })
        },
        // 清楚查询数据
        clearSeachData(){
            this.show_searchData1={
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salarySource:''
            }
            this.searchData1={
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salarySource:''
            }
            this.show_searchData2={
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salaryOutTimeBegin:'',
                salaryOutTimeEnd:''
            }
            this.searchData2={
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                salaryOutTimeBegin:'',
                salaryOutTimeEnd:''
            }
            this.show_searchData3={
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                projectStatus:'',
                constructionUnit:''
            }
            this.searchData3={
                salaryBank:'',
                salaryAccountName:'',
                salaryCompanyAccount:'',
                projectStatus:'',
                constructionUnit:''
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .payrollReport{
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
            .cont2{
                background: #fff;
                position: absolute;
                width:90%;
                left: 50%;
                top: 20%;
                transform: translateX(-50%) ;
                box-sizing: border-box;
                padding:20px 40px;
                border-radius: 4px;
            }
        }
    }
    .pagination{
        text-align: right;
        margin-top: 10px;
    }
</style>