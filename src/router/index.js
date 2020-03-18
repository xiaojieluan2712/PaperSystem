import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1 子菜单只有在children的长度大于1 的时候显示
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb（noredirect表示该路由在面包屑中不可点击）
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  // 当设置true的时候该路由不会在侧边栏出现，默认为false
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirection: ''
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/accountSetting',
    component: Layout,
    redirect: '/accountSetting/index',
    meta: {
      title: 'accountSetting',
      icon: 'component',
      roles: ['admin', 'editor'] // or you can only set roles in sub nav
    },
    children: [{
      path: 'index',
      component: _import('accountSetting/index'),
      name: 'accountSetting',
      meta: {
        title: 'accountSetting',
        icon: 'component',
        roles: ['admin', 'editor'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/testEntry',
    component: Layout,
    redirect: '/testEntry/index',
    meta: {
      title: 'testEntry',
      icon: 'documentation',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'index',
      component: _import('testEntry/index'),
      name: 'testEntry',
      // hidden: true,
      meta: {
        title: 'testEntry',
        icon: 'documentation',
        roles: ['admin', 'editor']
      }
    }]
  },
  // {
  //   path: '/bankManagement',
  //   component: Layout,
  //   redirect: '/bankManagement/index',
  //   meta: {
  //     title: 'bankManagement',
  //     icon: 'dashboard',
  //     roles: ['admin', 'editor']
  //   },
  //   children: [{
  //     path: 'index',
  //     component: _import('bankManagement/index'),
  //     name: 'bankManagement',
  //     meta: {
  //       title: 'bankManagement',
  //       icon: 'dashboard',
  //       roles: ['admin', 'editor']
  //     }
  //   }]
  // },
  {
    path: '/dataQuery',
    component: Layout,
    redirect: '/dataQuery/index',
    meta: {
      title: 'dataQuery',
      icon: 'clipboard',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'index',
      component: _import('dataQuery/index'),
      name: 'dataQuery',
      meta: {
        title: 'dataQuery',
        icon: 'clipboard',
        roles: ['admin', 'editor']
      }
    }]
  },
  {
    path: '/testPaper',
    component: Layout,
    redirect: '/testPaper/automaticTest',
    meta: {
      title: 'testPaper',
      icon: 'component',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'automaticTest',
      component: _import('testPaper/automaticTest/index'),
      name: 'automaticTest',
      meta: {
        title: 'automaticTest',
        roles: ['admin', 'editor']
      }
    },
    {
      path: 'customizeTest',
      component: _import('testPaper/customizeTest/index'),
      name: 'customizeTest',
      meta: {
        title: 'customizeTest',
        roles: ['admin', 'editor']
      }
    }]
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('userManagement/index'),
      name: 'userManagement',
      meta: {
        title: 'userManagement',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
