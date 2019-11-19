<template>
    <div class="dangerProjectList">
        <a-table class="table" :columns="columns" :dataSource="list" :pagination='false'  bordered>
            <template slot="dangerLevel" slot-scope="text">
                <span>{{text==1?'超规':text==2?'正常':'超规'}}</span>
            </template>
            <template slot="dangerStatus" slot-scope="text">
                <span>{{text==1?'施工监管':'验收'}}</span>
            </template>
        </a-table>
        <a-pagination showQuickJumper  class="pagination" @change='preNextPage' :defaultCurrent="pageNum" :defaultPageSize="pageSize" :total="total" />
    </div>
</template>
<script>
export default {
    name:'dangerProject',
    data(){
        return{
            pageSize:10,
            pageNum:1,
            total:0,
            columns : [{
                title: '#',
                align: 'center',
                dataIndex: 'recordId',
            }, {
                title: '等级',
                align: 'center',
                dataIndex: 'dangerLevel',
                scopedSlots: { customRender: 'dangerLevel' },
                // customRender:(text, row, index)=>{
                //     switch(parseInt(text)){
                //         case 1:
                //             return '超规'
                //         case 2:
                //             return '正常'
                //         case 3:
                //             return '未超规'
                //     }
                // }
            }, {
                title: '分部分项',
                align: 'center',
                dataIndex: 'dangerTitle',
            },{
                title: '状态',
                align: 'center',
                dataIndex: 'dangerStatus',
                scopedSlots: { customRender: 'dangerStatus' },
            }],
            list:[]
        }
    },
    mounted(){
        this.getDangerProject();
    },
    methods:{
        // 获取危大工程列表
        getDangerProject(){
            this.$axios.post('/t_dz_dangerproject/selectDangerProjectAll',{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.list=res.data
            })
        },
        // 翻页
        preNextPage(e){
            this.pageNum=e
            this.getDangerProject()
        }
    }
}
</script>
<style lang="less" scoped>
    .dangerProjectList{
        box-sizing: border-box;
        height: 100%;
        padding: 20px;
        background: #fff;
        .pagination{
            text-align: right;
            box-sizing: border-box;
            padding-top: 10px;
        }
    }
</style>