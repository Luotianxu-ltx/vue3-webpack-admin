import axios from 'axios'
import { ElMessage } from 'element-plus'

const requests = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000
})
requests.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
requests.defaults.headers.post['Content-Type'] = 'text/html; charset=utf-8'
// 请求拦截器
requests.interceptors.request.use((config) => {
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        ElMessage.error(error)
        return Promise.reject(new Error('请求错误！'))
    }
)

export const createAPI = (url: string, method: string, data: unknown) => {
    const config:any = {}
    if (method.toUpperCase() === 'GET') {
        config.params = data
    } else {
        config.data = data
    }
    return requests({
        url,
        method,
        ...config
    })
}
