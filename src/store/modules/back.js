/*
 * @Author: 情雨随风
 * @Date: 2019-08-03 00:09:46
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 22:55:08
 * @Description: 背景图组件store
 */

import { wallpaper } from '@api'


const state = {
    //背景图列表
    images: [],
    //当前显示图片
    check: {},
    //当前图片下标
    index: 0
}


const mutations = {
    setimages: (state, images) => {
        state.images = images
    },
    setcheck: (state, check) => {
        state.check = check
    },
    setindex: (state, index) => {
        state.index = index
    },
    //上一张
    prev: (state) => {
        const { images,index } = state
        if(index == 0) {
            state.index = images.length -1
            state.check = images[state.index]
        }
        else {
            state.index--
            state.check = images[state.index]
        }
    },
    //下一张
    next: (state) => {
        const { images,index } = state
        if(index == images.length -1) {
            state.index = 0
            state.check = images[state.index]
        }
        else {
            state.index++
            state.check = images[state.index]
        }
    }
}


const actions = {
    //bing壁纸列表
    wallpaper: async ({ commit }) => {
        try {
            const res = await wallpaper({
                format: 'js',
                idx: -1,
                n: 8,
                mkt: 'zh-CN'
            })
            const images = res.images.map(k => ({
                name: k.copyright,
                url: `http://www.bing.com${k.url}`
            }))
            commit('setimages', images)
            commit('setcheck', images[0])
            return res
        } catch (error) {
            return error
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}