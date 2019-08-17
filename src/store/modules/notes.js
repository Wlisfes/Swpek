/*
 * @Author: 情雨随风
 * @Date: 2019-08-05 21:43:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-05 22:31:37
 * @Description: Netes界面store
 */

import { openBook,openTags,openTagsBook } from '@api'

const state = {
    //标签列表
    sider: [],
    //默认标签
    checkSider: {},


    //笔记列表
    Notes: [],
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
    setNotes: (state, Notes) => {
        state.Notes = Notes
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
    //项目列表
    AsNotes: ({ commit }, time = 300) => {
        return new Promise((resolve, reject) => {
            commit('setload', true)
            setTimeout(async () => {
                try {
                    let res = await openBook()
                    if(res.code === 200) {
                        commit('setNotes', res.data)
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
    //根据id查看笔记
    AsNotesID: ({ commit, state }, time = 300) => {
        return new Promise((resolve, reject) => {
            commit('setload', true)
            setTimeout(async () => {
                try {
                    let res = await openTagsBook({
                        id: state.checkSider.id
                    })
                    if(res.code === 200) {
                        commit('setNotes', res.data)
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