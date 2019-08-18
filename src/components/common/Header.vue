<!--
 * @Author: 情雨随风
 * @Date: 2019-08-01 22:27:46
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 00:48:03
 * @Description: 导航组件
 -->



<template>
    <section>
        <header class="navbar" @touchmove.prevent>
            <div class="sidebar-icon" @click="visible = true">
                <a-icon type="menu-unfold" style="fontSize: 28px;color: #ffffff;" />
            </div>
            <nav class="nav">
                <div class="nav-item" v-for="(item, i) in routes" :key="i">
                    <router-link :exact="i == 0" :to="item.to">{{ item.name }}</router-link>
                </div>
            </nav>
            <div class="sidebar-github">
                <a href="https://github.com/Wlisfes" target="_blank" rel="noopener noreferrer">
                    <a-icon type="github" style="fontSize: 28px;color: #ffffff;" />
                </a>
            </div>
        </header>

        <a-drawer
            placement="left"
            :closable="false"
            @close="visible = false"
            :visible="visible"
        >
            <template slot="title">
                <div class="wrap-title">
                    <img class="wrap-icon" :src="drawer" alt="" />
                    <h1>情雨随风的青春</h1>
                </div>
            </template>
            <nav class="wrapSwiper">
                <div class="nav-item" v-for="(item, i) in routes" :key="i" @click="visible = false">
                    <router-link :exact="i == 0" :to="item.to">{{ item.name }}</router-link>
                </div>
            </nav>
        </a-drawer>
    </section>
</template>

<script>
const drawer = require('@icon/drawer-icon.png')
export default {
    data() {
        return {
            routes: [
                { to: '/', name: '🍎 首页' },
                { to: '/Tubook', name: '🍀 归档' },
                { to: '/Titem', name: '🍄 项目' },
                { to: '/Music', name: '🍓 音乐' },
                { to: '/Notes', name: '🍒 笔记' },
                { to: '/Chain', name: '🍄 友链' }
            ],

            //抽屉
            visible: false,
            drawer
        }
    },
}
</script>

<style lang="less" scoped>
@import "~@style/common.less";

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    right: 0;
    box-sizing: border-box;
    height: 46px;
    .sidebar-icon {
        width: 46px;
        height: 46px;   
        cursor: pointer;
        padding: 9px;
        position: fixed;
        top: 0;
        left: 0;
        transition:  all 300ms;
        transform: translateX(-100%);
        @media (max-width: 768px) {
            transform: translateX(0);
        }
    }
    .sidebar-github {
        width: 46px;
        height: 46px;   
        cursor: pointer;
        padding: 9px;
        float: right;
    }
    .nav {
        white-space: nowrap;
        padding-right: 10px;
        position: fixed;
        left: 0;
        top: 0;
        transition: all 300ms;
        transform: translateY(0);
        @media (max-width: 768px) {
            transform: translateY(-50px);
        }
    }
}
.nav-item {
    display: inline-block;
    padding: 0 14px;
    a {
        color: @color_fff;
        line-height: 46px;
        text-decoration: none;
        padding-bottom: 10px;
        position: relative;
    }
    a.router-link-active::before {
        content: "";
        width: 40px;
        height: 2px;
        background-color: @color_fff;
        position: absolute;
        bottom: 0;
        left: 5px;
        border-radius: 1px;
    }
}

.wrap-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    .wrap-icon {
        width: 44px;
        border-radius: 4px;
        margin-right: 10px;
    }
    h1 {
        font-size: 20px;
        font-weight: 600;
        color: #444444;
        margin-bottom: 0;
        font-family: Arial, Helvetica, sans-serif;
    }
    
}

.wrapSwiper {
    .nav-item {
        display: block;
        padding: 0;
        a {
            display: block;
            padding-bottom: 0;
            font-size: 20px;
            font-weight: 600;
            font-family: Arial, Helvetica, sans-serif;
            color: #444444;
            position: relative;
        }
        a.router-link-active::before {
            content: "";
            width: 70px;
            height: 4px;
            background-color: #444444;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 2px;
        }
    }
}

</style>
