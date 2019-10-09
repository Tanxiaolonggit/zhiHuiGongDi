<template>
    <div class="nav">
      <!-- logo -->
      <div class="logo">LOGO</div>
      <!-- 路由 -->
      <div class="router">
        <router-link class="routerLink" to='/webContent/project' >
          <a-icon type="pie-chart" />
          <p>项目</p>
        </router-link>
        <router-link class="routerLink" to='/webContent/scene' >
          <a-icon type="desktop" />
          <p>现场</p>
        </router-link>
        <router-link class="routerLink" to='/webContent/maps' >
          <a-icon type="global" />
          <p>地图</p>
        </router-link>
        <router-link class="routerLink" to='/webContent/application' >
          <a-icon type="appstore" />
          <p>应用</p>
        </router-link>
        <router-link class="routerLink" to='/webContent/userData' >
          <a-icon type="user" />
          <p>用户</p>
        </router-link>
      </div>
    </div>
</template>
<script>
export default {
    name:'layout',
    data(){
      return{
      }
    },
    created(){

    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
.nav{
  display: flex;
  background: #26abe2;
  height: 8%;
  justify-content: space-between;
  .logo{
      height: 100%;
      width: 200px;
      font-size: 60px;
      line-height: 80px;
      color: #fff;
  }
  .router{
    display: flex;
    height: 100%;
    width: 400px;
    .routerLink{
      color: #fff;
      height: 100%;
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      p{
        margin: 10px 0 0 0;
        text-decoration: none;
      }
      &:hover{
        background:rgba(0,0,0,0.3);
      }
    }
  }
}
// routerlink选中样式
.router-link-active{
    text-decoration: none;
    background:rgba(0,0,0,0.3);
}
</style>