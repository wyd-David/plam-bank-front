import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    const { code, msg } = response.data
    if (code === 999) {
      ElMessage({
        message: '未登录',
        type: 'warning',
        plain: true
      })
      router.push({
        path: '/login'
      })
    } else if (code !== 0) {
      ElMessage({
        message: msg,
        type: 'error',
        plain: true
      })
    }

    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
