<!--
 * @Author: 情雨随风
 * @Date: 2019-08-02 23:14:04
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-06 22:11:46
 * @Description: 页脚组件
 -->


<template>
    <div class="Footer">
        <!-- <span>每日一图由Bing搜索提供</span> -->
        <span>Swpe Ant Design ©2019 Created by Wlisfes</span>
        <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备18016996号-1</a>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.Footer {
    background-color: rgba(51,51,51,.5);
    color: #666666;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    a {
        color: #666666;
        &:hover {
            text-decoration: underline;
        }
    }
    span,a {
        margin: 0 5px;
        cursor: pointer;
    }
}
</style>
