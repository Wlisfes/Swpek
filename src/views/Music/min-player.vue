/*
 * @Author: 情雨随风 
 * @Date: 2019-08-22 21:27:29 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-22 22:56:37
 * @Description: 迷你播放器
 */


<template>
    <div id="mini-player-container">
        <div id="mini-player">
            <div class="mini-player-icon">
                <div class="cd" :class="playClass">
                    <img class="image" :src="musicOps.picUrl ? musicOps.picUrl : icon" border="0" />
                </div>
            </div>
            <div class="mini-player-info">
                <p>{{ musicOps.name ? musicOps.name : '欢迎收听Music' }}</p>
                <p>{{ musicOps.singer ? musicOps.singer : '情雨随风' }}</p>
            </div>
            <div class="round" @click.stop="Audioplay">
                <roundprogress></roundprogress>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import roundprogress from '@/views/Music/round-progress';
export default {
    name: "min-player",
    components: { roundprogress },
    data() {
        return {
            icon: require('@/assets/icon/load.png')
        }
    },
    computed: {
        ...mapState({
            Audio: state => state.music.Audio,
            musicOps: state => state.music.musicOps,
            playIndex: state => state.music.playIndex,
            play: state => state.music.play,
            playClass: state => state.music.play ? 'play' : 'pause'
        })
    },
    methods: {
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
    }
}
</script>

<style lang="less" scoped>
#mini-player-container {
    display: none;
    height: 60px;
    @media (max-width: 500px) {
        display: block;
    }
}
#mini-player {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    background-color: #f5f5f5;
    .mini-player-icon {
        width: 40px;
        height: 40px;
        margin: 0 10px 0 20px;
        position: relative;
        .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            &.play {
                animation: rotate 20s linear infinite;
            }
            &.pause {
                animation-play-state: paused;
                animation: rotate 20s linear infinite;
                -webkit-animation-play-state:paused;
            }
            .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        
    }
    .mini-player-info {
        flex: 1;
        p {
            margin-bottom: 0;
            font-size: 14px;
        }
    }
    .round {
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }




    
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>