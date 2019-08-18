/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 22:34:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-18 10:54:27
 * @Description: 音乐操作面板
 */


<template>
    <div class="playoper">
        <div class="container">
            <div class="oper">
                <i class="oper-icon prev-icon" title="上一首" @click="prev"></i>
                <i
                    class="oper-icon"
                    :title="play ? '暂停':'播放' "
                    :class="[ play ? 'play-icon' : 'pause-icon' ]"
                    @click="Audioplay"
                ></i>
                <i class="oper-icon next-icon" title="下一首" @click="next"></i>
            </div>
            <div class="progress">
                <div class="progress-container">
                    <div class="musicInfo">
                        <p>
                            <span v-if="musicOps && musicOps.name">{{ musicOps.name + '-' + musicOps.singer }}</span>
                            <span v-else>欢迎收听Music</span>
                        </p>
                        <div class="span-container">
                            <span class="span">
                                <span v-if="currentTime">{{ currentTime | times }}</span>
                                <span v-else>00:00</span>
                            </span>
                            /
                             <span class="span">
                                <span v-if="durationTime">{{ durationTime | times }}</span>
                                <span v-else>00:00</span>
                            </span>
                        </div>
                    </div>
                    <a-slider
                        style="margin: 8px 6px 8px"
                        :defaultValue="0"
                        :min="0"
                        :max="durationTime"
                        v-model="Time"
                        :tipFormatter="formatter"
                        @change="sliderChange"
                        @afterChange="afterChange"
                    ></a-slider>
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
    data() {
        return {
            Time: 0
        }
    },
    computed: {
        ...mapState({
            Audio: state => state.music.Audio,
            play: state => state.music.play,
            musicOps: state => state.music.musicOps,
            playIndex: state => state.music.playIndex,
            currentTime: state => state.music.currentTime,
            durationTime: state => state.music.durationTime
        })
    },
    watch: {
        currentTime(a, b) {
            this.Time = this.currentTime
        }
    },
    filters: {
        times: (val) => times(val)
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
        },
        //进度条开始聚焦拖动
        sliderChange(e) {
            this.$store.commit('music/setpress', true)
        },
        //进度条拖动完毕
        afterChange(e) {
            this.Audio.currentTime = e
            this.$store.commit('music/setpress', false)
        },
        //上一首
        prev() {
            if(this.playIndex == -1) {
                return
            }
            this.$store.commit('music/prev')
            this.vm.$emit('prev')
        },
        //下一首
        next() {
            if(this.playIndex == -1) {
                return
            }
            this.$store.commit('music/next')
            this.vm.$emit('next')
        }
    },
}
</script>

<style lang="less" scoped>
.playoper {
    height: 80px;
    @media (max-width: 500px) {
        display: none;
    }
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
            .play-icon,.pause-icon {
                @media (max-width: 1200px) {
                    margin: 0 24px;
                }
            }
        }
        .pattern {
            width: 360px;
            height: 100%;
            @media (max-width: 1000px) {
                display: none;
            }
        }
    }
}

.progress {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    .progress-container {
        margin: 0 40px;
        flex: 1;
        @media (max-width: 1200px) {
            margin: 0 24px;
        }
    }
    .musicInfo {
        display: flex;
        flex-direction: row;
        p {
            flex: 1;
            margin-bottom: 0;
            font-size: 12px;
            color: #ffffff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        .span-container {
            font-size: 12px;
            color: #ffffff;
        }
    }
}
</style>