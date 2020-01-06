<template>
    <div class="projectSign">
        <a-breadcrumb>
            <a-breadcrumb-item>项目报表</a-breadcrumb-item>
            <a-breadcrumb-item>项目考勤</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="neck">
            <span>时间区间</span>
            <a-date-picker
                format="YYYY-MM-DD"
                v-model="startValue"
                placeholder="开始日期"
            />
            <a-date-picker
                :disabledDate="disabledEndDate"
                format="YYYY-MM-DD"
                placeholder="结束日期"
                v-model="endValue"
                @change='onDataChange'
            />
        </div>
        <div class="tableDiv">
            <a-table class="tables" :columns="colmuns" :dataSource="list" :pagination='false'>   
                <template slot="projectName"  slot-scope="text">
                    <a-tooltip  placement="right" :title="text">
                        <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                    </a-tooltip>   
                </template>
            </a-table>    
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
        </div>
    </div>
</template>
<script>
import {serverTimestamp} from '../../../../utils/util_one.js'
export default {
    data(){
        return{
            startValue:null,
            endValue:null,
            pageNum:1,
            pageSize:10,
            total:0,
            colmuns:[
                {
                    title: "项目名称",
                    align: "center",
                    dataIndex: "projectName",
                    scopedSlots: { customRender: "projectName" }
                }
            ],
            list:[],
        }
    },
    mounted(){
        this.createTableHead();
        this.getSignList((new Date()).getTime(),(new Date()).getTime()+604800000);
    },
    methods:{
        getSignList(date1,date2){
            this.$axios.post('/t_dz_sign/selectSignByDayStatistics',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                signTimeBegin:serverTimestamp(date1),
                signTimeEnd:serverTimestamp(date2)
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
                console.log(res)
            })
        },
        disabledEndDate(endValue){
            let startValue=this.startValue
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf()<startValue.valueOf() || endValue.valueOf()>startValue.valueOf()+(86400000*7) 
        },
        onDataChange(e){
            if(e){
                this.createTableHead();
                this.getSignList(this.startValue.valueOf(),this.endValue.valueOf())
            }
        },
        createTableHead(){
            this.colmuns=[
                {
                    title: "项目名称",
                    align: "center",
                    dataIndex: "projectName",
                    scopedSlots: { customRender: "projectName" }
                }
            ]
            let num;
            let startTime;
            if(this.endValue && this.startValue){
                num=(this.endValue-this.startValue)/86400000
                startTime=this.startValue
            }else{
                num=7
                startTime=(new Date()).getTime()
            }
            for(let i=0;i<num;i++){
                let obj={
                    title: serverTimestamp(startTime+i*86400000),
                    align: "center",
                    dataIndex: serverTimestamp(startTime+i*86400000),
                }
                this.colmuns.push(obj)
            }
        },
        preNextPage(e){
            this.pageNum=e
            if(this.startValue.valueOf() && this.endValue.valueOf()){
                this.getSignList(this.startValue.valueOf(),this.endValue.valueOf())
            }else{
                this.getSignList((new Date()).getTime(),(new Date()).getTime()+604800000);
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .projectSign{
        .neck{
            padding: 0 10px;
            span{
                margin-right: 20px;
            }
        }
        .tableDiv{
            padding: 10px;
            margin-top: 20px;
        }
    }
    .pagination{
        text-align: right;
        margin-top: 10px;
    }
</style>