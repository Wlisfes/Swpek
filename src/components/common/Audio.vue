/*
 * @Author: 情雨随风 
 * @Date: 2019-08-18 12:50:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-22 21:52:40
 * @Description:  音乐对象组件
 */


<template>
    <audio
        ref="Audio"
        @timeupdate="AudioUpdate"
        @ended="AudioEnded"
    ></audio>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
                let check = await this.api.MusicCheck({
                    id: this.musicID
                })
                if(check.success) {
                    let res = await this.api.MusicSongurl({
                        id: this.musicID
                    })

                    if (res.code == 200) {
                        const url = this.MusicUrl(res.data[0].url)
                        this.$refs.Audio.src = url
                        this.$nextTick(() => {
                            this.$refs.Audio.play()
                            this.$store.commit('music/setplay', true)
                        })
                    }
                }
                else {
                    this.$message({
                        showClose: true,
                        message: '该歌曲暂无版权！',
                        duration: 1500,
                        type: 'error',
                        onClose: () => {
                            this.AudioEnded()
                        }
                    });
                }
            } catch (error) {
                this.$message({
                    showClose: true,
                    message: '该歌曲暂无版权！',
                    duration: 1500,
                    type: 'error',
                    onClose: () => {
                        this.AudioEnded()
                    }
                });
            }
        },
        //url截取配置代理为同源https
        MusicUrl(url) {
            const newUrl = url.slice(url.indexOf('126.net') + 7)
            return process.env.NODE_ENV === "production" ? `/musicUrl${newUrl}` : url
        }
    }
}
</script>