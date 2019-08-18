/*
 * @Author: 情雨随风 
 * @Date: 2019-08-17 17:56:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-08-18 17:10:03
 * @Description:  推荐歌单组件
 */


<template>
    <div class="recommEnded">
        <scorll
            ref="recommEndedWrapper"
            class="recommEndedWrapper"
            :data="personaLized"
        >
            <div class="WrapperContainer">
                <div class="container-item">
                    <h2 class="item-title">推荐歌单</h2>
                    <div class="list">
                        <div class="list-item" v-for="(pers, index) in personaLized" :key="index" @click="playSongOps(pers.id)">
                            <img class="list-item-picUrl" v-lazy="pers.picUrl" alt="" />
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
            personaLized: state => state.music.personaLized
        })
    },
    components: {
        scorll
    },
    created() {
        this.Aspersonalized()
    },
    methods: {
        //推荐歌单
        async Aspersonalized() {
            try {
                await this.$store.dispatch('music/Aspersonalized')
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$refs.recommEndedWrapper.refresh()
                    })
                }, 300)
            } catch (error) {}
        },
        //选择某个歌单
        playSongOps(id) {
            this.$store.commit('music/setplaylistID', id)
            this.$router.push({ path: '/Music/songContainer' })
        }
    }
}
</script>

<style lang="less" scoped>
.recommEnded {
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
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        .list-item {
            width: 200px;
            cursor: pointer;
            margin: 24px;
            overflow: hidden;
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
            position: relative;
            @media (max-width: 1000px) {
                width: 25%;
                margin: 0;
                margin-bottom: 16px;
                box-sizing: border-box;
                padding: 0 10px;
            }
            @media (max-width: 500px) {
                width: 33.3333333333%;
                margin: 0;
                margin-bottom: 12px;
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