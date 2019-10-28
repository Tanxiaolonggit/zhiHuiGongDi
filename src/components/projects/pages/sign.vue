
<template>
    <!-- 考勤管理 -->
    <div class="signAdministration">
        <!-- 选择月份 -->
        <div class="pickMonth">
            <a-month-picker class="pickData" @change="pickMonth" placeholder="Select month" />
        </div>
    </div>
</template>
<script>
export default {
    name:'attendancea',
    data(){
        return{
            projectId:this.$route.params.projectId,
            pageNum:1,
            pageSize:10,
        }
    },
    mounted(){
        this.getSign();
    },
    methods:{
        // 选择月份
        pickMonth(e){
            let timeStamp=e._d.getTime();
            e._d.getTime()
        },
        getSign(){
            this.$axios.post('/t_dz_sign/selectSignAll',{
                projectId:this.projectId,
            }).then((res)=>{
                console.log(res)
            })
        }
    }
    
}
</script>
<style lang="less" scoped>
    .signAdministration{
        height: 100%;
        background: #fff;
        .pickMonth{
            display: flex;
            justify-content:center;
            padding-top: 10px;
        }
    }
    
</style>