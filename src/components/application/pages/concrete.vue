<template>
    <div class="concrete">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>混凝土项目对照</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="buttons">
            <a-button type="primary" icon="search" @click="visible1=true">查询</a-button>
            <a-button icon="redo" class="rebutton" @click="redo">刷新</a-button>
        </div>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template slot="num" slot-scope="text,record,index">
                    <span>{{index+1}}</span>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div> 
        <!-- 查询模态框 -->
        <a-modal title="查询" v-model="visible1" @ok="reSearch">
            <div style="display:flex;align-items: center;width:80%;margin:0 auto;"><span>项目名称：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.projectName"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;"><span>混凝土搅拌站名称：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.mixer"></div>
        </a-modal>
    </div>
</template>
<script>
import {projectStatus} from '../../../utils/dataDictionary.js'
export default {
    data(){
        return{
            columns : [{
                title: '序号',
                align: 'center',
                dataIndex: 'num',
                scopedSlots: { customRender: 'num' },  
            },{
                title: '项目名称',
                align: 'center',
                dataIndex: 'projectName',
            },{
                title: '混凝土企业名称',
                align: 'center',
                dataIndex: 'mixer',
            }],
            list:[],
            pageNum:1,
            pageSize:10,
            total:0,
            // 查询模态框显示隐藏
            visible1:false,
            show_searchData:{
                projectName:'',
                mixer:''
            },
            searchData:{
                projectName:'',
                mixer:''
            }
        }
    },
    mounted(){
        this.getConcreteList();
    },
    watch:{
        "visible1":function(n,o) {
            if(n){
                this.show_searchData=JSON.parse(JSON.stringify(this.searchData))
            }
        },
    },
    methods:{
        // 获取混凝土列表
        getConcreteList(){
            this.$axios.post('/t_dz_material/selectMixerProject',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                ...this.searchData
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
                this.visible1=false
            })
        },
        // 上一页下一页
        preNextPage(e){
            this.pageNum=e
            this.getConcreteList()
        },
        // 查询混凝土
        reSearch(){
            if(this.show_searchData.projectName==''){
                this.$message.warning('请输入项目名称');
            }else if(this.show_searchData.legalMan==''){
                this.$message.warning('请输入混凝土搅拌站名称');
            }else{
                this.pageNum=1;
                this.searchData=JSON.parse(JSON.stringify(this.show_searchData))
                this.getConcreteList();
            }
        },
        // 刷新
        redo(){
            this.show_searchData.projectName='';
            this.show_searchData.mixer='';
            this.searchData.projectName='';
            this.searchData.mixer='';
            this.pageNum=1;
            this.getConcreteList();
        },
        seeDetail(a,b,c){
            console.log(a,b,c)
        }
    }
}
</script>
<style lang="less" scoped>
    .concrete{
        position: relative;
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
        .addAndSet{
            position: absolute;;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2;
            .bac{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 3;
            }
            .inputCont{
                min-width: 850px;
                background: #fff;             
                position: absolute;
                box-sizing: border-box;
                padding:40px 20px;
                z-index: 4;
                width: 80%;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%);
                .top{
                    display: flex;
                    section{
                        flex: 1;
                        div{
                            font-size: 12px;
                            display: flex;
                            margin-bottom: 15px;
                            align-items: center;
                            span{
                                display: inline-block;
                                width: 120px;
                                text-align: right;
                            }
                            input{
                                border: 1px solid #d9d9d9;
                                height: 30px;
                                line-height: 30px;
                                padding:0 10px;
                                flex: 1;
                                // width: 200px;
                                border-radius: 4px;
                            }
                            .ant-select{
                                margin: 0;
                                flex: 1;
                                // width: 200px;
                                height: 30px;
                                .ant-select-selection--single{
                                    width: 100%;
                                }
                            }
                        }
                    }
                } 
                .submitBut{
                    width: 30%;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>