<template>
    <div >视频监控
        <div v-if="videoList">
            <!-- <video width="400" height="300" v-for='(item,index) in videoList' :key='"viedo"+index'  :id="'myplayer'+index" :src='item.videoLinkNow'></video>
            ezopen://open.ys7.com/D45944858/1.rec?begin=20191112000000&end=20191113235959 -->
            <video width="400" height="300"   id="myplayer1"></video>

        </div>
    </div>
</template>
<script>
import '../../../utils/ezuikit.js'
export default {
    name:'videoSurveillance',
    data(){
        return{
            projectId:this.$route.params.projectId,
            pageNum:1,
            pageSize:10,
            videoList:[]
        }
    },
    mounted(){
        // this.getVideos();    
        // setTimeout(()=>{
        //     var player = new EZUIKit.EZUIPlayer('myplayer1');
        //     player.play();
        // },5000)
        setTimeout(()=>{
            let url='ezopen://open.ys7.com/D45944858/1.rec?begin=20191113000000&end=20191114235959'
        var player = new EZUIKit.EZUIPlayer({
            id: 'myplayer1',
            url: url,
            autoplay: true,
            accessToken: "at.8o2k6dbpcvtr13reaa96hbnya6fee2wf-9gu6zcjmh2-1j4yrsb-imvlc5poc",
            decoderPath: '',
            width: 600,
            height: 400,
        });
        player.play();
        },5000)
        
    },
    methods:{
        getVideos(){
            this.$axios.post('/t_dz_video/selectVideoInfoById',{
                projectId:this.projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.videoList=res.data
                console.log(res)
            })
        }
    }
    
}
</script>
