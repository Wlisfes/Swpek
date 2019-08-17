/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 22:34:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-18 00:16:15
 * @Description: 音乐操作面板
 */


<template>
    <div class="playoper">
        <div class="container">
            <div class="oper">
                <i class="oper-icon prev-icon" title="上一首"></i>
                <i
                    class="oper-icon"
                    :title="play ? '暂停':'播放' "
                    :class="[ play ? 'play-icon' : 'pause-icon' ]"
                    @click="Audioplay"
                ></i>
                <i class="oper-icon next-icon" title="下一首"></i>
            </div>
            <div class="progress">
                <div class="progress-container">
                    <a-slider :defaultValue="0" :max="350" :tipFormatter="formatter"></a-slider>
                </div>
            </div>
            <div class="pattern"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { times } from '@/lib';
export default {
    computed: {
        ...mapState({
            Audio: state => state.music.Audio,
            play: state => state.music.play,
            playIndex: state => state.music.playIndex
        })
    },
    methods: {
        //进度条聚焦显示
        formatter(value) {
            return times(value)
        },
        //播放 or 暂停
        Audioplay () {
            if(this.playIndex === -1) {
                return
            }
            if(this.play) {
                this.Audio.pause()
                this.$store.commit('music/setplay', false)
            }
            else {
                this.Audio.play()
                this.$store.commit('music/setplay', true)
            }
        }
    },
}
</script>

<style lang="less" scoped>
.playoper {
    height: 80px;
    .container {
        height: 100%;
        display: flex;
        flex-direction: row;
        margin: 0 40px;
        transition: all 300ms;
        overflow: hidden;
        align-items: center;
        @media (max-width: 1200px) {
            padding: 10px;
            margin: 0;
        }
        .oper {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .pattern {
            width: 360px;
            height: 100%;
            @media (max-width: 1000px) {
                display: none;
            }
        }
        .progress {
            flex: 1;
            .progress-container {
                margin: 0 40px;
            }
        }
    }
}
</style>