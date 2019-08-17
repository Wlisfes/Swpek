/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 17:44:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-18 00:08:13
 * @Description:  音乐组件store
 */


import {
    MusicPersonalized,
    MusicPlaylistDetail,
    MusicSongurl
} from '@api';
import { times } from '@/lib';

const state = {
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
    //播放列表
    playOpenlist: [],
    //播放列表下标
    playIndex: -1,
}


const mutations = {
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
    setplayOpenlist: (state, playOpenlist) => {
        state.playOpenlist = playOpenlist
    }
}


const actions = {
    //歌单详情
    Asplaylist: ({ commit, state }, time = 300) => {
        return new Promise((resolve, reject) => {
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
            }, time)
        })
    },
    //推荐歌单
    Aspersonalized: ({ commit }, time = 300) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    let res = await MusicPersonalized()
                    console.log(res)
                } catch (error) {
                    reject(error)
                }
            }, time)
        })
    },
    //歌曲url
    AsMusicSongurl: async ({ commit, state }) =>  {
        try {
            let res = await MusicSongurl({ id: state.musicID })

            if(res.code === 200) {
                const { url } = res.data[0]
                state.Audio.src = url
                // state.Audio.play()
            }
        } catch (error) {
            console.log(error)
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