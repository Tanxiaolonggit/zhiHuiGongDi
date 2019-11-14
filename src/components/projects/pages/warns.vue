<template>  
    <div class="warns">
        <!-- 按钮 -->
        <div class="warns_btn">
            <a-button @click="getWarns" type="primary">重置</a-button>
            <a-button @click="showModal" type="primary">搜索</a-button>
        </div>
        <!-- 模态框 -->
        <a-modal
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            :destroyOnClose='true'
            :mask='true'
            okText='搜索'
            cancelText='取消'
        >
            <div class="modal_selcet" style='margin: 10px 0;'>
                <span style="margin-right:20px;">预警等级：</span>
                <a-select style="width:200px;"  @change="handleChangeLevel">
                    <a-select-option value="0">红色</a-select-option>
                    <a-select-option value="1">黄色</a-select-option>
                    <a-select-option value="2">蓝色</a-select-option>
                </a-select>
            </div>
            <div class="modal_selcet" style='margin:10px 0;'>
                <span style="margin-right:20px;">预警时间：</span>
                <a-range-picker  @change="calendarChange" />
            </div>
            <div class="modal_selcet" style='margin:10px 0;'>
                <span style="margin-right:20px;">预警标题：</span>
                <a-input placeholder="请输入标题" style="width:200px;" v-model='searchMsg.warnContent'/>
            </div>
            <div class="modal_selcet" style='margin:10px 0;'>
                <span style="margin-right:20px;">预警状态：</span>
                <a-select style="width:200px;" @change="handleChangeStatus">
                    <a-select-option value="0">待处理</a-select-option>
                    <a-select-option value="1">已处理</a-select-option>
                </a-select>
            </div>
        </a-modal>
        <!-- 表格 -->
        <div class="warns_table">
            <a-table :columns="columns" :dataSource="list" :pagination='false'  bordered>
                <template slot="warnLevel" slot-scope="text">
                    <span :style="{background:text==0?'#fa541c':text==1?'#fa8c16':'#adc6ff'}" class="warnLevel"></span>
                </template>
                <template slot="warnStatus" slot-scope="text">
                    <span :style="{borderColor:text==0?'#b7eb8f':'#ffbb96',color:text==0?'#52c41a':'#fa541c',background:text==0?'#f6ffed':'#fff2e8'}" class="tags">{{text==0?'已处理':'未处理'}}</span>
                </template>
            </a-table>
            <a-pagination  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
        </div>
    </div>
</template>
<script>
import {serverTimestamp} from '../../../utils/util_one.js'
export default {
    data(){
        return{
            projectId:this.$route.params.projectId,
            pageNum:1,
            pageSize:5,
            total:0,
            columns : [{
                title: '预警等级',
                align: 'center',
                dataIndex: 'warnLevel',
                scopedSlots: { customRender: 'warnLevel' },
            }, {
                title: '预警时间',
                align: 'center',
                dataIndex: 'warnTime',
            }, {
                title: '预警标题',
                align: 'center',
                dataIndex: 'warnTitle',
            },{
                title: '预警内容',
                align: 'center',
                dataIndex: 'warnContent',
            },{
                title:"预警详情",
                align: 'center',
                dataIndex:"remarks"
            },{
                title:"预警状态",
                align: 'center',
                dataIndex:"warnStatus",
                scopedSlots: { customRender: 'warnStatus' },
            }],
            list:[],
            // 模态框参数
            visible: false,
            confirmLoading: false,
            // 预警搜索参数
            searchMsg:{
                'warnLevel':null,
                'warnStatus':null,
                'warnTimeBegin':null,
                'warnTimeEnd':null,
                'warnContent':null
            }
        }
    },
    mounted(){
        this.getWarns()
    },
    methods:{    
        // 获取预警信息 
        getWarns(){
            this.$axios.post('/t_dz_warn/selectWarnAll',{
                projectId:this.projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
            })
        },
        // 下一页
        preNextPage(e){
            this.pageNum=e
            this.getWarns()
        },
        //预警搜索事件
            // 显示隐藏模态框
        showModal() {
            this.visible = true;
        },
            // 模态框确认
        handleOk(e) {
            this.confirmLoading = true;
            this.searchWarns();
        },
            // 模态框取消
        handleCancel(e) {
            this.visible = false;
            // 循环清除数据
            Object.keys(this.searchMsg).forEach((item)=>{
                searchMsg[item]=null
            })
        },
            // 选择日期
        calendarChange(e){
            if(e.length==2){
                this.searchMsg.warnTimeBegin=serverTimestamp(e[0]._d.getTime())
                this.searchMsg.warnTimeEnd=serverTimestamp(e[1]._d.getTime())
            }else{
                this.searchMsg.warnTimeBegin=null
                this.searchMsg.warnTimeEnd=null
            }
        },
            // 选择等级
        handleChangeLevel(e){
            this.searchMsg.warnLevel=e
        },
            // 选择状态
        handleChangeStatus(e){
            this.searchMsg.warnStatus=e
        },
        // 搜索预警
        searchWarns(){
            this.$axios.post('/t_dz_warn/selectWarn',{
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                projectId:this.projectId,
                ...this.searchMsg
            }).then((res)=>{
                this.list=res.data
                this.total=res.count
                // 关闭模态框
                this.visible = false;
                this.confirmLoading = false;
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .warns{
        height: 100%;
        overflow-y: scroll;
        background: #fff;
        padding: 0 30px;
        .warns_btn{
            text-align: right;
            padding-bottom: 10px;
            .ant-btn:nth-of-type(1){
                margin-right: 20px;
            }
        }
        .warns_table{
            height: 40%;
            // 预警等级
            .warnLevel{
                display: block;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                margin: 0 auto;
            }
            // 预警状态标签
            .tags{
                display: block;
                padding: 1px;
                border-radius: 4px;
                font-size: 12px;
                box-sizing: border-box;
                border: 1px solid;
            }
            .pagination{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
</style>