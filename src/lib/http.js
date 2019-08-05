/*
 * @Author: 情雨随风
 * @Date: 2019-07-30 22:15:11
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-07-31 22:04:48
 * @Description: axios
 */


import axios from 'axios'


// 创建 axios 实例
const http = axios.create({
    timeout: 6000       //请求超时时间
})

//请求拦截器
http.interceptors.request.use((config) => {
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

//响应拦截器
http.interceptors.response.use(
    res => res.data,
    err => err
)


class Axios {
    get({ baseURL, url, params }) {
        return http({
            url,
            method: "get",
            params,
            baseURL,
            headers: {
                "Content-Type": "application/json;charset=UTF-8;"
            }
        })
    }
    post({ baseURL, url, params }) {
        return http({
            url,
            method: "post",
            params,
            baseURL,
            headers: {
                "Content-Type": "application/json;charset=UTF-8;"
            }
        })
    }
}

export default new Axios();