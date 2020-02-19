const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  userInfo: state => state.user.userInfo,
  subjectsList: state => state.testEntry.subjectsList,
  quesTypes: state => state.testEntry.quesTypes,
  quesArray: state => state.testEntry.quesArray,
  quesObj: state => state.testEntry.quesObj
}
export default getters
