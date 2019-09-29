<template>
    <div class="personList">
        <a-tabs class="personList_table" defaultActiveKey="1" @change="tabPersonList">
            <!-- 管理人员表格 -->
            <a-tab-pane class="management" tab="管理人员" key="1">
                <a-table :columns="columns" :dataSource="list1" :pagination='false' bordered>
                </a-table>
                <a-pagination  class="pagination" @change='preNextPage1' :defaultCurrent="pageNum1" :defaultPageSize="pageSize1" :total="total1" />
            </a-tab-pane>
            <!-- 员工名单表格 -->
            <a-tab-pane class="management" tab="员工名单" key="2" forceRender>
                <a-table :columns="columns" :dataSource="list2" :pagination='false' bordered>
                </a-table>
                <a-pagination  class="pagination" @change='preNextPage2' :defaultCurrent="pageNum2" :defaultPageSize="pageSize2" :total="total2" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
export default {
    name:'staffInformation',
    data(){
        return{
            projectId:this.$route.params.projectId,
            // 管理人员表格
            columns:[{
                title: '头像',
                dataIndex: 'headPhoto',
            }, {
                title: '工号',
                dataIndex: 'personId',
            }, {
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '人员类别',
                dataIndex: 'category',
                customRender:(text, record, index)=>{
                    switch(text){
                        case "1":
                            return '管理人员'
                        case "2":
                            return '监理人员'
                        case "3":
                            return '普通人员'
                    }
                }
            },{
                title:"工种",
                dataIndex:"position"
            }],
            // 管理人员列表
            list1:[],
            // 员工列表
            list2:[],
            // 管理人员请求参数
            pageNum1:1,
            pageSize1:10,
            total1:0,
            // 员工列表请求参数
            pageNum2:1,
            pageSize2:10,
            total2:0
        }
    },
    mounted(){
        this.getStaffList();
    },
    methods:{
        // 切换人员列表
        tabPersonList(key){
            switch(key){
                case "1":
                    this.getStaffList();
                    break;
                case "2":
                    this.getPersonAll();
                    break;
            }
        },
        // 管理人员翻页
        preNextPage1(e){
           this.pageNum1=e; 
           this.getStaffList();
        },
        // 员工名单翻页
        preNextPage2(e){
           this.pageNum2=e; 
           this.getPersonAll();
        },
        // 获取管理员列表
        getStaffList(){
            this.$axios.post('/t_dz_person/selectPersonManagerInfo',{
                projectId:this.projectId,
                pageNum:this.pageNum1,
                pageSize:this.pageSize1
            }).then((res)=>{
                this.list1=res.data
                this.total1=res.count
            })
        },
        // 获取员工列表
        getPersonAll(){
            this.$axios.post('/t_dz_person/selectPersonInfoAll',{
                projectId:this.projectId,
                pageNum:this.pageNum1,
                pageSize:this.pageSize1
            }).then((res)=>{
                this.list2=res.data
                this.total2=res.count
            })
        },
    }
}
</script>
<style lang="less" scoped>
    .personList{
        // 表格
        .personList_table{
            // 管理人员
            .management{
                // 分页器
                .pagination{
                    text-align: center;
                    box-sizing: border-box;
                    padding-top: 10px;
                }
            }
        }
    }
</style>