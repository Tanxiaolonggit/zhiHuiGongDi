import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect:'/project'
    },
    // 项目主页
    {
      path: "/project",
      name: "project",
      component: resolve => require(['./views/navBar/project.vue'], resolve),
    },
    // 项目详情
    {
      path: "/project/projectsDetail/:projectId",
      name: "projectsDtail",
      component: resolve => require(['./views/projects/projectsDetail.vue'], resolve)
    },
    {
      path: "/scene",
      name: "scene",
      component: resolve => require(['./views/navBar/scene.vue'], resolve)
    },
    {
      path: "/maps",
      name: "maps",
      component: resolve => require(['./views/navBar/maps.vue'], resolve)
    },
    {
      path: "/application",
      name: "application",
      component: resolve => require(['./views/navBar/application.vue'], resolve)
    },
    {
      path: "/userData",
      name: "userData",
      component: resolve => require(['./views/navBar/userData.vue'], resolve)
    }
  ]
});
