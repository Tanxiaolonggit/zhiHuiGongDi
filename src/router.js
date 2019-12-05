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
      name: "login",
      component: resolve => require(['./views/pages/login/login.vue'], resolve)
    },
    // 通知公告页
    {
      path: "/noticeSearch",
      name: "notice",
      component: resolve => require(['./views/pages/noticeSearch/noticeSearch.vue'], resolve)
    },
    // 下载专区页
    // {
    //   path: "/loadDistrict",
    //   name: "loadDistrict",
    //   component: resolve => require(['./views/pages/loadDistrict/loadDistrict.vue'], resolve)
    // },
    //项目主页
    {
      path: "/webContent",
      name: "webContent",
      redirect:'/webContent/project',
      component: resolve => require(['./views/pages/webContent/webContent.vue'], resolve),
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
          component: resolve => require(['./views/pages/projects/projectsDetail.vue'], resolve)
        },
        // 地图
        {
          path: "/webContent/maps",
          name: "maps",
          component: resolve => require(['./views/navBar/maps.vue'], resolve)
        },
        // 管理中心
        {
          path: "/webContent/application",
          name: "application",
          redirect:'/webContent/application/projectInfo',
          component: resolve => require(['./views/navBar/application.vue'], resolve),
          children:[
            // 项目档案
            {
              path: "/webContent/application/projectInfo",
              name:'projectInfo',
              component: resolve => require(['./components/application/pages/projectInfo'], resolve)
            },
            // 企业档案
            {             
              path: "/webContent/application/companyInfo",
              name:'companyInfo',
              component: resolve => require(['./components/application/pages/companyInfo'], resolve)
            },
            // 供应商档案
            {             
              path: "/webContent/application/supplier",
              name:'supplier',
              component: resolve => require(['./components/application/pages/supplier'], resolve)
            },
            // 混凝土
            {
              path: "/webContent/application/concrete",
              name:'concrete',
              component: resolve => require(['./components/application/pages/concrete'], resolve)
            },
            // 检验检测
            {
              path: "/webContent/application/inspection",
              name:'inspection',
              component: resolve => require(['./components/application/pages/inspection'], resolve)
            },
            // 起重设备equipment
            {
              path: "/webContent/application/equipment",
              name:'equipment',
              component: resolve => require(['./components/application/pages/equipment'], resolve)
            },
            // 特种设备人员specialPersonnel
            {
              path: "/webContent/application/specialPersonnel",
              name:'specialPersonnel',
              component: resolve => require(['./components/application/pages/specialPersonnel'], resolve)
            }
          ]
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
