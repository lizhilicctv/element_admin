import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import store from "@/store";

const BasicLayout = () => import("@/views/layout/BasicLayout.vue");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BasicLayout,
	children: [
	  {
	    path: "/",
	    name: "Home",
	    component: () => import("@/views/Home.vue"),
	    meta: { menuName: "后台首页" }
	  }
	]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
      name: "admin", //路由名称
      path: "/admin", //路由路径
	  component: BasicLayout,
      children:[
        {
          name: "role",
          path: "role",
          component: () => import("@/views/admin/role.vue"),
		   meta: { menuName: "角色管理" }
        },
        {
          name: "rule",
          path: "rule",
          component: () => import("@/views/admin/rule.vue"),
		  meta: { menuName: "权限管理" }
        },
		{
		  name: "list",
		  path: "list",
		  component: () => import("@/views/admin/list.vue"),
		   meta: { menuName: "管理员列表" }
		},
		
      ]
    },
{
      name: "arc", //路由名称
      path: "/arc", //路由路径
	  component: BasicLayout,
      children:[
        {
          name: "list",
          path: "list",
          component: () => import("@/views/arc/list.vue"),
		   meta: { menuName: "资讯列表" }
        },
      ]
    },
]

const router = new VueRouter({
//  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守护
router.beforeEach((to, from, next) => {
	if(to.name!=='Login' && !store.state.token){
		//判断session
		if(sessionStorage.getItem("token")){
			store.commit("setToken", sessionStorage.getItem("token"));
		}else{
			next("/Login");
		}
	}
	next();
});




export default router
