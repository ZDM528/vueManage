import axios from 'axios'
import Vue from 'vue'
// import Cookies from 'js-cookie'

// 请求拦截器
// axios.interceptors.request.use(config=>{
//     config.headers.Authorization=Cookies.get("token")
//     return config
// })
axios.defaults.baseURL = 'http://localhost:8888'
Vue.prototype.$axios = axios


// post 请求
const Login=(url,params)=>{
    return axios.post(url,params)
}

const getSave=(url,params,header)=>{
    return axios.post(url,params,header)
}

const emitFood=(url,params,header)=>{
    return axios.post(url,params,header)
}

// get 请求
const getPersonInfo=(url,params)=>{
    return axios.get(url,params)
}

const payAttention=(url,params)=>{
    return axios.get(url,params)
}

const cancelAttention=(url,params)=>{
    return axios.get(url,params)
}

const getFoodList=(url,params)=>{
    return axios.get(url,params)
}

const getCarouselList=(url,params)=>{
    return axios.get(url,params)
}

const getAttention=(url,params)=>{
    return axios.get(url,params)
}

const getInfoData=(url,params)=>{
    return axios.get(url,params)
}


export {
    Login,
    getPersonInfo,
    payAttention,
    cancelAttention,
    getFoodList,
    getCarouselList,
    getAttention,
    getInfoData,
    getSave,
    emitFood
}