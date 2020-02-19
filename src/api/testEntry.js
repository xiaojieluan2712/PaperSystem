import request from '@/utils/request'
const baseUrl = 'http://localhost:8000'

export const initial = () => request.get(baseUrl + '/api/testEntry/initial')
export const createQuesObj = data => request.post(baseUrl + '/api/testEntry/createQuesObj', data)
export const getQuesDetails = data => request.post(baseUrl + '/api/testEntry/getQuesDetails', data)
export const editQues = data => request.post(baseUrl + '/api/testEntry/editQues', data)
export const deleteQues = data => request.post(baseUrl + '/api/testEntry/deleteQues', data)
