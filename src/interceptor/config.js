import { ElLoading } from 'element-plus'
import axios from 'axios';


// 请求 拦截器
axios.interceptors.request.use(config => {
    ElLoading.service({ fullscreen: true })
    return config
})


// 响应拦截器
axios.interceptors.response.use(response => {
    console.log('response',response)
    ElLoading.service({ fullscreen: true }).close()
    return response
})

// 路由拦截器