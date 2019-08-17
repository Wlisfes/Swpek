/*
 * @Author: 情雨随风
 * @Date: 2019-08-03 15:31:18
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-05 22:31:05
 * @Description: 归档界面store
 */


import { openTags,openArticle,openTagsArticle } from '@api'

const state = {
    //标签列表
    sider: [],
    //默认标签
    checkSider: {},

    //归档文章列表
    article: [],
    //load
    load: false
}


const mutations = {
    setsider: (state, sider) => {
        state.sider = sider
    },
    setcheckSider: (state, checkSider) => {
        state.checkSider = checkSider
    },
    setarticle: (state, article) => {
        state.article = article
    },
    setload: (state, load) => {
        state.load = load
    }
}


const actions = {
    //标签列表
    Assider: async ({ commit }) => {
        try {
            let res = await openTags()
            if(res.code === 200) {
                commit('setsider', res.data)
            }
            return res
        } catch (error) {
            return error
        }
    },
    //归档文章列表
    Asarticle: ({ commit }, time = 300) => {
        return new Promise((resolve, reject) => {
            commit('setload', true)
            setTimeout(async () => {
                try {
                    let res = await openArticle()
                    if(res.code === 200) {
                        commit('setarticle', res.data)
                    }
                    commit('setload', false)
                    resolve(res)
                } catch (error) {
                    commit('setload', false)
                    reject(error)
                }
            }, time)
        })
    },
    //根据标签id查看归档文档
    AsarticleID: ({ commit, state }, time = 300) => {
        return new Promise((resolve, reject) => {
            commit('setload', true)
            setTimeout(async () => {
                try {
                    let res = await openTagsArticle({
                        id: state.checkSider.id
                    })
                    if(res.code === 200) {
                        commit('setarticle', res.data)
                    }
                    commit('setload', false)
                    resolve(res)
                } catch (error) {
                    commit('setload', false)
                    reject(error)
                }
            }, time)
        }) 
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}