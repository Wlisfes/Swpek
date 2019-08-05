<!--
 * @Author: 情雨随风
 * @Date: 2019-07-29 22:13:18
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 12:13:05
 * @Description: 
 -->


<template>
    <div class="Index" @touchmove.prevent>
        <section class="content">
            <div class="describe">
                <p style="font-size: 22px;">{{ time }}</p>
                <p>{{ check.name }}</p>
            </div>
        </section>
        <div class="panel">
            <div class="round" @click="prev" title="上一张">
                <a-icon
                    style="fontSize: 20px;" 
                    type="left"
                ></a-icon>
            </div>
            <div class="round" @click="next" title="下一张">
                <a-icon
                    style="fontSize: 20px;" 
                    type="right"
                ></a-icon>
            </div>
            <div class="round">
                <a-icon
                    style="fontSize: 20px;" 
                    type="fullscreen"
                ></a-icon>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Footer from '@/components/common/Footer.vue'
export default {
    data() {
        return {
            time: ''
        }
    },
    computed: {
        ...mapState({
            check: state => state.back.check
        })
    },
    created() {
        this.DateTime()
    },
    methods: {
        //上一张
        prev() {
            this.$store.commit('back/prev')
        },
        //下一张
        next(){
            this.$store.commit('back/next')
        },
        DateTime() {
            const myDat = new Date()
            const Y = myDat.getFullYear()
            const M = myDat.getMonth() + 1// < 10 ? '0' + (myDat.getMonth() + 1) : myDat.getMonth() + 1
            const D = myDat.getDate() //< 10 ? '0' + myDat.getDate() : myDat.getDate()
            const H = myDat.getHours() < 10 ? '0' + myDat.getHours() : myDat.getHours()
            const F = myDat.getMinutes() < 10 ? '0' + myDat.getMinutes() : myDat.getMinutes()
            const S = myDat.getSeconds() < 10 ? '0' + myDat.getSeconds() : myDat.getSeconds()
            
            this.time = `${Y}/${M}/${D} - ${H}:${F}:${S}`
            setTimeout(() => {
                this.DateTime()
            }, 1000)
        }
    },
    components: {
        Footer
    }
}
</script>

<style lang="less" scoped>
.Index {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .describe {
            font-size: 16px;
            color: #fff;
            margin: 12px;
        }
    }
    .panel {
        position: absolute;
        right: 30px;
        bottom: 80px;
        color: #fff;
        width: auto;
        font-size: 0;
        .round {
            display: inline-block;
            width: 40px;
            height: 40px;
            font-size: 16px;
            vertical-align: top;
            border: 2px solid #fff;
            border-radius: 50%;
            text-align: center;
            box-sizing: border-box;
            margin-left: 25px;
            cursor: pointer;
            line-height: 40px;
        }
    }
}
</style>
