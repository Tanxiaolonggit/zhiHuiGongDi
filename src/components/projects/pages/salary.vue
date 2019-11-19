<template>
    <div class="salary">
        <!-- 农民工工资专户情况 -->
        <div v-if='account' class="account">
            <div class="salarytitle salarytitle">农民工工资专户情况</div>
            <div class="account_cont salarycont">
                <div>
                    <p>账户编码</p>
                    <p>{{account.salaryCompanyAccount}}</p>
                </div>
                <div>
                    <p>开户行</p>
                    <p>{{account.salaryBank}}</p>
                </div>
                <div>
                    <p>账户余额</p>
                    <p> ¥{{account.transBalance}}</p>
                </div>
            </div>
        </div>
        <!-- 农民工工资发放时间趋势 -->
        <div class="monthCount">
            <div class="salarytitle">农民工工资发放时间趋势</div>
            <div class="salarycont">
                <div style="width:400px;height:300px;margin:0 auto;" id='salarymonthCount'></div>
            </div>    
        </div>
        <!-- 农民工工资专户收支流水 -->
        <div class="accountWater">
            <div class="salarytitle">农民工工资专户收支流水</div>
            <div class="salarycont">
                <a-table :columns="columns1" :dataSource="list1" :pagination='false'  bordered>
                    <template slot="transType" slot-scope="text">
                        <span>{{text==0?'支出':'支入'}}</span>
                    </template>
                </a-table>
                <a-pagination showQuickJumper  class="pagination" @change='preNextPage1' :defaultCurrent="accountWaterPageNum" :defaultPageSize="accountWaterPageSize" :total="accountWaterTotal" />
            </div>    
        </div>
        <!-- 农民工工资月度发放情况 -->
        <div class="monthDetail">
            <div class="salarytitle">
                <span>农民工工资专户收支流水</span>
                <a-month-picker :allowClear='false'	:defaultValue="moment(getCurrentData(), 'YYYY-MM')" @change="dataChange" placeholder="Select month" />
            </div>  
            <div class="salarycont">
                <a-table :columns="columns2" :dataSource="list2" :pagination='false'  bordered></a-table>
                <a-pagination showQuickJumper  class="pagination" @change='preNextPage2' :defaultCurrent="monthDetailPageNum" :defaultPageSize="monthDetailPageSzie" :total="monthDetailTotal" />
            </div>     
        </div>
    </div>
</template>
<script>
import {setAmountFormat,serverTimestamp2} from '../../../utils/util_one.js'
import moment from "moment";
export default {
    name:'salary',
    data(){
        return{
            projectId:this.$route.params.projectId,
            // 专户情况
            account:null,
            // 工资专户流水
            accountWaterPageNum:1,
            accountWaterPageSize:5,
            accountWaterTotal:0,
            list1:[],
            columns1: [{
                title: '#',
                align: 'center',
                dataIndex: 'salarytotal',
            },{
                title: '月度',
                align: 'center',
                dataIndex: 'salarymonth',
            }, {
                title: '账户号',
                align: 'center',
                dataIndex: 'salarySelfAccount',
            }, {
                title: '对方账户名称',
                align: 'center',
                dataIndex: 'payRollBankName',
            },{
                title: '交易金额',
                align: 'center',
                dataIndex: 'salary',
            },{
                title:"交易类型",
                align: 'center',
                dataIndex:"transType",
                scopedSlots: { customRender: 'transType' },
            },{
                title:"余额",
                align: 'center',
                dataIndex:"transBalance"
            }],
            // 农民工工资月度发放情况
            month:null,
            monthDetailPageNum:1,
            monthDetailPageSzie:5,
            monthDetailTotal:0,
            list2:[],
            columns2: [{
                title: '发放',
                align: 'center',
                dataIndex: 'name',
            },{
                title: '发放时间',
                align: 'center',
                dataIndex: 'salaryOutTime',
            }, {
                title: '发放金额',
                align: 'center',
                dataIndex: 'salary',
            }]
        }
    },
    mounted(){
        this.getAccount();
        this.getMonthCount();
        this.getAccountWater();
        this.autoGetMonthDetail();
    },
    methods:{
        // 获取工资专户
        getAccount(){
            this.$axios.post('/t_dz_salary/selectSalaryAccount',{
                "projectId":this.projectId
            }).then((res)=>{
                this.account=res.data[0]
                this.account.transBalance=setAmountFormat(this.account.transBalance)
            })
        },
        // 获取工资发放时间趋势
        getMonthCount(){
            this.$axios.post('/t_dz_salary/selectSalaryMonthCount',{
                "projectId":this.projectId
            }).then((res)=>{
                // 月份数据
                let monthData=[]
                // 发放数据
                let salaryData=[]
                res.data.forEach((item)=>{
                    monthData.push(item.salarymonth)
                    salaryData.push(Number(item.salarytotal))
                })
                let myChart=this.$echarts.init(document.getElementById('salarymonthCount'))
                let option = {
                        xAxis: {
                            type: 'category',
                            data:[...monthData]
                        },
                        yAxis: {
                            type: 'value',
                        },
                        grid:{
                            left:60
                        },
                        series: [{
                            data:[...salaryData],
                            type: 'bar'
                        }]
                    };
                myChart.setOption(option)
            })
        },
        // 获取工资专户流水
        getAccountWater(){
            this.$axios.post('/t_dz_salary/selectSalaryAccountWater',{
                "projectId":this.projectId,
                pageNum:this.accountWaterPageNum,
                pageSize:this.accountWaterPageSize
            }).then((res)=>{
                res.data.forEach((item)=>{
                    item.transBalance=setAmountFormat(item.transBalance)
                })
                this.accountWaterTotal=res.count;
                this.list1=res.data
            })
        },
        // 专户流水翻页
        preNextPage1(e){
            this.accountWaterPageNum=e
            this.getAccountWater()
        },
        // 农民工工资月度发放情况请求
        getMonthDetail(range){
            this.$axios.post('/t_dz_salary/selectSalaryMonthDetail',{
                projectId:this.projectId,
                range:range,
                pageSize:this.monthDetailPageSzie,
                pageNum:this.monthDetailPageNum,
            }).then((res)=>{
                res.data.forEach((item)=>{
                    item.salary=setAmountFormat(item.salary)
                })
                this.monthDetailTotal=res.count;
                this.list2=res.data
            })
        },   
        moment,
        getCurrentData(){
            return new Date().toLocaleDateString();
        },
        // 自动获取当月月份 请求农民工工资月度
        autoGetMonthDetail(){
            this.month=serverTimestamp2(new Date())
            this.getMonthDetail(this.month);
        },
        // 农民工工资月度按月选择变化 重新请求农民工工资月度发放情况请求
        dataChange(e){
            if(e._d){
                let range=serverTimestamp2(e._d)
                this.getMonthDetail(this.month)
            }    
        },
        //   农民工工资月度翻页
        preNextPage2(e){
            this.monthDetailPageNum=e
            this.getMonthDetail(this.month)
        },
    }
}
</script>
<style lang="less" scoped>
    .salary{
        min-width: 600px;
        height: 100%;
        overflow-y: scroll;
    }
    .salarytitle{
        background: #fff;
        font-size:18px;
        padding: 10px;
        border-bottom:2px solid #eee;
        font-weight: 600;
    }
    .salarycont{
        background: #fff;
    }
    //工资专户
    .account{
        margin-bottom: 10px;
        .account_cont{
            display: flex;       
            div{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 0 20px 0;
                p{
                    margin: 0;
                    padding:0
                }
                p:nth-of-type(1){
                    font-size: 16px;
                }
                p:nth-of-type(2){
                    font-size: 14px;
                }
            }
            div:nth-of-type(2){
                border-right: 2px solid #eee;
                border-left:  2px solid #eee;
            }
        }
    }
    .monthCount{
        margin-bottom: 10px;
    }
    .accountWater{
        background: #fff;
        margin-bottom: 10px;
        .salarycont{
            padding: 10px;
            .pagination{
                text-align: right;
                margin-top: 10px;
            }
        }
        
    }
    .monthDetail{
        background: #fff;
        margin-bottom: 10px;
        .salarytitle{
            span{
                margin-right:50px;
            }
        }
        .salarycont{
            padding: 10px;
            .pagination{
                text-align: right;
                margin-top: 10px;
            }
        }
        
    }
</style>