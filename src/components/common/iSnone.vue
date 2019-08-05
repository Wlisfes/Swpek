<!--
 * @Author: 情雨随风
 * @Date: 2019-08-04 21:34:58
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 21:37:50
 * @Description: 什么都没有组件
 -->


<template>
    <div class="iSnone">
        <img :src="none" alt="" />
        <p>什么都没有...</p>
    </div>
</template>

<script>
const none = require('@icon/is_none.jpg')
export default {
    data() {
        return {
            none
        }
    },
}
</script>

<style lang="less" scoped>
.iSnone {
    max-width: 200px;
    margin: 120px auto 0;
    cursor: pointer;
    @media (max-width: 500px) {
        margin-top: 60px;
        max-width: 140px;
    }
    img {
        width: 100%;
        border-radius: 10px;
    }
    p {
        font-size: 18px;
        color: #333333;
        text-align: center;
        margin-top: 16px;
    }
}
</style>

