<template>
    <div >视频监控
        <div v-if="videoList">
            <div v-for='(item,index) in videoList' :key='"viedo"+index'>
                <video width="400" height="300" controls :id="'myplayer'+index">
                    <source :src="item.videoLinkNow"/> 
                </video>
            </div>
        </div>
        <div id="myPlayer"></div>
        <!-- <div @click="huifang">回放</div> -->
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
            videoList:[{
                "videoLinkNow":"http://hls01open.ys7.com/openlive/3a06001f7c044181a8021c7e5d0c4e23.hd.m3u8"
            }],
            clearList:[],
            tokens:''
        }
    },
    mounted(){
        // this.getVideos();    
        var players = new EZUIKit.EZUIPlayer('myplayer0');
        this.clearList.push(players)
    },
    beforeDestroy(){
        this.clearList.forEach((item)=>{
            item.stop();
        })
    },
    methods:{
        getVideos(){
            this.$axios.post('/t_dz_video/selectVideoInfoById',{
                projectId:this.projectId,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                this.videoList=res.data
            })
        },
        huifang(){
            let player1 = new EZUIKit.EZUIPlayer({
                id: 'myPlayer',
                url: 'ezopen://open.ys7.com/D45944858/1.hd.live',
                autoplay: true,
                accessToken: "at.c0pv4jmdabdj3ye0au4akrd0573qlc7h-2kpxo9bvsj-0embox1-jgcqzxynx",
                decoderPath: '',
                width: 600,
                height: 400,
            });
            player1.play();
            // this.$axios.post('https://open.ys7.com/api/lapp/token/get',{
                
            //     appKey:'3ac88f460a2f4289baa08512032b2d98',
            //     appSecret:'7e4d684a4b41dfe7372c1c847b7a8c34'
            // }).then((reslut)=>{
            // })
        }
    }
    
}
</script>
