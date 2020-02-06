import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    userInfo: {},
    userId: '',
    relName: '',
    username: '',
    token: '',
    password: '',
    sex: '',
    phone: '',
    mail: '',
    departmentName: '',
    profession: '',
    duty: '',
    remark: '',
    area: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_RELNAME: (state, relName) => {
      state.relName = relName
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        const data = {
          username: username,
          password: password
        }
        loginByUsername(data).then(response => {
          const data = response.data
          const roles = []
          roles.push(data.data.role)
          console.log(roles)
          if (data.resCode === 1) { // 账号密码正确，设置token
            commit('SET_TOKEN', data.data.token)
            // commit('SET_ROLES', roles)
            setToken(response.data.data.token) // 将token存进cookie中
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          // console.log('getUserInfo接口返回数据')
          // console.log(response)
          // if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
          //   reject('error')
          // }
          const user = response.data[0]
          const roles = []
          roles.push(user.role)
          commit('SET_ROLES', roles)
          commit('SET_NAME', user.username)
          commit('SET_USERINFO', user)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
