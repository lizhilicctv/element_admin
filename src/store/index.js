import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  token:null,
	  // 菜单列表
	  menus:  [
				{
				id: 4,
				menuName: "管理员管理",
				link: "/admin",
				icon: "el-icon-s-custom",
				children:[
					{
						id: 4,
						menuName: "角色管理",
						link: "/admin/role",
					},
					{
						id: 4,
						menuName: "权限管理",
						link: "/admin/rule",
					},
					{
						id: 4,
						menuName: "管理员列表",
						link: "/admin/list",
					},
					]
				},
				{
				id: 4,
				menuName: "系统管理",
				link: "/system",
				icon: "el-icon-s-tools",
				children:[
					{
						id: 4,
						menuName: "设置管理",
						link: "/system/role",
					},
					{
						id: 4,
						menuName: "系统设置",
						link: "/system/rule",
					},
					{
						id: 4,
						menuName: "屏蔽词",
						link: "/system/list",
					},
					]
				},
				{
				id: 4,
				menuName: "栏目管理",
				link: "/cate",
				icon: "el-icon-s-unfold",
				children:[
					{
						id: 4,
						menuName: "栏目管理",
						link: "/cate/list",
					},
					]
				},
				{
				id: 4,
				menuName: "资讯管理",
				link: "/arc",
				icon: "el-icon-document",
				children:[
					{
						id: 4,
						menuName: "资讯管理",
						link: "/arc/list",
					},
					]
				},
				{
				id: 4,
				menuName: "友情链接",
				link: "/link",
				icon: "el-icon-link",
				children:[
					{
						id: 4,
						menuName: "链接管理",
						link: "/link/list",
					},
					]
				},
				{
				id: 4,
				menuName: "图片管理",
				link: "/img",
				icon: "el-icon-picture",
				children:[
					{
						id: 4,
						menuName: "广告管理",
						link: "/img/ad",
					},
					{
						id: 4,
						menuName: "幻灯片",
						link: "/img/slide",
					},
					]
				},
				{
				id: 4,
				menuName: "留言管理",
				link: "/message",
				icon: "el-icon-message",
				children:[
					{
						id: 4,
						menuName: "留言管理",
						link: "/message/list",
					},
					]
				},
		  ],
	  // 权限点列表
	  loading: true,
  },
  mutations: {
	setToken(state, newToken) {
		sessionStorage.setItem("token", newToken);
		state.token = newToken;
	},
	setMenus(state, menus) {
	  state.menus = menus;
	},
	setMenuTree(state, menuTree) {
	  state.menuTree = menuTree;
	},

  },
  actions: {
    signOut(context) {
      sessionStorage.removeItem("token");
      context.commit("setToken", null);
      context.commit("setMenus", []);
    }
  },
  modules: {
  }
})
