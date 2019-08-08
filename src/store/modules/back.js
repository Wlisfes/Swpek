/*
 * @Author: 情雨随风
 * @Date: 2019-08-03 00:09:46
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-08 19:41:53
 * @Description: 背景图组件store
 */

import { wallpaper,BINGHTTP } from '@api'

//缓存图片
const cache = (state) => {
    return new Promise((resolve, reject) => {
        const image = new Image()
        const { images,index } = state
        image.src = images[index].url
        image.onload = () => {
            resolve()
        }
    })
}


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
    prev: (state, check) => {
        state.check = check
    },
    //下一张
    next: (state, check) => {
        state.check = check
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
                url: `${BINGHTTP}/bing${k.url}`
            }))
            commit('setimages', images)
            commit('setcheck', images[0])
            return res
        } catch (error) {
            return error
        }
    },
    //上一张
    Asprev: async ({ commit, state }) => {
        const { images,index } = state
        if(index == 0) {
            state.index = images.length -1
            await cache(state)
            commit('prev', images[state.index])
        }
        else {
            state.index--
            await cache(state)
            commit('prev', images[state.index])
        }
    },
     //下一张
    Asnext: async ({ commit, state }) => {
        const { images,index } = state
        if(index == images.length -1) {
            state.index = 0
            commit('next', images[state.index])
        }
        else {
            state.index++
            cache(state)
            commit('next', images[state.index])
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}