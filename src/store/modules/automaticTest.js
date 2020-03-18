import { autoInitial, autoCreate } from '@/api/automaticTest'

const automaticTest = {
  state: {
    autoSubjectsList: [],
    autoPaperObj: {} // 自动组卷组成的试卷obj
  },
  mutations: {
    SET_AUTOSUBJECTSLIST: (state, autoSubjectsList) => {
      state.autoSubjectsList = autoSubjectsList
    },
    SET_AUTOPAPEROBJ: (state, autoPaperObj) => {
      state.autoPaperObj = autoPaperObj
    }
  },
  actions: {
    autoInitial({ commit }) {
      return new Promise((resolve, reject) => {
        autoInitial().then(response => {
          const data = response.data.data
          commit('SET_AUTOSUBJECTSLIST', data)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    autoCreate({ commit }, data) {
      return new Promise((resolve, reject) => {
        autoCreate(data).then(response => {
          const obj = response.data.data
          commit('SET_AUTOPAPEROBJ', obj)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    }
  }
}

export default automaticTest
