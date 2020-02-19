// 将接口引入
import { initial, createQuesObj, getQuesDetails, editQues, deleteQues } from '@/api/testEntry'

const testEntry = {
  state: {
    // some state
    subjectsList: [],
    quesTypes: [],
    quesArray: [],
    quesObj: {}
    // quesId: ''
  },
  mutations: {
    // some mutations
    SET_SUBJECTS: (state, subjectsList) => {
      state.subjectsList = subjectsList
    },
    SET_QUESTYPES: (state, quesTypes) => {
      state.quesTypes = quesTypes
    },
    SET_QUESARRAY: (state, quesArray) => {
      state.quesArray = quesArray
    },
    SET_QUESOBJ: (state, quesObj) => {
      state.quesObj = quesObj
    }
    // SET_QUESID: (state, quesId) => {
    //   state.quesId = quesId
    // }
  },
  actions: {
    // some actions
    initial({ commit, state }) {
      return new Promise((resolve, reject) => {
        initial().then(response => {
          const data = response.data.data
          // console.log(data.quesTypes)
          commit('SET_SUBJECTS', data.subjectsList)
          commit('SET_QUESTYPES', data.quesTypes)
          commit('SET_QUESARRAY', data.quesArray)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    createQuesObj({ commit }, quesObj) {
      // console.log('查看有没有正确传送数据')
      console.log(quesObj)
      return new Promise((resolve, reject) => {
        createQuesObj(quesObj).then(response => {
          console.log(response)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    getQuesDetails({ commit }, quesIdObj) {
      return new Promise((resolve, reject) => {
        getQuesDetails(quesIdObj).then(response => {
          console.log(response)
          const quesObj = response.data.data[0]
          // const quesId = quesObj.quesId
          commit('SET_QUESOBJ', quesObj)
          // commit('SET_QUESID', quesId)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    editQues({ commit }, quesObj) {
      console.log('editQues actions-------------------')
      console.log(quesObj)
      return new Promise((resolve, reject) => {
        editQues(quesObj).then(response => {
          console.log(response)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    deleteQues({ commit }, quesId) {
      return new Promise((resolve, reject) => {
        deleteQues(quesId).then(response => {
          console.log(response.data.resMsg)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    }
  }
}

export default testEntry
