<template>
    <div class="login">
        <div class="login_other">
            <router-link class="routerLink" to='/notice'>通知公告</router-link><router-link class="routerLink" to='/loadDistrict'>下载专区</router-link>
        </div>
        <div class="login_input">
            <div class="title">重庆市智慧工地综合信息管理平台</div>
            <div class="input">
                <a-input placeholder="请输入账号" v-model="userName" >
                    <a-icon slot="prefix" type="user" />
                </a-input>
                <a-input type="password" placeholder="请输入密码" v-model="userPsw">
                    <a-icon type="key" slot="prefix"/>
                </a-input>
                <a-button type="primary" @click='login'>登陆</a-button>
            </div> 
        </div>
        <div class="login_footer">技术支持：重庆大智汇物科技有限公司</div>
    </div>
</template>
<script>
import {throttle,timestampToTime} from '../../../utils/util_one'
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
        },1000),
    }
}
</script>
<style lang="less" scoped>
    // 登录页
    .login{
        height: 100%;
        position: relative;
        .login_other{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: right;
            box-sizing: border-box;
            padding-right:30px;
            .routerLink{
                // color: #fff;
            }
            .routerLink:nth-of-type(1){
                margin-right: 10px;         
            }
            .routerLink:hover{
                color:#1890ff;
            }
        }
        .login_input{
            position: absolute;
            top: 50%;
            left: 10%;
            transform: translateY(-50%);        
            .title{
                margin-bottom: 20px;
                font-size:20px;
            }
            .input{
                width: 80%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 auto;
            }
            .ant-input-affix-wrapper{
                margin-bottom: 10px;
            }
        }
        .login_footer{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;
        }
    }
</style>