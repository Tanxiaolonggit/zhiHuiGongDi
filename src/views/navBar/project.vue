<template>
    <!-- 项目列表表格 -->
    <div  class='projects'>
        <a-table :columns="columns" :dataSource="list" :customRow='toProjetDetail' :pagination='false'  bordered>
            <template slot="projectName" slot-scope="text">
                <a>{{text}}</a>
            </template>
            <template  slot="projectStatus" slot-scope="text,record">
                <span class="status" :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}">{{record.projectStatus==1?'在建':'竣工'}}</span>
                <span class="status" v-if='record.wisdomProject' style="color:#1890ff;background:#e6f7ff">智慧工程</span>
                <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.demoProject==1?'示范':'非示范'}}</span>
            </template>
        </a-table>
        <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
    </div>
</template>
<script>
import {isLogin,relogin} from '../../utils/util_one'
export default {
    name:'project',
    data(){
        return{
            columns : [{
                title: '项目名称',
                align: 'center',
                dataIndex: 'projectName',
                scopedSlots: { customRender: 'projectName' },
            }, {
                title: '建设单位',
                align: 'center',
                dataIndex: 'buildingSide',
            }, {
                title: '施工单位',
                align: 'center',
                dataIndex: 'constructionUnit',
            },{
                title: '造价(万元)',
                align: 'center',
                dataIndex: 'projectCost',
            },{
                title:"",
                align: 'center',
                dataIndex:"projectStatus",
                scopedSlots: { customRender: 'projectStatus' },
            }],
            list:[],
            pageNum:1,
            pageSize:10,
            total:0
        }
    },
    mounted(){
        if(isLogin()){
            this.getProjectList();
        }else{
            relogin(this)
        }     
    },
    methods:{
        // 点击前往项目详情
        toProjetDetail(record, index){
            return{
                on:{
                    click:()=>{
                        // console.log(record, index)
                        //跳转到项目详情
                        this.$router.push({path:'/webContent/project/projectsDetail/'+record.projectId})
                    }
                }
            }
        },
        // 获取项目列表
        getProjectList(){
            this.$axios.post('/t_dz_project/selectProjectInfoAll',{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
            })
        },
        // 上一页下一页
        preNextPage(e){
            this.pageNum=e
            this.getProjectList()
        }
    },    
}
</script>
<style lang="less" scoped>
    .projects{
        flex: 1;
        width: 100%;
        height: 92%;
        padding: 20px;
        box-sizing: border-box;
        // 分页器
        .pagination{
            text-align: right;
            box-sizing: border-box;
            padding-top: 10px;
        }
        .status{
            font-size: 10px!important;
            display:inline-block!important;
            padding:2px!important;
            margin-right: 5px;        
        }
    }
</style>
