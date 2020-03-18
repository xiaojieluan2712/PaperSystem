import { dataQueryInit, searchQuesList } from '@/api/dataQuery'

const dataQuery = {
  state: {
    subjectsList: [],
    quesTypes: [],
    questionerList: [],
    quesArray: []
  },
  mutations: {
    SET_SUBJECTS: (state, subjectsList) => {
      state.subjectsList = subjectsList
    },
    SET_QUESTYPES: (state, quesTypes) => {
      state.quesTypes = quesTypes
    },
    SET_QUESTIONERLIST: (state, questionerList) => {
      state.questionerList = questionerList
    },
    SET_QUESARRAY: (state, quesArray) => {
      state.quesArray = quesArray
    }
  },
  actions: {
    // 试题：获取科目列表，题型列表和出题人姓名列表
    // 试卷：获取科目列表，出卷人姓名列表，试卷名称列表
    dataQueryInit({ commit }) {
      return new Promise((resolve, reject) => {
        dataQueryInit().then(response => {
          const subjectsList = response.data.data.subjectsList
          const quesTypes = response.data.data.quesTypes
          const questionerList = response.data.data.questionerList
          commit('SET_SUBJECTS', subjectsList)
          commit('SET_QUESTYPES', quesTypes)
          commit('SET_QUESTIONERLIST', questionerList)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    searchQuesList({ commit }, data) {
      return new Promise((resolve, reject) => {
        searchQuesList(data).then(response => {
          const quesArray = response.data.data
          commit('SET_QUESARRAY', quesArray)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    }
  }

}
export default dataQuery
