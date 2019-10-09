<template>
    <div id="webContent">
        <layout></layout>
        <router-view></router-view>
    </div>
</template>
<script>
import layout from '../layout'
export default {
    components:{
        layout
    },
}
</script>
<style lang="less" scoped>
    #webContent{
        height: 100%;
    }
</style>