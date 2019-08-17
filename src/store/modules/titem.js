/*
 * @Author: 情雨随风
 * @Date: 2019-08-04 22:46:41
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 23:48:22
 * @Description: Titem组件store
 */


import { openTaske } from '@api'


const state = {
    //项目列表
    Titem: [],
    //load
    load: false
}


const mutations = {
    setTitem: (state, Titem) => {
        state.Titem = Titem
    },
    setload: (state, load) => {
        state.load = load
    }
}


const actions = {
    //项目列表
    AsTitem: ({ commit }, time = 300) => {
        return new Promise((resolve, reject) => {
            commit('setload', true)
            setTimeout(async () => {
                try {
                    let res = await openTaske()
                    if(res.code === 200) {
                        commit('setTitem', res.data)
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