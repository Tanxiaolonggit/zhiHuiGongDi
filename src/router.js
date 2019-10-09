import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect:'/login'
    },
    // 登陆页
    {
      path: "/login",
      name: "userData",
      component: resolve => require(['./views/login/login.vue'], resolve)
    },
    //项目主页
    {
      path: "/webContent",
      name: "webContent",
      redirect:'/webContent/project',
      component: resolve => require(['./views/webContent/webContent.vue'], resolve),
      children:[
        // 项目列表
        {
          path:'/webContent/project',
          name:"projects",
          component:resolve => require(['./views/navBar/project.vue'], resolve),
        },
        // 项目详情
        {
          path: "/webContent/project/projectsDetail/:projectId",
          name: "projectsDtail",
          component: resolve => require(['./views/projects/projectsDetail.vue'], resolve)
        },
        {
          path: "/webContent/scene",
          name: "scene",
          component: resolve => require(['./views/navBar/scene.vue'], resolve)
        },
        {
          path: "/webContent/maps",
          name: "maps",
          component: resolve => require(['./views/navBar/maps.vue'], resolve)
        },
        {
          path: "/webContent/application",
          name: "application",
          component: resolve => require(['./views/navBar/application.vue'], resolve)
        },
        {
          path: "/webContent/userData",
          name: "userData",
          component: resolve => require(['./views/navBar/userData.vue'], resolve)
        }
      ]
    },
  ]
});
