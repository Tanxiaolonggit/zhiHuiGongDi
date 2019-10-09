<template>
    <div class="login">
        <div class="login_input">
            <a-input placeholder="请输入账号" v-model="userName" >
            <a-icon slot="prefix" type="user" />
            </a-input>
            <a-input type="password" placeholder="请输入密码" v-model="userPsw">
            <a-icon type="key" slot="prefix"/>
            </a-input>
            <a-button type="primary" @click='login'>Primary</a-button>
        </div>
    </div>
</template>
<script>
import {throttle,timestampToTime} from '../../utils/util_one'
export default {
    name:'login',
    data(){
      return{
        userName:'',
        userPsw:''
      }
    },
    methods:{
        // 登陆
        login:throttle(function(){
            if(this.userName==''){
                this.$message.warning({
                    'content':'请输入用户名',
                });
            }else if(this.userPsw==''){
                this.$message.warning('请输入密码');
            }else{
                let data=
                this.$axios.post('/t_dz_user/userLogin',{
                    userName:this.userName,
                    userPsw:this.userPsw,
                    loginTime:timestampToTime()
                }).then((res)=>{
                    console.log(res)
                })
            }
        },1000)
    }
}
</script>
<style lang="less" scoped>
    // 登录页
    .login{
        .login_input{
            width: 15%;
        }
    }
</style>