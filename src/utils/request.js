import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url，请求的地址
  timeout: 5000 // request timeout，访问超时的时间限制
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['token'] = getToken()// 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// // respone interceptor
// service.interceptors.response.use(
//   response => response,
//   error => {
//     console.log('err' + error)// for debug
//     Message({ // 弹出错误信息
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   })
//
export default service
