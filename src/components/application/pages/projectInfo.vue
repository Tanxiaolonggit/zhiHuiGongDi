<template>
    <div class="projectInfo">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>项目档案</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template  slot="projectStatus" slot-scope="text,record">
                    <span class="status" :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}">{{record.projectStatus==1?'在建':'竣工'}}</span>
                    <span class="status" v-if='record.wisdomProject' style="color:#1890ff;background:#e6f7ff;">智慧工程</span>
                    <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.demoProject==1?'示范':'非示范'}}</span>
                </template>
                <template slot="caozuo">
                    <a>操作</a>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            columns : [{
                title: '项目名称',
                align: 'center',
                dataIndex: 'projectName',
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
            },{
                title:"操作",
                align: 'center',
                dataIndex:"caozuo",
                scopedSlots: { customRender: 'caozuo' },  
            }],
            list:[],
            pageNum:1,
            pageSize:10,
            total:0
        }
    },
    mounted(){
        this.getProjectList();
    },
    methods:{
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
    }
}
</script>
<style lang="less" scoped>
    .projectInfo{
        .tables{
            box-sizing: border-box;
            padding:0 10px;
            .pagination{
                text-align: right;
                margin-top: 20px;
            }
            .status{
                font-size: 10px;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow:ellipsis;
            }
            .status:nth-of-type(2){
                margin: 5px 0;
            }
        }
    }
</style>