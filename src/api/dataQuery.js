import request from '@/utils/request'
const baseUrl = 'http://localhost:8000'

export const dataQueryInit = () => request.get(baseUrl + '/api/dataQuery/dataQueryInit')
export const searchQuesList = data => request.post(baseUrl + '/api/dataQuery/searchQuesList', data)
