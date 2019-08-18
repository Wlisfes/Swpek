/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 17:44:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-18 23:09:39
 * @Description:  音乐组件store
 */


import {
    MusicPersonalized,
    MusicPlaylistDetail,
    MusicLogin
} from '@api';
import { times } from '@/lib';
import { Loading,Message } from 'element-ui';

const state = {
    load: false,
    //audio
    Audio: null,
    //歌单列表
    playlist: [],
    //播放状态
    play: false,
    //歌单id
    playlistID: 648468371,
    //歌曲id
    musicID: '',
    //当前播放歌曲信息
    musicOps: {},
    //播放列表
    playOpenlist: [],
    //播放列表下标
    playIndex: -1,
    //播放进度
    currentTime: 0,
    //总时长
    durationTime: 0,
    //进度条是否聚焦
    press: false,




    //推荐歌单列表
    personaLized: []
}


const mutations = {
    setload: (state, load) => {
        state.load = load
    },
    setAudio: (state, Audio) => {
        state.Audio = Audio
    },
    setplay: (state, play) => {
        state.play = play
    },
    setplaylist: (state, playlist) => {
        state.playlist = playlist
    },
    setplayIndex: (state, playIndex) => {
        state.playIndex = playIndex
    },
    setmusicID: (state, musicID) => {
        state.musicID = musicID
    },
    setplaylistID: (state, playlistID) => {
        state.playlistID = playlistID
    },
    setplayOpenlist: (state, playOpenlist) => {
        state.playOpenlist = playOpenlist
    },
    setcurrentTime: (state, currentTime) => {
        state.currentTime = currentTime
    },
    setdurationTime: (state, durationTime) => {
        state.durationTime = durationTime
    },
    setpress: (state, press) => {
        state.press = press
    },
    setmusicOps: (state, musicOps) => {
        state.musicOps = musicOps
    },
    prev: (state) => {
        let { playIndex,playOpenlist } = state
        if(playIndex == 0) {
            state.playIndex = playOpenlist.length -1
        }
        else {
            state.playIndex--
        }
        state.musicID = playOpenlist[state.playIndex].id
        state.musicOps = playOpenlist[state.playIndex]
        state.durationTime = playOpenlist[state.playIndex].duration / 1000
    },
    next: (state) => {
        let { playIndex,playOpenlist } = state
        if(playIndex == playOpenlist.length - 1) {
            state.playIndex = 0
        }
        else {
            state.playIndex++
        }
        state.musicID = playOpenlist[state.playIndex].id
        state.musicOps = playOpenlist[state.playIndex]
        state.durationTime = playOpenlist[state.playIndex].duration / 1000
    },



    setpersonaLized: (state, personaLized) => {
        state.personaLized = personaLized
    }
}


const actions = {
    //歌单详情
    Asplaylist: ({ commit, state }, time = 300) => {
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                spinner: 'el-icon-loading load-icon',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(async () => {
                try {
                    let res = await MusicPlaylistDetail({
                        id: state.playlistID
                    })
                    if(res.code === 200) {
                        let tracks = res.playlist.tracks
                        let list = tracks.map(k => {
                            const singer = k.ar.map(x => x.name).join('/')
                            const duration = times(k.dt)
                            return {
                                id: k.id,
                                name: k.name,
                                alia: k.alia.length > 0 ? k.alia[0] : '',
                                singer,
                                album: k.al.name,
                                picUrl: k.al.picUrl,
                                duration: k.dt,
                                times: duration
                            }
                        })
                        commit('setplaylist', list)
                    }
                } catch (error) {
                    reject(error)
                }
                loading.close()
            }, time)
        })
    },
    //推荐歌单
    Aspersonalized: ({ commit }, time = 300) => {
        return new Promise((resolve, reject) => {
            const loading = Loading.service({
                lock: true,
                spinner: 'el-icon-loading load-icon',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(async () => {
                try {
                    let res = await MusicPersonalized()
                    
                    if(res.code === 200) {
                        commit('setpersonaLized', res.result.filter((k, i) => i > 0))
                    }
                } catch (error) {
                    reject(error)
                }
                loading.close()
            }, time)
        })
    },
    //登录
    AsLogin: ({ commit }, { phone, password, time = 300 }) => {
        return new Promise((resolve, reject) => {
            commit('setload', true)
            setTimeout(async () => {
                try {
                    let res = await MusicLogin({
                        phone, password
                    })

                    console.log(res)

                    if(res.code === 200) {
                        
                    }
                    else {
                        Message({
                            showClose: true,
                            message: '账号或密码错误！',
                            duration: 1500,
                            type: 'error'
                        });
                    }
                    resolve(res)
                } catch (error) {
                    Message({
                        showClose: true,
                        message: '账号或密码错误！',
                        duration: 1500,
                        type: 'error'
                    });
                    reject(error)
                }
                commit('setload', false)
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