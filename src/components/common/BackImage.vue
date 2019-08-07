<!--
 * @Author: 情雨随风
 * @Date: 2019-07-31 22:58:19
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-07 22:35:59
 * @Description: 背景图组件  :style="{ backgroundImages: 'url('+ url +')' }"
 -->


<template>
    <div id="BackImage" 
        :style="{ backgroundImage: 'url('+ check.url +')' }"
    >
        <div class="mask-fixedbg"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    created() {
        this.wallpaper()
    },
    computed: {
        ...mapState({
            check: state => state.back.check
        })
    },
    methods: {
        //bing壁纸获取
        async wallpaper() {
            try {
                await this.$store.dispatch('back/wallpaper')
            } catch (error) {}
        }
    }
}
</script>

<style lang="less">
#BackImage {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    z-index: -2;
    background: transparent;
    background-size: cover;
    background-position: center center;
    transition: all 1000ms;
    will-change: transform;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #222;
        opacity: 0;
        visibility: hidden;
        transition: all .5s;
    }
    .mask-fixedbg {
        background: -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 10%, rgb(7, 17, 27) 90%);
        opacity: 0.9;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>


