<template>
    <div class="checkDays">
        <div @click="tab(1)" :class="check==1?'check':'nocheck'">近24小时</div>
        <div @click="tab(7)" :class="check==7?'check':'nocheck'">近7日</div>
        <div @click="tab(15)" :class="check==15?'check':'nocheck'">近15日</div>
        <div @click="tab(30)" :class="check==30?'check':'nocheck'">近30日</div>
    </div>
</template>
<script>
export default {
    name:'checkDays',
    props:{
        froms:String
    },
    data(){
        return{
            check:1
        }
    },
    methods:{
        tab(num){
            this.check=num
            this.$emit('getData',{froms:this.froms,days:num})
        }
    }
}
</script>
<style lang="less" scoped>
    .checkDays{
        width: 100%;
        height: 100%;
        div{
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            border-radius: 5px;
            padding: 0 5px;
            margin: 0 5px;
        }
    }
    .check{
        background: #1E90FF;
        color: #fff;
    }
    .nocheck{
        color: #1E90FF;
        background: #fff;
    }
</style>