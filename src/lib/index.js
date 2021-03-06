/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 21:49:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-21 23:29:07
 * @Description:  工具函数
 */


 /**
 * 歌曲时长格式化
 * @param {*} value 
 */
export const times = value => {
    var val = parseInt(value.toString().slice(0,3))
    if (Math.floor(val/60) >= 10) {
        return Math.floor(val/60)+":"+(val%60/100).toFixed(2).slice(-2)
    } else {
        return '0' + Math.floor(val/60)+":"+(val%60/100).toFixed(2).slice(-2)
    }
}

/**
 * 歌曲进度时间转换
 * @param {*} value 
 */
export const calc = value => {
    if (Math.floor(value/60) >= 10) {
        return Math.floor(value/60)+":"+(value%60/100).toFixed(2).slice(-2)
    } else {
        return '0' + Math.floor(value/60)+":"+(value%60/100).toFixed(2).slice(-2)
    }
}



/**
 * 数据获取
 * @param {*} param0 
 */
export async function getStore({ key }) {
    const Cookies = require('js-cookie')
    const data = Cookies.get(key)
    if (data) {
        return data
    }
    else {
        return false
    }
}


export async function setStore({ key,data }) {
    const Cookies = require('js-cookie')
    Cookies.set(key, JSON.stringify(data), { expires: 1 })
    return true
}


