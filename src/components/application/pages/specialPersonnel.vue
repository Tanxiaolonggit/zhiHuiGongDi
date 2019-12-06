<template>
    <div class="specialPersonnel">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>特种设备人员档案</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="buttons">
            <a-button type="primary" icon="search" @click="visible1=true">查询</a-button>
            <a-button icon="redo" class="rebutton" @click="redo">刷新</a-button>
        </div>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>    
                <template slot="phoneNum"  slot-scope="text">
                    <a-tooltip  placement="right" :title="text">
                        <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{text}}</div>
                    </a-tooltip>   
                </template>
                <template slot="homeAddress"  slot-scope="text">
                    <a-tooltip  placement="left" :title="text">
                        <div style="width:100%;white-space:normal;">{{text}}</div>
                    </a-tooltip>   
                </template>
                <template slot="certificateSubclass"  slot-scope="text">
                    <span>{{personType(text)}}</span>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div>
        <!-- 查询模态框 -->
        <a-modal title="查询" v-if='visible1' v-model="visible1" @ok="reSearch">
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;"><span>姓名：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.name"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;"><span>电话：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.phoneNum"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;"><span>身份证：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.idCardNum"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;">
                <span>人员类别：</span>
                <a-select style="flex:1;" :defaultValue='show_searchData.certificateSubclass' @change="selectPersonType">
                    <a-select-option value="79">建筑电工</a-select-option>                 
                    <a-select-option value="80">高处作业吊篮安装拆卸工</a-select-option>                 
                    <a-select-option value="81">塔式起重机司机</a-select-option>             
                    <a-select-option value="82">施工升降机司机</a-select-option>            
                    <a-select-option value="83">电焊工</a-select-option>    
                    <a-select-option value="84">其他</a-select-option>        
                    <a-select-option value="85">建筑架工</a-select-option>                   
                    <a-select-option value="86">普通脚手架工</a-select-option>                    
                    <a-select-option value="87">附着升降脚手架工</a-select-option>                    
                    <a-select-option value="88">建筑起重信号、司索工</a-select-option>                    
                    <a-select-option value="89">建筑起重机司机</a-select-option>                    
                    <a-select-option value="90">物料提升机司机</a-select-option>                    
                    <a-select-option value="91">门式起重机司机</a-select-option>                    
                    <a-select-option value="92">桥式起重机司机</a-select-option>                    
                    <a-select-option value="93">汽车式起重机司机</a-select-option>                    
                    <a-select-option value="94">建筑起重机械安装拆卸工</a-select-option>
                    <a-select-option value="95">塔机安（拆）工</a-select-option>
                    <a-select-option value="96">施工升降机安（拆）工</a-select-option>    
                    <a-select-option value="97">物料提升机安（拆）工</a-select-option>
                    <a-select-option value="98">门式起重机安（拆）工</a-select-option>
                    <a-select-option value="99">桥式起重机安（拆）工</a-select-option>
                </a-select>
            </div>
        </a-modal>
    </div>
</template>
<script>
import {specialPersonType} from '../../../utils/dataDictionary.js'
export default {
    data(){
        return{
            type:'',
            columns : [{
                title: '姓名',
                align: 'center',
                dataIndex: 'name',
            },{
                title: '电话',
                align: 'center',
                dataIndex: 'phoneNum',
                scopedSlots: { customRender: 'phoneNum' },
            },{
                title: '身份证号',
                align: 'center',
                dataIndex: 'idCardNum',
            },{
                title: '发证日期',
                align: 'center',
                dataIndex: 'certificateStartDate',
            },{
                title:'有效截止日期',
                align: 'center',
                dataIndex:"certificateExpiryDate",
            },{
                title:'正式编号',
                align: 'center',
                dataIndex:"certificateNum",
            },{
                title:"司机类型",
                align: 'center',
                dataIndex:"certificateSubclass",
                scopedSlots: { customRender: 'certificateSubclass' },

            },{
                title:"地址",
                align: 'center',
                dataIndex:"homeAddress",  
                scopedSlots: { customRender: 'homeAddress' },
            }],
            list:[],
            pageNum:1,
            pageSize:10,
            total:0,
            // 查询模态框显示隐藏
            visible1:false,
            show_searchData:{
                name:'',
                phoneNum:'',
                idCardNum:'',
                certificateSubclass:''
            },
            searchData:{
                name:'',
                phoneNum:'',
                idCardNum:'',
                certificateSubclass:''
            },
        }
    },
    mounted(){
        this.getPersonList();
    },
    watch:{
        "visible1":function(n,o) {
            if(n){
                this.show_searchData=JSON.parse(JSON.stringify(this.searchData))
            }
        }
    },
    methods:{
        // 获取起重设备列表
        getPersonList(){
            this.$axios.post('/t_dz_person/selectspecialPerson',{
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
            this.getPersonList()
        },
        // 查询企业
        reSearch(){
            if(this.show_searchData.name==''){
                this.$message.warning('请输入姓名');
            }else if(this.show_searchData.phoneNum==''){
                this.$message.warning('请输入电话');
            }else if(this.show_searchData.idCardNum==''){
                this.$message.warning('请输入身份证号');
            }else if(this.show_searchData.certificateSubclass=''){
                this.$message.warning('请选择人员类型');
            }else{
                this.pageNum=1;
                this.searchData=JSON.parse(JSON.stringify(this.show_searchData))
                this.getPersonList();
            }
        },
        // 刷新
        redo(){
            this.show_searchData.name='';
            this.show_searchData.phoneNum='';
            this.show_searchData.idCardNum='';
            this.show_searchData.certificateSubclass='';
            this.searchData.name='';
            this.searchData.phoneNum='';
            this.searchData.idCardNum='';
            this.searchData.certificateSubclass='';
            this.pageNum=1;
            this.getPersonList();
        },
        // 设置查询人员类别
        selectPersonType(e){
            this.show_searchData.certificateSubclass=e
        },
        // 人员类别数据字典显示
        personType(num){
            return specialPersonType(num)
        }
    }
}
</script>
<style lang="less" scoped>
    .specialPersonnel{
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
                margin-bottom: 20px;
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
                        box-sizing: border-box;
                        padding-right: 20px;
                        div{
                            font-size: 12px;
                            display: flex;
                            flex-direction: column;
                            margin-bottom: 15px;
                            span{
                                display:block;
                                width: 120px;
                                text-align: left;
                                margin-bottom: 10px;
                            }
                            input{
                                display: block;
                                border: 1px solid #d9d9d9;
                                height: 30px;
                                line-height: 30px;
                                padding:0 10px;
                                flex: 1;
                                border-radius: 4px;
                            }
                            .ant-select{
                                margin: 0;
                                flex: 1;
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