<template>
    <div></div>
</template>
<script>
export default {
    name:'application',
    data(){
        return{
            
        }
    },
    methods:{
        // 获取左侧功能列表
        getAppList(){
            this.$axios.post('/t_dz_managecenter/selectManagerCenterFun',{

            }).then((res)=>{
                console.log(res)
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>
