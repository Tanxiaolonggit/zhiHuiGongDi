<template>
    <div class="equipment">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>起重设备档案</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="buttons">
            <a-button type="primary" icon="search" @click="visible1=true">查询</a-button>
            <a-button icon="redo" class="rebutton" @click="redo">刷新</a-button>
            <a-button icon="plus" @click="addEquipmentButton">新增</a-button>
        </div>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template slot="deviceType" slot-scope="text">
                    <span>{{equipmentName(text)}}</span>
                </template>
                <template slot="caozuo" slot-scope="text,record ">
                    <a @click="setEquipmentButton(text,record)">操作</a>
                    <a @click="delEquipmentButton(text,record)" style="margin-left:5px;color:#f22a32;">删除</a>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div> 
        <!-- 查询模态框 -->
        <a-modal title="查询" v-if='visible1' v-model="visible1" @ok="reSearch">
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;">
                <span>设备类型：</span>
                <a-select style="flex:1;" :defaultValue='show_searchData.deviceType' @change="selectEquipmentType">
                    <a-select-option value="0">起重机</a-select-option>
                    <a-select-option value="1">升降机</a-select-option>
                    <a-select-option value="2">其他</a-select-option>
                </a-select>
            </div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;"><span>设备编号：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.recordNum"></div>
        </a-modal>
        <!-- 新增&修改项目界面 -->
        <div class="addAndSet" v-if='visible2'>
            <div class="bac" @click="quxiao"></div>
            <div class="inputCont">
                <div class="top">
                    <section>
                        <!-- <div><span>设备编号：</span><input v-model="equipmentData.recordNum" type="text"></div> -->
                        <div>
                            <span>机械类型：</span>
                            <a-select style="width:100%;" :defaultValue="equipmentData.deviceType" @change="equipmentSelect($event,'deviceType')">
                                <a-select-option value="0">起重机</a-select-option>
                                <a-select-option value="1">升降机</a-select-option>
                                <a-select-option value="2">其他</a-select-option> 
                            </a-select>
                        </div>
                        <div><span>规格型号：</span><input v-model="equipmentData.specifications" type="text"></div>
                        <div><span>制造许可证编号：</span><input v-model="equipmentData.ManuLicense" type="text"></div>
                        <div>
                            <span>项目名称：</span>
                            <a-select  @change="equipmentSelect($event,'projectId')">
                                <a-select-option :value="item.projectId" v-for='(item,index) in projectList' :key="'pro'+index">{{item.projectName}}</a-select-option> 
                            </a-select>
                        </div>
                    </section>
                    <section>
                        <div><span>备案编号：</span><input v-model="equipmentData.recordNum" type="text"></div>
                        <div><span>SN：</span><input v-model="equipmentData.devcieSn" type="text"></div>
                        <div><span>主要参数：</span><input v-model="equipmentData.mainParameter" type="text"></div>
                        <div><span>安装单位：</span><input v-model="equipmentData.installUnit" type="text"></div>
                        <div><span>设备寿命(年)：</span><input v-model="equipmentData.deviceLife" type="text"></div>
                    </section>
                    <section>
                        <div><span>产权单位：</span><input v-model="equipmentData.propertyRight" type="text"></div>
                        <div><span>产权单位许可证：</span><input v-model="equipmentData.propertyRightLicense" type="text"></div>
                        <div><span>制造厂家：</span><input v-model="equipmentData.manufacturer" type="text"></div>
                        <div><span>安装单位资质：</span><input v-model="equipmentData.installLicense" type="text"></div>
                        <div>
                            <span>黑匣子状态：</span>
                            <a-select :defaultValue="equipmentData.blackBoxStatus" @change="equipmentSelect($event,'blackBoxStatus')">
                                <a-select-option value="0">未装</a-select-option>
                                <a-select-option value="1">已装</a-select-option> 
                            </a-select>
                        </div>
                    </section>
                    <section>
                        <div><span>出厂日期：</span><input v-model="equipmentData.productDate" type="text"></div>
                        <div><span>备案日期：</span><input v-model="equipmentData.recordDate" type="text"></div>
                        <div><span>进场日期：</span><input v-model="equipmentData.enterDate" type="text"></div>
                        <div><span>安装日期：</span><input v-model="equipmentData.installDate" type="text"></div>
                    </section>
                </div>
                <div class="upLoad"></div>
                <div class="submitBut">
                    <a-button @click="quxiao">取消</a-button>
                    <a-button type="primary" @click="queren">确认</a-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {equipments} from '../../../../utils/dataDictionary.js'
import {pullProjectLists} from '../../../../utils/pubFunc.js'
export default {
    data(){
        return{
            type:'',
            columns : [{
                title: '备案编号',
                align: 'center',
                dataIndex: 'recordNum',
            },{
                title: '类型',
                align: 'center',
                dataIndex: 'deviceType',
                scopedSlots: { customRender: 'deviceType' },  
            },{
                title: '型号',
                align: 'center',
                dataIndex: 'specifications',
            },{
                title:'产权单位',
                align: 'center',
                dataIndex:"propertyRight",
            },{
                title:'项目名称',
                align: 'center',
                dataIndex:"projectName", 
            },{
                title:'制造厂商',
                align: 'center',
                dataIndex:"manufacturer",
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
                recordNum:'',
                //设备类型
                deviceType:''
            },
            searchData:{
                recordNum:'',
                // 设备类型  
                deviceType:''
            },
            // 新增界面显示隐藏
            visible2:false,
            // 新增&修改项目信息
            equipmentData:{
                // deviceId:'',//设备编号
                deviceType:'',//设备类型
                specifications:'',//规格型号
                ManuLicense:'',//制造许可证编号
                projectId:'',//项目名称（id）
                recordNum:'',//备案编号
                devcieSn:'',//sn 设备流水号
                mainParameter:'',//主要参数
                installUnit:'',//安装单位
                deviceLife:'',//设备寿命
                propertyRight:'',//产权单位
                propertyRightLicense:'',//产权单位许可证
                manufacturer:'',//制造厂家
                installLicense:'',//安装单位资质
                blackBoxStatus:'',//黑匣子状态
                productDate:'',//出厂日期
                recordDate:'',//备案日期
                enterDate:'',//进场日期
                installDate:'',//安装日期
            },
            // 项目列表 用于新增设备绑定
            projectList:[]
        }
    },
    mounted(){
        this.getEquipmentList();
    },
    watch:{
        "visible1":function(n,o) {
            if(n){
                this.show_searchData=JSON.parse(JSON.stringify(this.searchData))
            }
        },
        "visible2":function(n,o) {
            if(!n){
                // 清除供应商详情
                this.equipmentData={};
            }else{
                // 拉取项目列表
                pullProjectLists(this).then((res)=>{
                    this.projectList=res
                })
            }
        }
    },
    methods:{
        // 获取起重设备列表
        getEquipmentList(){
            this.$axios.post('/t_dz_device/selectDeviceAll',{
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
        delEquipment(deviceId,projectId){
            this.$axios.post('/t_dz_device/deleteDevice',{
                deviceId:deviceId,
                projectId:projectId
            }).then((res)=>{
                this.getEquipmentList();
            })
        },
        // 添加或修改企业
        addSetEquipment(){
            let url=this.type=='add'?'/t_dz_device/insertDevice':'/t_dz_device/updateDevice'
            this.$axios.post(url,{
                data:JSON.stringify(this.equipmentData)
            }).then((res)=>{
                this.visible2=false
                this.pageNum=1
                this.getEquipmentList();
            })
        },
        // 上一页下一页
        preNextPage(e){
            this.pageNum=e
            this.getEquipmentList()
        },
        // 设置查询供应商类型
        selectEquipmentType(e){
            this.show_searchData.deviceType=e
        },
        // 查询企业
        reSearch(){
            if(this.show_searchData.deviceType==''){
                this.$message.warning('请选择设备类型');
            }else if(this.show_searchData.recordNum==''){
                this.$message.warning('请输入设备编号');
            }else{
                this.pageNum=1;
                this.searchData=JSON.parse(JSON.stringify(this.show_searchData))
                this.getEquipmentList();
            }
        },
        // 刷新
        redo(){
            this.show_searchData.deviceType='';
            this.show_searchData.recordNum='';
            this.searchData.deviceType='';
            this.searchData.recordNum='';
            this.pageNum=1;
            this.getEquipmentList();
        },
        // 新增按钮
        addEquipmentButton(){
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
            this.addSetEquipment();
        },
        // 修改&操作大型设备
        setEquipmentButton(text,record){
            // 将type类型修改为修改
            this.type='set';
            this.equipmentData=JSON.parse(JSON.stringify(record))
            this.visible2=true; 
        },
        // 删除大型设备
        delEquipmentButton(text,record){
            this.$confirm({
                title: '您确定要删除该起重设备吗？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk:()=>{
                    this.delEquipment(record.deviceId,record.projectId);
                },
                onCancel:()=>{
                },
            })
        },
        // 大型设备详情多选框
        equipmentSelect(e,type){
            this.equipmentData[type]=e
        },
        // 显示设备类型
        equipmentName(num){
            return equipments(num)
        }
    }
}
</script>
<style lang="less" scoped>
    .equipment{
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