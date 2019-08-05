<!--
 * @Author: 情雨随风
 * @Date: 2019-08-03 15:11:10
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 12:01:54
 * @Description: 侧边栏标签组件
 -->


<template>
    <div class="sider">
        <scorll
            ref="siderwrapper"
            class="siderwrapper"
            :data="sider"
        >
            <div class="content">
                <div class="siderwrapper-content">
                    <h2 class="title">标签分类</h2>
                    <ul>
                        <li class="li-tags" @click="Asarticle">
                            <a-tag class="tag" color="red">全部</a-tag>
                        </li>
                        <li class="li-tags" v-for="(item, v) in sider" :key="item.id + v" @click="handelitemID(item)">
                            <a-tag class="tag" :color="item.color">{{ item.name }}</a-tag>
                        </li>
                    </ul>
                </div>
            </div>
        </scorll>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import scorll from '@cop/common/scorll';
export default {
    components: { scorll },
    computed: {
        ...mapState({
            sider: state => state.tubook.sider
        })
    },
    created() {
        this.Assider()
    },
    methods: {
        //首次加载
        async Assider() {
            try {
                await this.$store.dispatch('tubook/Assider')
            } catch (error) {}
        },
        //选择某个标签
        async handelitemID(item) {
            this.$store.commit('tubook/setcheckSider', item)
            await this.$store.dispatch('tubook/AsarticleID')
        },
        //文章全部列表
        async Asarticle() {
            try {
                await this.$store.dispatch('tubook/Asarticle', 500)
            } catch (error) {}
        }
    }
}
</script>

<style lang="less" scoped>
.sider {
    height: 100%;
    margin: 0 10px;
    overflow: hidden;
    .siderwrapper {
        height: 100%;
        overflow: hidden;
    }
}
.siderwrapper-content {
    padding: 4px 0;
    background-color: #FFFFFF;
    border-radius: 5px;
    max-width: 220px;
    width: 100%;
    margin-left: auto;
    cursor: pointer;
    .title {
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
        font-weight: bold;
        text-align: center;
        margin-bottom: 0;
        line-height: 34px;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    .li-tags {
        list-style: none;
        padding: 6px 10px;
        .tag {
            display: block;
            margin-right: 0;
            line-height: 32px;
            height: 32px;
            text-align: center;
            font-size: 16px;
        }
    }
}
</style>
