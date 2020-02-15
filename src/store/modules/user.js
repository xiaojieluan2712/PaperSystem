import { loginByUsername, logout, getUserInfo, changeUserInfo, changeRemark } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    userInfo: {},
    userId: '',
    relName: '',
    username: '',
    token: getToken(),
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
    SET_REMARK: (state, remark) => {
      state.remark = remark
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
            setToken(response.data.data.token) // 将token存进cookie中
          } else if (data.resCode === 2) {
            alert('密码错误')
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
    // 用户修改个人信息
    changeUserInfo({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        changeUserInfo(userInfo).then(response => {
          console.log('请求发送成功')
          console.log(response)
          resolve()
        }).catch(error => {
          console.log('请求发送失败')
          reject(error)
        })
      })
    },
    // 修改备注信息
    changeRemark({ commit }, remark) {
      console.log('第二个remark' + remark)
      return new Promise((resolve, reject) => {
        const data = {
          remark: remark
        }
        changeRemark(data).then(response => {
          console.log('修改成功')
          commit('SET_REMARK', remark)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },

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
