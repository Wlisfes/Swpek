<!--
 * @Author: 情雨随风
 * @Date: 2019-08-04 00:20:22
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 12:22:45
 * @Description: 侧边栏标签抽屉组件
 -->


<template>
    <div class="siderDrawer">
        <a-drawer
            placement="left"
            :closable="false"
            @close="visible = false"
            :visible="visible"
            title="标签分类"
            width="220"
            wrapClassName="siderDrawer"
        >
            <scorll
                ref="siderDrawerwrapper"
                class="siderDrawerwrapper"
                :data="sider"
            >
                <div>
                    <ul class="sider-ul">
                        <li class="sider-li" @click="Asarticle">
                            <a-tag class="tag" color="red">全部</a-tag>
                        </li>
                        <li class="sider-li" v-for="(item, v) in sider" :key="item.id + v" @click="handelitemID(item)">
                            <a-tag class="tag" :color="item.color">{{ item.name }}</a-tag>
                        </li>
                    </ul>
                </div>
            </scorll>
        </a-drawer>
        <div class="siderDrawer-open" @click="handelvisibleOpen">
            <a-icon type="menu-unfold" style="fontSize: 28px;color: #ffffff;" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import scorll from '@cop/common/scorll';
export default {
    data() {
        return {
            visible: false
        }
    },
    components: { scorll },
    computed: {
        ...mapState({
            sider: state => state.tubook.sider
        })
    },
    methods: {
        handelvisibleOpen() {
            this.visible = true
        },
        //选择某个标签
        async handelitemID(item) {
            try {
                this.visible = false
                this.$store.commit('tubook/setcheckSider', item)
                await this.$store.dispatch('tubook/AsarticleID')
            } catch (error) {}
        },
        //文章全部列表
        async Asarticle() {
            try {
                await this.$store.dispatch('tubook/Asarticle', 500)
            } catch (error) {}
            this.visible = false
        }
    }
}
</script>

<style lang="less" scoped>
.siderDrawer-open {
    width: 40px;
    height: 40px;
    cursor: pointer;
    padding: 6px;
    position: fixed;
    left: 0;
    bottom: 40px;
    background-color: #333333;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all 300ms;
    transform: translateX(-100%);
    @media (max-width: 767px) {
        transform: translateX(0);
    }
}

.siderDrawerwrapper {
    height: 100%;
    overflow: hidden;
    .sider-ul {
        margin: 0;
        padding: 12px 6px;
        .sider-li {
            list-style: none;
            padding: 6px 10px;
        }
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
