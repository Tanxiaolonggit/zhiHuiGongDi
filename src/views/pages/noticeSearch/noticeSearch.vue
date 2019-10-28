<template>
    <div class="notice">
        <div class="notice_title">
            <div class="logo">重庆市渝北区智慧工地信息管理平台</div>
            <div class="valueInput">
                <a-input-group compact class="inputBox">
                    <a-select defaultValue="通知公告" @change="selectChange">
                        <a-select-option value="0">通知公告</a-select-option>
                        <a-select-option value="1">相关文档</a-select-option>
                    </a-select>
                    <a-input-search placeholder="请输入关键字" @search="onSearch" v-model="searchCont" @input="docSearch" enterButton />
                    <div></div>
                </a-input-group>
            </div>
        </div>
        <div class="notice_bac">
           <img />     
        </div>
        <div class="notice_cont">
            <div class="notice_cont_left">
                <span @click='toIndex()' style="color:#fff;">返回首页</span>
                <span @click="checkType(0)" :style="{color:type==0?'#333':'#fff',background:type==0?'#fff':'#1890ff'}">通知公告</span>
                <span @click="checkType(1)" :style="{color:type==1?'#333':'#fff',background:type==1?'#fff':'#1890ff'}">相关文档</span>            
            </div>
            <div class="notice_cont_right">
                <div v-if='type==0'>
                    <div class="forBlock" v-for='(item,index) in docList' :key='"doc"+index'>
                        <a-icon type="caret-right" />
                        <span>{{item.noticeName}}</span>
                        <span>{{item.noticeDate}}</span>
                    </div>
                </div>
                <div v-else>
                    <div class="forBlock" v-for='(item,index) in docList' :key='"doc"+index'>
                        <a-icon type="caret-right" />
                        <span>{{item.helpDocName}}</span>
                        <span>{{item.helpDocDate}}</span>
                    </div>
                </div>
                <div class="pagination">
                    <span>共{{total}}条数据</span>
                    <a-pagination @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 文档类型
            type:0,
            // 下拉选择的类型
            selectType:0,
            pageNum:1,
            pageSize:10,
            docList:[],
            total:0,
            // 模糊查找内容
            searchCont:''
        }
    },
    watch:{
        'type':function(n,o){
            this.pageNum=1;
            switch(parseInt(n)){
                case 0:
                    this.getInsertNotice();
                    break;
                case 1:
                    this.getHelpDoc();
            }
        }
    },
    mounted(){
        this.getInsertNotice();
    },
    methods:{
        // 文件类型改变
        selectChange(e){
            this.type=e
            // 保存下拉选择的类型
            this.selectType=e  
        },
        onSearch(e){

        },
        // 切换文件类型
        checkType(i){
            this.type=i
        },
        // input输入事件
        docSearch(e){
            this.getSearchDoc();
            let input=document.getElementsByClassName('ant-input')[0]
            console.log(input.offsetWidth)
        },
        // 获取通知公告
        getInsertNotice(){
            this.$axios.post('/t_dz_notice/selectNoticeAll',{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.docList=[...res.data]
                this.total=res.count
            })
        },
        // 获取帮助文档
        getHelpDoc(){
            this.$axios.post('/t_dz_helpdoc/selectHelpDocAll',{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.docList=[...res.data]
                this.total=res.count
            })
        },
        //获取查找文档
        getSearchDoc(){
            this.$axios.post('/search/selectFiles',{
                pageSize:1,
                pageNum:5,
                fileName:this.searchCont,
                fileType:this.selectType
            }).then((res)=>{
                console.log(res)
            })
        },
        // 下一页
        preNextPage(e){
            this.pageNum=e
            switch(this.type){
                case 0:
                    this.getInsertNotice();
                    break;
                case 1:
                    this.getHelpDoc();
            }
        },
        // 返回首页
        toIndex(){
            let user=sessionStorage.getItem('userData')
            if(user){
                this.$router.push({path:'/webContent/userData'})
            }else{
                this.$router.push({path:'/login'})
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .notice{
        width: 100%;
        height: 100%;
        .notice_title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 18px;
            height: 8%;
            // background: #1890ff;
            background: #ddd;
            .logo{
                min-width: 350px;
                font-size: 20px;
                color: #fff;
            }
            .valueInput{
                text-align: right;
                .inputBox{
                    display: flex;
                }
                button{
                    background: #999!important;
                }
            }
        }
        .notice_bac{
            height: 20%;
            background: #000;
        }
        .notice_cont{
            height: 72%;
            display: flex;
            .notice_cont_left{
                width: 15%;
                height: 100%;
                background: #1890ff;
                span{
                    display: block;
                    text-align: center;
                    padding: 15% 0;
                    transition: 0.2s;
                }
            }
            .notice_cont_right{
                width: 85%;
                height: 100%;
                padding: 20px;
                .forBlock{
                    display: flex;
                    align-items: center;
                    margin: 20px 0;
                    span:nth-of-type(1){
                        font-size: 16px;
                        color: #333;
                        flex: 1;
                        margin-left: 20px;
                    }
                    span:nth-of-type(2){
                        font-size: 12px;
                        color: #333;
                    }
                }
                .pagination{
                    display: flex;
                    align-items: center;
                    span{
                        flex: 1;
                        text-align: right;
                        margin-right: 20px;
                    }
                    a-pagination{
                        text-align: right;
                    }
                    
                }
            }
        }
    }
</style>