import request from '@/utils/request'
// const baseUrl = 'http://localhost:8000'
const baseUrl = 'http://localhost:8000'

export const loginByUsername = data => request.post(baseUrl + '/api/login', data)
export const getUserInfo = () => request.get(baseUrl + '/api/user')
export const changeUserInfo = data => request.post(baseUrl + '/api/changeUserInfo', data)
export const changeRemark = data => request.post(baseUrl + '/api/changeRemark', data)
export const logout = () => request.post(baseUrl + '/api/logout')
