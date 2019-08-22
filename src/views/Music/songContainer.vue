/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 16:58:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-22 21:37:29
 * @Description:  歌单列表组件
 */


<template>
    <div class="songContainer">
        <div class="list-Container">
            <div class="list-Container-Title">
                <span class="song">歌曲</span>
                <span class="singer">歌手</span>
                <span class="times">时长</span>
            </div>
            <div class="list">
                <scorll
                    ref="listcontainerwrapper"
                    class="listcontainerwrapper"
                    :data="playlist"
                >
                    <div class="contentWrapper">
                        <div class="playlist" v-for="(play, index) in playlist" :key="index" @click="Musicplay(play, index)">
                            <div class="play-item" :class="{ isActive: musicID == play.id }">
                                <span class="play-index text-overflow">
                                    <img v-if="musicID == play.id && plays" :src="playIcon" alt="" />
                                    <span v-else>{{ index + 1 }}</span>
                                </span>
                                <span class="play-name text-overflow">{{ play.name }}</span>
                                <span class="play-singer text-overflow">{{ play.singer }}</span>
                                <span class="play-duration text-overflow">{{ play.times }}</span>
                            </div>
                        </div>
                    </div>
                </scorll>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import scorll from '@cop/common/scorll';
const playIcon = require('@/assets/icon/play.gif')
export default {
    data() {
        return {
            playIcon
        }
    },
    components: {
        scorll
    },
    computed: {
        ...mapState({
            playlist: state => state.music.playlist,
            plays: state => state.music.play,
            musicID: state => state.music.musicID
        })
    },
    created() {
        this.Asplaylist()
    },
    methods: {
        //歌单列表
        async Asplaylist() {
            try {
                await this.$store.dispatch('music/Asplaylist')
            } catch (error) {}
        },
        //选择某个歌曲播放
        Musicplay(play, index) {
            this.$store.commit('music/setmusicOps', play)
            this.$store.commit('music/setmusicID', play.id)
            this.$store.commit('music/setplayOpenlist', this.playlist)
            this.$store.commit('music/setdurationTime', play.duration / 1000)
            this.$store.commit('music/setplayIndex', index)
            this.$store.commit('music/setcurrentTime', 0)
            this.vm.$emit('play')
        }
    },
}
</script>

<style lang="less" scoped>
.songContainer {
    flex: 1;
    overflow: hidden;
    position: relative;
}
.list-Container {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .list-Container-Title {
        height: 50px;
        display: flex;
        flex-direction: row;
        font-size: 14px;
        color: #e0e0e0;
        line-height: 50px;
        border-bottom: 1px solid hsla(0,0%,100%,.1);
        .singer {
            width: 220px;
            display: block;
            @media (max-width: 600px) {
                width: 80px;
            }
        }
        .times {
            width: 60px;
            display: block;
            @media (max-width: 678px) {
                display: none;
            }
        }
        .song {
            flex: 1;
            display: block;
        }
    }
    .list {
        flex: 1;
        overflow: hidden;
    }
    .listcontainerwrapper {
        height: 100%;
        .isActive {
            color: #C62F2F;
        }
    }
}

.play-item {
    display: flex;
    flex-direction: row;
    position: relative;
    font-size: 14px;
    color: rgba(224, 224, 224, .76);
    line-height: 50px;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
    cursor: pointer;
    @media (min-width: 678px) {
        &:hover {
            color: #ffffff;
        }
    }
    .text-overflow{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .play-index {
        width: 40px;
    }
    .play-duration {
        width: 60px;
        @media (max-width: 678px) {
            display: none;
        }
    }
    .play-singer {
        width: 220px;
        @media (max-width: 600px) {
            width: 80px;
        }
    }
    .play-name {
        flex: 1;
        position: relative;
    }
}
</style>




