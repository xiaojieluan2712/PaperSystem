import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) { // roles为['editor'],route为每一个路由对象，记住，roles是一个数组
  if (route.meta && route.meta.roles) {
    // console.log(roles)
    return true // roles.some(role => route.meta.roles.indexOf(role) >= 0) // roles中有一个满足条件就返回true
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) { // roles = ['editor']
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) { // 如果用户是admin，那么所有的路由都加上
          accessedRouters = asyncRouterMap
        } else {
          console.log('查看roles是否为数组')
          console.log(roles)
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles) // 如果为['editor']，则递归过滤出有editor的
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
