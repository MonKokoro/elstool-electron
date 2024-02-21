/** 目前工具箱全部使用mock数据，拦截器其实用处不大... */

import axios from 'axios'
import { app } from 'electron'
// import store from "../store";

const isPackaged = app.isPackaged;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.baseURL = baseURLMap[BUILD_ENV]
axios.defaults.baseURL = "http://127.0.0.1:8000"
axios.defaults.timeout = 30000;

if(localStorage.getItem('token'))
    axios.defaults.headers['token'] = localStorage.getItem('token') || '';

const service = axios.create()

service.interceptors.request.use(
    config => {
        if(localStorage.getItem('token')){
            config.headers["token"] = localStorage.getItem('token')
        }
        return config
    },
    error => {
        if(error.message.includes('timeout')){
            // message.error("请求超时")
        }

        if(!isPackaged){
            console.warn(error)
        }

        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        /** 这里就请根据业务需求修改惹~ */
        switch(res.code){
            case 401:{
                // message.error("登录失效，请重新登录")
                sessionStorage.clear()
                window.open(`/login`, "_self")
            }
        }
        return res
    },
    error => {
        if (error.message.includes('timeout')) {
			// message.error("请求超时")
			return Promise.reject(error)
		}
        // message.error(error.message)
        return Promise.reject(error)
    }
)

function get({ url, data, config = {} }){
    return service({
        url,
        method: "GET",
        params: data || {},
        ...config
    });
}

function post({ url, data, config = {} }){
    return service({
        url,
        method: "POST",
        data: data || {},
        ...config
    });
}

function request({ url, method = "POST", data, config = {} }){
    const serviceData = method === "POST" ? { data: data || {} } : { param: data || {} }
    return service({
        url,
        method,
        ...serviceData,
        ...config
    });
}

export default { request, get, post, service }