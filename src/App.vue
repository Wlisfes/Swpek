<template>
    <div id="app">
        <BackImage></BackImage>
        <Header></Header>
        <router-view />
        <audio
            ref="Audio"
            @timeupdate="AudioUpdate"
            @ended="AudioEnded"
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
            press: state => state.music.press,
            musicID: state => state.music.musicID
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.$store.commit('music/setAudio', this.$refs.Audio)
        })
        this.vm.$on('play', this.Audioplay)
        this.vm.$on('prev', this.Audioplay)
        this.vm.$on('next', this.Audioplay)
    },
    methods: {
        //播放监听计算进度条
        AudioUpdate(e) {
            if(!this.press) {
                this.$store.commit('music/setcurrentTime', e.target.currentTime)
            }
        },
        //播放结束
        AudioEnded() {
            this.$store.commit('music/next')
            this.$store.commit('music/setcurrentTime', 0)
            this.vm.$emit('next')
        },
        //选取音乐事件
        async Audioplay() {
            try {
                let res = await this.api.MusicSongurl({
                    id: this.musicID
                })

                if (res.code == 200) {
                    this.$refs.Audio.src = res.data[0].url
                    this.$nextTick(() => {
                        this.$refs.Audio.play()
                        this.$store.commit('music/setplay', true)
                    })
                }
            } catch (error) {
                
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
