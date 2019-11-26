<template>
    <div class="projectInfo">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>项目档案</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="buttons">
            <a-button type="primary" icon="search" @click="visible1=true">查询</a-button>
            <a-button icon="redo" class="rebutton" @click="redo">刷新</a-button>
            <a-button icon="plus">新增</a-button>
        </div>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template  slot="projectStatus" slot-scope="text,record">
                    <span class="status" :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.projectStatus)}}</span>
                    <span class="status" v-if='record.wisdomProject' style="color:#1890ff;background:#e6f7ff;">智慧工程</span>
                    <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.demoProject==1?'示范':'非示范'}}</span>
                </template>
                <template slot="caozuo">
                    <a>操作</a>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div> 
        <!-- 查询模态框 -->
        <a-modal title="查询" v-model="visible1" @cancel='closeSearchModal' @ok="reSearch">
            <div style="display:flex;align-items: center;width:80%;margin:0 auto;"><span>项目名称：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="searchData.projectName"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;">
                <span>项目状态：</span>
                <a-select style="flex:1;" @change="selectStatus">
                    <a-select-option value="1">筹备</a-select-option>
                    <a-select-option value="3">在建</a-select-option>
                    <a-select-option value="4">完工</a-select-option>
                    <a-select-option value="5">停工</a-select-option>
                </a-select>
            </div>
        </a-modal>
    </div>
</template>
<script>
import {projectStatus} from '../../../utils/dataDictionary.js'
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
            total:0,
            // 查询模态框显示隐藏
            visible1:false,
            searchData:{
                projectName:'',
                projectStatus:''
            }
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
                pageSize:this.pageSize,
                ...this.searchData
            }).then((res)=>{
                // 关闭搜索模态框
                this.visible1=false;
                this.list=res.data
                this.total=res.count
            })
        },
        // 项目状态数据字典
        statuss(num){
            return projectStatus(num)
        },
        // 上一页下一页
        preNextPage(e){
            this.pageNum=e
            this.getProjectList()
        },
        // 查询项目筛选状态
        selectStatus(e){
            this.searchData.projectStatus=e
        },
        // 查询项目
        reSearch(){
            if(this.searchData.projectName==''){
                this.$message.warning('请输入项目名称');
            }else if(this.searchData.projectStatus==''){
                this.$message.warning('请选择项目状态');
            }else{
                this.pageNum=1;
                this.getProjectList();
            }
        },
        // 关闭查询模态框时间
        closeSearchModal(){
            this.searchData.projectName='';
            this.searchData.projectName=''
        },
        // 刷新
        redo(){
            this.searchData.projectName='';
            this.searchData.projectName='';
            this.pageNum=1;
            this.getProjectList();
        }
    }
}
</script>
<style lang="less" scoped>
    .projectInfo{
        .buttons{
            text-align: right;
            padding: 10px;
            box-sizing: border-box;
            .rebutton{
                margin:0 20px;
            }
        }
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