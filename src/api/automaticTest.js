import request from '@/utils/request'
const baseUrl = 'http://localhost:8000'

export const autoCreate = data => request.post(baseUrl + '/api/automaticTest/autoCreate', data)
export const autoInitial = () => request.get(baseUrl + '/api/automaticTest/autoInitial')
