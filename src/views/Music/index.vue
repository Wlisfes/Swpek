<!--
 * @Author: 情雨随风
 * @Date: 2019-08-02 22:57:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-02 22:57:18
 * @Description: 音乐界面
 -->


<template>
    <div class="Music" @touchmove.prevent>
        <div class="container" @touchmove.prevent>
            <div class="song-container">
                <div class="tabs">
                    <router-link tag="div" class="tabs-button" to="/Music/songContainer">歌曲列表</router-link>
                    <router-link tag="div" class="tabs-button" to="/Music/recommEnded">推荐</router-link>
                    <router-link tag="div" class="tabs-button" to="/Music/search" v-if="false">搜索</router-link>
                    <router-link
                        tag="div"
                        class="tabs-button"
                        to="/Music/userplayList"
                        @click.native="musicLogin"
                    >我的歌单</router-link>
                </div>
                <router-view></router-view>
            </div>
            <div class="lyrics-container"></div>
        </div>
        <playoper></playoper>
        <minplayer></minplayer>
        <login
            :visible="visible"
            @cancel="() => { visible = false }"
        ></login>
    </div>
</template>

<script>
import { getStore } from '@/lib';
import playoper from '@/views/Music/playoper';
import minplayer from '@/views/Music/min-player';
import login from '@/views/Music/login';
export default {
    components: {
        playoper,login,minplayer
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        //验证是否登录
        async musicLogin() {
            const token = await getStore('kieToken')
            if(!token.kieToken) {
                this.visible = true
            }
        }
    }
}
</script>

<style lang="less" scoped>
.Music {
    height: 100%;
    box-sizing: border-box;
    padding: 50px 0 0;
    display: flex;
    flex-direction: column;
    .container {
        flex: 1;
        display: flex;
        flex-direction: row;
        max-width: 1840px;
        margin: 0 40px;
        transition: all 300ms;
        overflow: hidden;
        @media (max-width: 1200px) {
            padding: 10px;
            margin: 0;
        }
        @media (max-width: 500px) {
            padding: 0 10px;
        }
        .song-container {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .lyrics-container {
            width: 360px;
            @media (max-width: 1000px) {
                display: none;
            }
        }
    }
}
.tabs {
    display: flex;
    flex-direction: row;
    margin-top: 24px;
    margin-bottom: 10px;
    @media (max-width: 500px) {
        margin-top: 0;
    }
    .tabs-button {
        border: 1px solid #757575;
        cursor: pointer;
        margin-right: 12px;
        line-height: 36px;
        font-size: 14px;
        color: #e0e0e0;
        padding: 0 12px;
        border-radius: 4px;
        text-align: center;
        &:last-child {
            margin-right: 0;
        }
        @media (min-width: 678px) {
            min-width: 75px;
            &:hover {
                border-color: #ffffff;
                color: #ffffff;
            }
        }
        @media (max-width: 500px) {
            padding: 0 10px;
            line-height: 32px;
        }
    }
    .router-link-exact-active {
        border-color: #ffffff;
        color: #ffffff;
    }
}
</style>