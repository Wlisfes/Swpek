<!--
 * @Author: 情雨随风
 * @Date: 2019-08-04 22:56:30
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 22:57:42
 * @Description: load组件
 -->

<template>
    <div class="load">
        <a-icon :spin="true" type="loading-3-quarters" style="fontSize: 80px;color: #ccc;" />
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.load {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
