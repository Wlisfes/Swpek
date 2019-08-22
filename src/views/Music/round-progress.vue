/*
 * @Author: 情雨随风 
 * @Date: 2019-08-22 22:38:54 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-22 23:05:34
 * @Description: 圆行进度条组件
 */


<template>
    <div class="Round-progress play-operators" >
        <svg :width="32" :height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" stroke-dasharray="314"
                :stroke-dashoffset="progress"/>
        </svg>
        <div class="icon">
            <img :src="play ? pauseIcon : playIcon" alt="" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            playIcon: require('@/assets/icon/play.png'),
            pauseIcon: require('@/assets/icon/pause.png')
        }
    },
    computed: {
        ...mapState({
            play: state => state.music.play,
            progress: state => {
                return (314 - (state.music.currentTime / state.music.durationTime) * 314) || 314
            }
        })
    }
}
</script>

<style lang="less" scoped>
.Round-progress {
    position: relative;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;

    circle {
        stroke-width: 8px;
        transform-origin: center;

        &.progress-background {
            transform: scale(.9);
            stroke: hsla(0,0%,7%,.6);
        }

        &.progress-bar {
            transform: scale(.9) rotate(-90deg);
            stroke: #fd6c62;
        }
    }
    
    .icon {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;

        >img {
            width: 20px;
        }
    }
}
</style>