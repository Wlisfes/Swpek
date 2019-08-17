<template>
    <div id="app">
        <BackImage></BackImage>
        <Header></Header>
        <router-view />
        <audio
            ref="Audio"
            @canplay="AudioCanplay"
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
            Audio: state => state.music.Audio
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.$store.commit('music/setAudio', this.$refs.Audio)
        })
    },
    methods: {
        AudioCanplay(e) {
            this.Audio.play()
            this.$store.commit('music/setplay', true)
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
