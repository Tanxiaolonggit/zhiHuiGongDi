<template>
    <div class="projectInfo">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>供应商档案</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="buttons">
            <a-button type="primary" icon="search" @click="visible1=true">查询</a-button>
            <a-button icon="redo" class="rebutton" @click="redo">刷新</a-button>
            <a-button icon="plus" @click="addCorpBasicButton">新增</a-button>
        </div>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template slot="corpName" slot-scope="text,record ">
                    <a @click="seeDetail(record)">{{text}}</a>
                </template>
                <template slot="supplierSubType" slot-scope="text">
                    <span>{{supplierType(text)}}</span>
                </template> 
                <template slot="caozuo" slot-scope="text,record ">
                    <a @click="setSupplierButton(text,record)">操作</a>
                    <a @click="delSupplierButton(text,record)" style="margin-left:5px;color:#f22a32;">删除</a>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div> 
        <!-- 查询模态框 -->
        <a-modal title="查询" v-if='visible1' v-model="visible1" @ok="reSearch">
            <div style="display:flex;align-items: center;width:80%;margin:0 auto;"><span>名称：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.corpName"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;"><span>法人：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.legalMan"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;">
                <span>供应商类型：</span>
                <a-select style="flex:1;" :defaultValue='show_searchData.supplierSubType' @change="selectSupplierSubType">
                    <a-select-option value="11">混凝土供应商</a-select-option>
                    <a-select-option value="12">木材供应商</a-select-option>
                    <a-select-option value="13">钢筋供应商</a-select-option>
                    <a-select-option value="14">管线供应商</a-select-option>
                    <a-select-option value="15">玻璃幕墙供应商</a-select-option>
                    <a-select-option value="16">家居供应商</a-select-option>
                    <a-select-option value="17">其它供应商</a-select-option>
                </a-select>
            </div>
        </a-modal>
        <!-- 新增&修改项目界面 -->
        <div class="addAndSet" v-if='visible2'>
            <div class="bac" @click="quxiao"></div>
            <div class="inputCont">
                <div class="top">
                    <section>
                        <div><span>企业名称：</span><input v-model="supplierData.corpName" type="text"></div>
                        <!-- <div><span>工商营业执照注册号：</span><input v-model="supplierData.licenseNum" type="text"></div> -->
                        <div>
                            <span>企业登记注册类型：</span>
                            <a-select :defaultValue="supplierData.corpType" @change="supplierSelect($event,'corpType')">
                            </a-select>
                        </div>
                        <div><span>工商营业执照注册号：</span><input v-model="supplierData.licenseNum" type="text"></div>
                        <div><span>企业营业地址：</span><input v-model="supplierData.address" type="text"></div>
                        <div><span>法定代表人姓名:</span><input v-model="supplierData.legalMan" type="text"></div>
                        <div><span>法定代表人职称：</span><input v-model="supplierData.legaManProTitle" type="text"></div>
                        <div><span>法定代表人证件号码：</span><input v-model="supplierData.legalManIDCardNumber" type="text"></div>
                        <div><span>实收资本：</span><input v-model="supplierData.factRegCapital" type="text"></div>
                        <div><span>注册日期：</span><input v-model="supplierData.registerDate" type="text"></div>
                        <div><span>办公电话：</span><input v-model="supplierData.officePhone" type="text"></div>
                        <div><span>联系人姓名：</span><input v-model="supplierData.linkMan" type="text"></div>
                        <div><span>企业邮箱：</span><input v-model="supplierData.email" type="text"></div>
                        <div>
                            <span>供应商类型：</span>
                            <a-select :defaultValue='supplierData.supplierSubType' @change="supplierSelect($event,'supplierSubType')">
                                <a-select-option value="11">混凝土供应商</a-select-option>
                                <a-select-option value="12">木材供应商</a-select-option>
                                <a-select-option value="13">钢筋供应商</a-select-option>
                                <a-select-option value="14">管线供应商</a-select-option>
                                <a-select-option value="15">玻璃幕墙供应商</a-select-option>
                                <a-select-option value="16">家居供应商</a-select-option>
                                <a-select-option value="17">其它供应商</a-select-option>
                            </a-select>
                        </div>
                    </section>
                    <section>
                        <div><span>社会统一信用代码：</span><input v-model="supplierData.corpCode" type="text"></div>
                        <div><span>注册地区编码:</span><input v-model="supplierData.areaCode" type="text"></div>
                        <div><span>邮政编码：</span><input v-model="supplierData.zipCode" type="text"></div>
                        <div><span>法人代表职务：</span><input v-model="supplierData.legalManDuty" type="text"></div>
                        <div><span>法人代表证件类型：</span><input v-model="supplierData.legalManIDCardType" type="text"></div>
                        <div><span>注册资本：</span><input v-model="supplierData.regCapital" type="text"></div>
                        <div><span>资本币种：</span><input v-model="supplierData.capitalCurrencyType" type="text"></div>
                        <div><span>成立日期：</span><input v-model="supplierData.establishDate" type="text"></div>
                        <div><span>传真号码：</span><input v-model="supplierData.faxNumber" type="text"></div>
                        <div><span>联系人电话：</span><input v-model="supplierData.linkPhone" type="text"></div>
                        <div><span>企业网址：</span><input v-model="supplierData.webSite" type="text"></div>
                    </section>
                </div>
                <div class="upLoad"></div>
                <div class="submitBut">
                    <a-button @click="quxiao">取消</a-button>
                    <a-button type="primary" @click="queren">确认</a-button>
                </div>
            </div>
        </div>
        <div v-if='corpBasicDetail' class="corpBasicDetail">
            <div @click="corpBasicDetail=null" class="bac"></div>
            <div class="cont">
                <div class="block">
                    <div><span>供应商名称：</span><span>{{corpBasicDetail.corpName}}</span></div>
                    <div><span>联系人：</span><span>{{corpBasicDetail.linkMan}}</span></div>
                    <div><span>联系电话：</span><span>{{corpBasicDetail.linkPhone}}</span></div>
                </div>
                <div class="block">
                    <div><span>社会统一信用代码：</span><span>{{corpBasicDetail.corpCode}}</span></div>
                    <div><span>地址：</span><span>{{corpBasicDetail.address}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {supplierName} from '../../../utils/dataDictionary.js'
export default {
    data(){
        return{
            type:'',
            columns : [{
                title: '名称',
                align: 'center',
                dataIndex: 'corpName',
                scopedSlots: { customRender: 'corpName' },  
            },{
                title: '联系人',
                align: 'center',
                dataIndex: 'linkMan',
            },{
                title: '手机号码',
                align: 'center',
                dataIndex: 'linkPhone',
            },{
                title:'供应商类型',
                align: 'center',
                dataIndex:"supplierSubType",
                scopedSlots: { customRender: 'supplierSubType' },  
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
            show_searchData:{
                corpName:'',
                legalMan:'',
                supplierSubType:1
            },
            searchData:{
                corpName:'',
                legalMan:'',
                supplierSubType:1
            },
            // 新增界面显示隐藏
            visible2:false,
            // 新增&修改项目信息
            supplierData:{
                corpName:'',//企业名称
                corpType:'',//企业注册类型
                licenseNum:'',//工商营业执照注册号
                address:'',//企业营业地址
                legalMan:'',//法定代表人姓名
                legaManProTitle:'',//法定代表人职称
                legalManIDCardNumber:'',//法定代表人证件号码
                factRegCapital:'',//实收资本
                registerDate:'',//注册日期
                officePhone:'',//办公电话
                linkMan:'',//联系人姓名
                email:'',//企业邮箱
                supplierSubType:'',
                corpCode:'',//社会统一信用代码
                areaCode:'',//注册地区编码
                zipCode:'',//邮政编码
                legalManDuty:'',//法人代表职务
                legalManIDCardType:'',//法人代表证件类型
                regCapital:'',//注册资本
                capitalCurrencyType:'',//资本币种
                establishDate:'',//成立日期
                faxNumber:'',//传真号码
                linkPhone:'',//联系人电话
                webSite:'',//企业网址
            },
            corpBasicDetail:null
        }
    },
    mounted(){
        this.getCorpBasicInfoList();
    },
    watch:{
        "visible1":function(n,o) {
            if(n){
                this.show_searchData=JSON.parse(JSON.stringify(this.searchData))
            }
        },
        "visible2":function(n,o) {
            if(!n) this.supplierData={};
        }
    },
    methods:{
        // 获取企业列表
        getCorpBasicInfoList(){
            this.$axios.post('/t_dz_corpbasicinfo/selectCorpBasicInfoList',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                ...this.searchData
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
                this.visible1=false
            })
        },
        // 删除企业
        delSupplier(id){
            this.$axios.post('/t_dz_corpbasicinfo/deleteCorpBasicInfoByCorpId',{
                corpId:id
            }).then((res)=>{
                this.getCorpBasicInfoList();
            })
        },
        // 添加或修改企业
        addSetCorpBasic(){
            let url=this.type=='add'?'/t_dz_corpbasicinfo/insertCorpBasicInfo':'/t_dz_corpbasicinfo/updateCorpBasicInfo'
            this.$axios.post(url,{
                data:JSON.stringify(this.supplierData)
            }).then((res)=>{
                this.visible2=false
                this.pageNum=1
                this.getCorpBasicInfoList();
            })
        },
        // 上一页下一页
        preNextPage(e){
            this.pageNum=e
            this.getProjectList()
        },
        // 查询供应商类型
        selectSupplierSubType(e){
            this.show_searchData.supplierSubType=e
        },
        // 查询企业
        reSearch(){
            if(this.show_searchData.corpName==''){
                this.$message.warning('请输入企业名称');
            }else if(this.show_searchData.legalMan==''){
                this.$message.warning('请输入法人');
            }else{
                this.pageNum=1;
                this.searchData=JSON.parse(JSON.stringify(this.show_searchData))
                this.getCorpBasicInfoList();
            }
        },
        // 刷新
        redo(){
            this.show_searchData.corpName='';
            this.show_searchData.legalMan='';
            this.show_searchData.supplierSubType=1;
            this.searchData.corpName='';
            this.searchData.legalMan='';
            this.searchData.supplierSubType=1;
            this.pageNum=1;
            this.getCorpBasicInfoList();
        },
        // 新增按钮
        addCorpBasicButton(){
            // 将type修改为新增
            this.type='add'
            this.visible2=true
        },
        // 取消
        quxiao(){
            this.visible2=false
        },
        //确认提交信息
        queren(){
            this.addSetCorpBasic();
        },
        //查看企业档案详情
        seeDetail(record){
            this.corpBasicDetail=JSON.parse(JSON.stringify(record))
        },
        // 供应商类型
        supplierType(num){
            return supplierName(num)
        },
        // 修改&操作企业
        setSupplierButton(text,record){
            // 将type类型修改为修改
            this.type='set';
            this.supplierData=JSON.parse(JSON.stringify(record))
            this.visible2=true; 
        },
        // 删除企业
        delSupplierButton(text,record){
            this.$confirm({
                title: '您确定要删除该供应商吗？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk:()=>{
                    this.delSupplier(record.corpId);
                },
                onCancel:()=>{
                },
            })
        },
        // 企业详情多选框
        supplierSelect(e,type){
            this.supplierData[type]=e
        }
    }
}
</script>
<style lang="less" scoped>
    .projectInfo{
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
        .corpBasicDetail{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            .bac{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                background: rgba(0, 0, 0, 0.5);
            }
            .cont{
                width:60%;
                position: absolute;
                left: 50%;
                top: 30%;
                transform: translateX(-50%);
                z-index: 2;
                background:#fff;
                display: flex;
                justify-content: space-between;
                padding: 20px;
                color: #333;
                .block{
                    div{
                        margin-bottom: 10px;
                        span{
                            display: inline-block;
                        }
                    }      
                }
            }
        }
    }
</style>