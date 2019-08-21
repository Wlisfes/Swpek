/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 17:59:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-21 23:14:36
 * @Description:  用户歌单组件
 */



<template>
    <div class="userplayList">
        <scorll
            ref="recommEndedWrapper"
            class="recommEndedWrapper"
            :data="Uidplaylist"
        >
            <div class="WrapperContainer">
                <div class="container-item">
                    <h2 class="item-title">我的歌单</h2>
                    <div class="list">
                        <div class="list-item" v-for="(pers, index) in Uidplaylist" :key="index" @click="playSongOps(pers.id)">
                            <img class="list-item-picUrl" v-lazy="pers.coverImgUrl" alt="" />
                            <p class="list-item-name">{{ pers.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </scorll>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import scorll from '@cop/common/scorll';
export default {
    computed: {
        ...mapState({
            Uidplaylist: state => state.music.Uidplaylist
        })
    },
    components: {
        scorll
    },
    created() {
        this.AsUidplaylist()
    },
    methods: {
        //选择某个歌单
        playSongOps(id) {
            this.$store.commit('music/setplaylistID', id)
            this.$router.push({ path: '/Music/songContainer' })
        },
        //用户歌单
        async AsUidplaylist() {
            try {
                await this.$store.dispatch('music/AsUidplaylist')
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs.recommEndedWrapper.refresh()
                    })
                }, 300)
            } catch (error) {}
        }
    }
}
</script>

<style lang="less" scoped>
.userplayList {
    flex: 1;
    overflow: hidden;
    position: relative;
    .recommEndedWrapper {
        height: 100%;
    }
    .WrapperContainer {
        padding-bottom: 50px;
    }
}
.container-item {
    display: block;
    .item-title {
        font-size: 18px;
        color: #e0e0e0;
        margin-top: 24px;
        padding-left: 24px;
        @media (max-width: 880px) {
            width: 33.3333333333%;
            padding-left: 12px;
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        .list-item {
            width: 20%;
            cursor: pointer;
            overflow: hidden;
            padding: 20px;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            position: relative;
            box-sizing: border-box;
            @media (max-width: 1580px) {
                width: 25%;
            }
            @media (max-width: 1280px) {
                width: 33.3333333333%;
                
            }
            @media (max-width: 880px) {
                width: 33.3333333333%;
                padding: 12px;
            }
            @media (max-width: 500px) {
                width: 33.3333333333%;
                padding-bottom: 12px;
                box-sizing: border-box;
                padding: 0 5px;
            }
            .list-item-picUrl {
                width: 100%;
                display: block;
                object-fit: cover;
                border-radius: 6px;
            }
            .list-item-name {
                font-size: 14px;
                color: #e0e0e0;
                margin-bottom: 0;
                margin-top: 6px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                @media (max-width: 500px) {
                    font-size: 12px;
                    margin-bottom: 10px;
                }
            }

        }
    }
}
</style>