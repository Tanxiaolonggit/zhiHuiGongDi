
<template>
    <!-- 考勤管理 -->
    <div class="signAdministration">
        <div>
            <div class="searchButton" @click="toggleSearch()"><span>查询</span></div>
            <a-calendar @change='pickMonth'>    
                <template slot="dateCellRender" slot-scope="value">
                    <div class="notes-month">
                        <p v-for="index in 7" @click="signDetail(value,index)" :key='"321"+index' v-html="compElement(value,index)"></p>
                    </div>
                </template>
            </a-calendar>
        </div>
        <div v-if="search" class="searchModal">
            <div class="bac" @click="toggleSearch()"></div>
            <div class="cont">
                <section><span>工号：</span><div><input v-model="searchData.personId" placeholder="请输入工号" /></div></section>
                <section><span>日期：</span><div><a-range-picker @change="gonghaoDate" /></div></section>
                <section><span>姓名：</span><div><input v-model="searchData.name" placeholder="请输入姓名" /></div></section>
                <div class="but">
                    <span @click="toggleSearch()">取消</span>
                    <span @click="numSearch()">查找</span>    
                </div>
            </div>
        </div>
        <div v-if='listisshow' class="signlist">
            <div class="bac" @click="listisshow=false"></div>
            <div class="cont">
                <div class="title">员工考勤</div>
                <div class="tableout">
                    <a-table :columns="columns" :dataSource="list" :pagination='false' bordered>
                        <template slot="headPhoto" slot-scope="text">
                            <img :src='text'/>
                        </template> 
                    </a-table>
                    <a-pagination showQuickJumper  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {timeYearMonth,serverTimestamp} from '../../../utils/util_one.js'
export default {
    name:'attendancea',
    data(){
        return{
            // 查找界面显示隐藏
            search:false,
            searchtype:-1, //查找类型 0是按当天具体某项查找 1是按工号等键入信息查找
            // 搜索
            searchData:{
                personId:'',
                signTimeBegin:'',
                signTimeEnd:'',
                name:''
            },
            // 某一项详情签到
            detailData:{
                signDate:'',
                type:''
            },
            projectId:this.$route.params.projectId,
            pageNum:1,
            pageSize:5,
            total:0,
            // 考勤详情是否显示
            listisshow:false,
            list:[],
            columns:[{
                title: '头像',
                align: 'center',
                dataIndex: 'headPhoto',
                scopedSlots: { customRender: 'headPhoto' },
            }, {
                title: '工号',
                align: 'center',
                dataIndex: 'personId',
            }, {
                title: '姓名',
                align: 'center',
                dataIndex: 'name',
            },{
                title: '所属单位',
                align: 'center',
                dataIndex: 'company',
            },{
                title:"上班",
                dataIndex:"signIn",
                align: 'center',
            },{
                title:"下班",
                dataIndex:"signOut",
                align: 'center',
            }],
            // 月考勤数据
            monthData:[],
        }
    },
    mounted(){
        this.getMonthSign(timeYearMonth());
    },
    watch:{
        "listisshow":function(n,o){
            // 每次列表消失 清空用户上次展示的类型
            if(!n){
                this.searchtype=-1;
            }
        }
    },
    methods:{
        // 选择月份
        pickMonth(e){
            this.getMonthSign(timeYearMonth(e._d))
        },
        // 获取当月考勤数据
        getMonthSign(date){
            this.$axios.post('/t_dz_sign/selectSignCalendar',{
                projectId:this.projectId,
                range:date
            }).then((res)=>{
                this.monthData=res.data
            })
        },
        //根据返回的数据计算
        compElement(value,index){
            let str;
            let selfDate=serverTimestamp(value)
            this.monthData.forEach((date)=>{
                Object.keys(date).forEach((values)=>{
                    if(selfDate==values){
                        switch(index){
                            case 1:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>总人数：<span>${date[values].totalCount || 0}</span></span>`
                                break;
                            case 2:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>建设单位：<span>${date[values].bs_signcount || 0}</span></span>`
                                break;
                            case 3:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>设计单位：<span>${date[values].ds_signcount|| 0}</span></span>`
                                break;
                            case 4:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>勘察单位：<span>${date[values].es_signcount || 0}</span></span>`
                                break;
                            case 5:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>监理单位：<span>${date[values].ss_signcount || 0}</span></span>`
                                break;
                            case 6:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>施工单位：<span>${date[values].cs_signcount || 0}</span></span>`
                                break;
                            case 7:
                                str=`<span style='border:1px dashed #b7eb8f;display:block;color:#52c41a;background: #f6ffed;'>作业工人：<span>${Number(date[values].totalCount || 0)-Number(date[values].bs_signcount|| 0)-Number(date[values].ss_signcount|| 0)-Number(date[values].cs_signcount|| 0)-Number(date[values].es_signcount || 0)- Number(date[values].ds_signcount|| 0)}</span>`
                        }
                        
                    }
                })
            })
            return str
        },
        // 查找界面显示隐藏
        toggleSearch(){          
            // 触发前如果是关闭状态 清空搜索数据
            if(!this.search){
                this.searchData={
                    personId:'',
                    signTimeBegin:'',
                    signTimeEnd:'',
                    name:''
                }
            }
            this.search=!this.search
        },
        // 按工号选择时间
        gonghaoDate(e){
            console.log(e)
            if(e.length==2){
                this.searchData.signTimeBegin=serverTimestamp(e[0]._d)
                this.searchData.signTimeEnd=serverTimestamp(e[1]._d)
            }else{
                this.searchData.signTimeBegin=''
                this.searchData.signTimeEnd=''
            }
        },
        // 查看当日某项考情详情
        signDetail(value,index){
            this.detailData={
                'signDate':serverTimestamp(value),
                'type':index
            }
            this.typeSearch()
        },
        // 按照点击类型查找当日考勤
        typeSearch(){
            this.$axios.post('/t_dz_sign/selectSignCalendarSub',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                projectId:this.projectId,
                ...this.detailData
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
                this.searchtype=0
                this.listisshow=true
                console.log(res)
            })
        },
        // 按工号查找
        numSearch(){
            this.$axios.post('/t_dz_sign/selectSign',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                projectId:this.projectId,
                ...this.searchData
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
                this.searchtype=1
                this.search=false;
                this.listisshow=true
                console.log(res)
            })
        },
        // 下一页
        preNextPage(){
            if(this.searchtype==0){
                this.typeSearch();
            }else if(this.searchtype==1){
                this.numSearch();
            }
        }
    }
    
}
</script>
<style lang="less" scoped>
    .signAdministration{
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        background: #fff;
        overflow-y: scroll;
        .pickMonth{
            display: flex;
            justify-content:center;
            padding-top: 10px;
        }
        .searchButton{
            text-align: right;
            padding-right: 16px;
            box-sizing: border-box;
            line-height: 35px;
            span{
                display: inline-block;
                width: 60px;
                text-align: center;
                background: #1890ff ;
                color: #fff;
                height: 35px;
                border-radius: 8px;
                cursor: pointer;
            }   
        }
        .searchModal{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 9;
            .bac{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10;
            }
            .cont{
                background: #fff;
                position: absolute;
                width: 40%;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                z-index: 11;
                padding: 40px 0;
                section{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                    span{
                        margin-right: 20px;
                    }
                    div{
                        width: 50%;
                        input{
                            width: 100%;
                            border: 1px solid #eee;
                            outline: none;
                            font-size: 14px;
                            height: 30px;
                            box-sizing: border-box;
                            padding-left: 20px;
                        }
                    }
                }
                .but{
                    text-align: center;
                    span{
                        width:50px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        display: inline-block;
                        border-radius:5px;
                    }
                    span:nth-of-type(1){
                        margin-right: 20px;
                        border: 1px solid #eee;
                        color: #555;
                    }
                    span:nth-of-type(2){
                        margin-left: 20px;
                        background: #1890ff ;
                        color: #fff;
                        border: 1px solid transparent;
                    }
                }
            }
        }
        .signlist{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 9;
            .bac{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10;
            }
            .cont{
                background: #fff;
                position: absolute;
                width:80%;
                height: 75%;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                z-index: 11;
                padding: 20px 0;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                .title{
                    margin-left: 20px;
                    margin-bottom: 10px;
                    font-weight: 600;
                    padding-bottom:10px;
                    border-bottom: 1px solid #444;
                }
                .tableout{
                    flex: 1;
                    padding:0 20px;
                    box-sizing: border-box;
                    overflow-y: auto;
                    img{
                        width: 50px;
                        height:70px;
                    }
                    .pagination{
                        text-align: right;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
    // 日历样式
    .notes-month{
        p{
            font-size: 12px;
            margin: 0;
            text-align: center;    
        }
    }
</style>