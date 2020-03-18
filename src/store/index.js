import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import testEntry from './modules/testEntry'
import dataQuery from './modules/dataQuery'
import automaticTest from './modules/automaticTest'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    testEntry,
    dataQuery,
    automaticTest
  },
  getters
})

export default store
