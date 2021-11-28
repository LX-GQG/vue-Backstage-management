import axios from 'axios'
import store from '@/store'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API // api的base_url
})

// request 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.getToken) {
      config.headers['token'] = window.sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response响应拦截
axios.interceptors.response.use(response => {
  let res = response.data
  console.log(res)
  if (res.code === 200) {
    return response
  } else {
    return Promise.reject(response.data.msg)
  }
},
error => {
  console.log(error)
  if (error.response.data) {
    error.message = error.response.data.msg
  }
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
}
)

export default service
