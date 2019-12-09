<template>
    <div class="projectInfo">
        <a-breadcrumb>
            <a-breadcrumb-item>基本档案</a-breadcrumb-item>
            <a-breadcrumb-item>项目档案</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="buttons">
            <a-button type="primary" icon="search" @click="visible1=true">查询</a-button>
            <a-button icon="redo" class="rebutton" @click="redo">刷新</a-button>
            <a-button icon="plus" @click="addProjectButton">新增</a-button>
        </div>
        <div class="tables">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template  slot="projectStatus" slot-scope="text,record">
                    <span class="status" :style="{background:record.projectStatus==1?'#edf7f1':'#f8f2f1',color:record.projectStatus==1?'#1bd177':'#f6485c'}">{{statuss(record.projectStatus)}}</span>
                    <span class="status" v-if='record.wisdomProject' style="color:#1890ff;background:#e6f7ff;">智慧工程</span>
                    <span class="status" style="color:#fa8c16;background:#fff7e6;">{{record.demoProject==1?'示范':'非示范'}}</span>
                </template>
                <template slot="caozuo" slot-scope="text,record ">
                    <a @click="setProjectButton(text,record)">操作</a>
                </template>
            </a-table>
            <a-pagination showQuickJumper class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" /> 
        </div> 
        <!-- 查询模态框 -->
        <a-modal title="查询" v-if='visible1' v-model="visible1" @ok="reSearch">
            <div style="display:flex;align-items: center;width:80%;margin:0 auto;"><span>项目名称：</span><input style="flex:1;border:1px solid #d9d9d9;border-radius:4px;box-sizing:border-box;padding:0 11px;height:30px;line-height:30px;" type="text" v-model="show_searchData.projectName"></div>
            <div style="display:flex;align-items: center;width:80%;margin:20px auto 0;">
                <span>项目状态：</span>
                <a-select style="flex:1;" :defaultValue='show_searchData.projectStatus' @change="selectStatus">
                    <a-select-option value="1">筹备</a-select-option>
                    <a-select-option value="3">在建</a-select-option>
                    <a-select-option value="4">完工</a-select-option>
                    <a-select-option value="5">停工</a-select-option>
                </a-select>
            </div>
        </a-modal>
        <!-- 新增&修改项目界面 -->
        <div class="addAndSet" v-if='visible2'>
            <div class="bac" @click="quxiao"></div>
            <div class="inputCont">
                <div class="top">
                    <section>
                        <div><span>项目名称：</span><input v-model="projectData.projectName" type="text"></div>
                        <div><span>工程面积：</span><input v-model="projectData.projectScale" type="text"></div>
                        <div><span>项目造价：</span><input v-model="projectData.projectCost" type="text"></div>
                        <div>
                            <span>项目状态：</span>
                            <a-select :defaultValue="projectData.projectStatus" @change="porojectSelect($event,'projectStatus')">
                                <a-select-option value="1">筹备</a-select-option>
                                <a-select-option value="3">在建</a-select-option>
                                <a-select-option value="4">完工</a-select-option>
                                <a-select-option value="5">停工</a-select-option>
                            </a-select>
                        </div>
                        <div><span>工程工期：</span><input v-model="projectData.buildTime" type="text"></div>
                        <div><span>计划开工时间：</span><input v-model="projectData.planBeginTime" type="text"></div>
                        <div><span>计划竣工时间：</span><input v-model="projectData.planEndTime" type="text"></div>
                        <div><span>实际开工时间：</span><input v-model="projectData.realBeginTime" type="text"></div>
                        <div><span>实际竣工时间：</span><input v-model="projectData.realEndTime" type="text"></div>
                        <div><span>项目联系人：</span><input v-model="projectData.linkMan" type="text"></div>
                        <div><span>项目联系邮箱：</span><input v-model="projectData.linkEmail" type="text"></div>
                        <div>
                            <span>国籍或地区：</span>
                            <a-select :defaultValue="projectData.nationNum" @change="porojectSelect($event,'nationNum')">
                            </a-select>
                        </div>
                        <div>
                            <span>建设性质：</span>
                            <a-select :defaultValue="projectData.propertyNum"  @change="porojectSelect($event,'propertyNum')">
                            </a-select>
                        </div>
                    </section>
                    <section>
                        <div><span>项目地址：</span><input v-model="projectData.projectAddress" type="text"></div>
                        <div><span>建设单位：</span><input v-model="projectData.buildingSide" type="text"></div>
                        <div><span>勘察单位：</span><input v-model="projectData.explorationUnit" type="text"></div>
                        <div><span>施工单位：</span><input v-model="projectData.constructionUnit" type="text"></div>
                        <div><span>监理单位：</span><input v-model="projectData.supervisionUnit" type="text"></div>
                        <div><span>设计单位：</span><input v-model="projectData.designUnit" type="text"></div>
                        <div>
                            <span>工程类别：</span>
                            <a-select :defaultValue="projectData.projectType" @change="porojectSelect($event,'projectType')">
                                <a-select-option value="1">房屋建筑工程</a-select-option>
                                <a-select-option value="2">市政公用工程</a-select-option>
                                <a-select-option value="3">机电安装工程</a-select-option>
                                <a-select-option value="4">铁路工程</a-select-option>
                                <a-select-option value="5">公路工程</a-select-option>
                                <a-select-option value="6">港口与航道工程</a-select-option>
                                <a-select-option value="7">水利水电工程</a-select-option>
                                <a-select-option value="8">电力工程</a-select-option>
                                <a-select-option value="9">矿山工程</a-select-option>
                                <a-select-option value="10">冶炼工程</a-select-option>
                                <a-select-option value="11">化工石油工程</a-select-option>
                                <a-select-option value="12">通信工程</a-select-option>
                                <a-select-option value="99">其他</a-select-option>
                            </a-select>
                        </div>
                        <div>
                            <span>项目级别：</span>
                            <a-select :defaultValue="projectData.projectLevel" @change="porojectSelect($event,'projectLevel')">
                                <a-select-option value="1">国级</a-select-option>
                                <a-select-option value="2">省级</a-select-option>
                                <a-select-option value="3">市级</a-select-option>
                                <a-select-option value="4">一般</a-select-option>
                            </a-select>
                        </div>
                        <div>
                            <span>智慧工地：</span>
                            <a-select :defaultValue="projectData.wisdomProject" @change="porojectSelect($event,'wisdomProject')">
                                <a-select-option value="0">否</a-select-option>
                                <a-select-option value="1">是</a-select-option>
                            </a-select>
                        </div>
                        <div>
                            <span>示范工程：</span>
                            <a-select :defaultValue="projectData.demoProject" @change="porojectSelect($event,'demoProject')">
                                <a-select-option value="0">否</a-select-option>
                                <a-select-option value="1">是</a-select-option>
                            </a-select>
                        </div>
                        <div><span>项目联系电话：</span><input v-model="projectData.linkTelNum" type="text"></div>
                        <div><span>摘要备注：</span><input v-model="projectData.remarks" type="text"></div>
                        <div><span>总长度：</span><input v-model="projectData.buildingArea" type="text"></div>
                        <div>
                            <span>工程用途：</span>
                            <a-select :defaultValue="projectData.prjNum" @change="porojectSelect($event,'prjNum')">
                            </a-select>
                        </div>
                    </section>
                    <section>
                        <div><span>总承包单位统一社会信用代码：</span><input v-model="projectData.contractorCorpCode" type="text"></div>
                        <div><span>建设单位统一社会信用代码：</span><input v-model="projectData.buildCorpCode" type="text"></div>
                        <div><span>建设用地规划许可证编号：</span><input v-model="projectData.buildPlanNum" type="text"></div>
                        <div><span>建设工程规划许可证编号：</span><input v-model="projectData.prjPlanNum" type="text"></div>
                        <div>
                            <span>区域代码：</span>
                            <a-select :defaultValue="projectData.areaCode" @change="porojectSelect($event,'areaCode')">
                            </a-select>
                        </div>
                        <div>
                            <span>城市代码：</span>
                            <a-select :defaultValue="projectData.cityCode" @change="porojectSelect($event,'cityCode')">
                            </a-select>
                        </div>
                        <div>
                            <span>国家代码：</span>
                            <a-select :defaultValue="projectData.countryCode" @change="porojectSelect($event,'countryCode')">
                            </a-select>
                        </div>
                        <div><span>位置经度：</span><input v-model="projectData.posLng" type="text"></div>
                        <div><span>位置纬度：</span><input v-model="projectData.posLat" type="text"></div>
                        <div><span>施工许可证号：</span><input v-model="projectData.builderLicenseNum" type="text"></div>
                        <div><span>立项文号：</span><input v-model="projectData.approvalNum" type="text"></div>
                        <div>
                            <span>立项级别：</span>
                            <a-select :defaultValue="projectData.approvalLevelNum" @change="porojectSelect($event,'approvalLevelNum')">
                            </a-select>
                        </div>
                        <div>
                            <span>建设规模：</span>
                            <a-select :defaultValue="projectData.prjSize" @change="porojectSelect($event,'prjSize')">
                                <a-select-option value="1">大型</a-select-option>
                                <a-select-option value="2">中型</a-select-option>
                                <a-select-option value="3">小型</a-select-option>
                            </a-select>
                        </div>
                        <div><span>第三方项目编码：</span><input v-model="projectData.thirdPartyProjectCode" type="text"></div>
                    </section>
                </div>
                <div class="upLoad"></div>
                <div class="submitBut">
                    <a-button @click="quxiao">取消</a-button>
                    <a-button type="primary" @click="queding">确认</a-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {projectStatus} from '../../../../utils/dataDictionary.js'
export default {
    data(){
        return{
            type:'',
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
            show_searchData:{
                projectName:'',
                projectStatus:''
            },
            searchData:{
                projectName:'',
                projectStatus:''
            },
            // 新增界面显示隐藏
            visible2:false,
            // 新增&修改项目信息
            projectData:{
                projectName:'',//项目名称
                projectScale:'', //建设规模
                projectCost:'', //项目造价
                projectStatus:'',//项目状态
                buildTime:'',//工程工期
                planBeginTime:'',//计划开工时间
                planEndTime:'',//计划竣工时间
                realBeginTime:'',//实际开工时间
                realEndTime:'',//实际竣工时间
                linkMan:'',//项目联系人
                linkEmail:'',//项目联系邮箱
                nationNum:'', //国籍或地区
                propertyNum:'',//建设性质
                projectAddress:'',//项目地址
                buildingSide:'',//建设单位
                explorationUnit:'',//勘察单位
                constructionUnit:'',//施工单位
                supervisionUnit:'',//监理单位
                designUnit:'',//设计单位
                projectType:'',//工程类别
                projectLevel:'',//项目级别
                wisdomProject:'',//是否智慧工程
                demoProject:'',//是否示范工程
                linkTelNum:'', //项目联系电话
                remarks:'',//摘要备注
                buildingArea:'',//总长度
                prjNum:'',//工程用途
                contractorCorpCode:'',//总承包单位统一社会信用代码
                buildCorpCode:'',//建设单位统一社会信用代码
                buildPlanNum:'',//建设用地规划许可证编号
                prjPlanNum:'',//建设工程规划许可证编号
                areaCode:'',//区域代码
                cityCode:'',//城市代码
                countryCode:'',//国家代码
                posLng:'',//位置经度
                posLat:'',//位置纬度
                builderLicenseNum:'',//施工许可证号
                approvalNum:'',//立项文号
                approvalLevelNum:'',//立项级别
                prjSize:'',//立项规模
                thirdPartyProjectCode:'',//第三方项目编码
            }
        }
    },
    mounted(){
        this.getProjectList();
    },
    watch:{
        "visible1":function(n,o){
            if(n){
                this.show_searchData=JSON.parse(JSON.stringify(this.searchData))
            }
        },
        "visible2":function(n,o) {
            if(!n) this.projectData={};
        }
    },
    methods:{
        // 获取项目列表
        getProjectList(){
            this.$axios.post('/t_dz_project/selectProjectInfoAll',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                ...this.searchData
            }).then((res)=>{
                // 保存数据
                this.list=res.data
                this.total=res.count
            })
        },
        // 按照查询获取项目类表
        getSearchProjectList(){
            this.$axios.post('/t_dz_project/selectProjectInfoList ',{
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
        // 添加或者修改项目
        addSetProject(){
            let url=this.type=='add'?'/t_dz_project/insertProjectInfo':'/t_dz_project/updateProjectInfo'
            this.$axios.post(url,{
                data:JSON.stringify(this.projectData)
            }).then(()=>{
                this.visible2=false
                this.pageNum=1
                this.getProjectList();
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
            this.show_searchData.projectStatus=e
        },
        // 查询项目
        reSearch(){
            if(this.show_searchData.projectName==''){
                this.$message.warning('请输入项目名称');
            }else if(this.show_searchData.projectStatus==''){
                this.$message.warning('请选择项目状态');
            }else{
                this.pageNum=1;
                this.searchData=JSON.parse(JSON.stringify(this.show_searchData))
                this.getSearchProjectList();
            }
        },
        // 刷新
        redo(){
            this.show_searchData.projectName='';
            this.show_searchData.projectStatus='';
            this.searchData.projectName='';
            this.searchData.projectStatus='';
            this.pageNum=1;
            this.getProjectList();
        },
        // 新增按钮
        addProjectButton(){
            // 将type修改为新增
            this.type='add'
            this.visible2=true
        },
        // 取消
        quxiao(){
            this.visible2=false
        },
        queding(){
            this.addSetProject();
        },
        // 修改&操作项目
        setProjectButton(text,record){
            // 将type修改为修改
            this.type='set'
            this.projectData=JSON.parse(JSON.stringify(record))
            this.visible2=true;
        },
        // 项目详情多选框
        porojectSelect(e,type){
            this.projectData[type]=e
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
                padding:40px 20px 40px 0;
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
                                width: 100px;
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