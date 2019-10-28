<template>
    <div>视频监控</div>
</template>
<script>
export default {
    name:'videoSurveillance',
    data(){
        return{
            projectId:this.$route.params.projectId,
            pageNum:1,
            pageSize:10
        }
    },
    mounted(){
        this.getVideos();
    },
    methods:{
        getVideos(){
            this.$axios.post('/t_dz_video/selectVideoInfoById',{
                projectId:this.projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                console.log(res)
            })
        }
    }
    
}
</script>
<style lang="less" scoped>

</style>