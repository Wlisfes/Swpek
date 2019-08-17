<template>
    <div id="app">
        <BackImage></BackImage>
        <Header></Header>
        <router-view />
        <audio
            ref="Audio"
            @canplay="AudioCanplay"
            @timeupdate="AudioUpdate"
        ></audio>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/common/Header'
import BackImage from '@/components/common/BackImage'
export default {
    components: {
        Header,
        BackImage
    },
    computed: {
        ...mapState({
            Audio: state => state.music.Audio,
            press: state => state.music.press
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.$store.commit('music/setAudio', this.$refs.Audio)
        })
    },
    methods: {
        //缓冲后播放
        AudioCanplay(e) {
            this.Audio.play()
            this.$store.commit('music/setplay', true)
        },
        //播放监听计算进度条
        AudioUpdate(e) {
            if(!this.press) {
                this.$store.commit('music/setcurrentTime', e.target.currentTime)
            }
        }
    }
}
</script>

<style lang="less">
#app {
    width: 100%;
    height: 100%;
}
</style>
