<template>
    <div class='projects'>
        <a-layout style="height: 100%;background:transparent;display:flex;">
            <a-layout-sider class="layOut_left" width="257" style="background: #fff;flex:1;">
                <a-menu
                    style="width: 256px;background:transparent;border:none;color:#fff;"
                    :defaultSelectedKeys="[0]"
                    mode="inline"
                >
                    <a-menu-item :key="index" v-for='(item,index) in data' >
                        <span>{{item.name}}</span>
                    </a-menu-item> 
                </a-menu>
            </a-layout-sider>
            <div>123123123</div>
        </a-layout>
    </div>
</template>
<script>
export default {
    name:'project',
    data(){
        return{
            data:[
                {
                    name:'基础信息'
                },
                {
                    name:'视频监控'
                },
                {
                    name:'实名制信息'
                },
                {
                    name:'考勤统计'
                },
                {
                    name:'农民工工资'
                },
                {
                    name:'环境监测'
                },
                {
                    name:'起重机械'
                },
                {
                    name:'危大工程'
                },
                {
                    name:'检验检测'
                },
            ] 
        }
    }
}
</script>
<style lang="less" scoped>
    .projects{
        height: 92%;
        // padding: 10px;
        // box-sizing: border-box;
        .layOut_left{
            height: 100%;
            overflow-y: auto;
            // background: rgba(0, 0, 0, 0.5)!important;
            background: transparent!important;
            // overflow-x: visible;
            .ant-menu-item-selected{//选中背景颜色
                background: rgba(0, 0, 0, 0.6);
                color: #ffffff;
            }
        }
    }
</style>
