import request from '@/utils/request'
// const baseUrl = 'http://localhost:8000'
const baseUrl = 'http://localhost:8000'

export const loginByUsername = data => request.post(baseUrl + '/api/login', data)
export const getUserInfo = () => request.get(baseUrl + '/api/user')

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

