<!--
 * @Author: 情雨随风
 * @Date: 2019-08-02 22:57:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-02 22:57:18
 * @Description: 音乐界面
 -->


<template>
    <div class="Music" @touchmove.prevent>
        <el-row style="height: 100%;" @touchmove.prevent>
            <el-col
                :xl="container.xl"
                :lg="container.lg"
                :md="container.md"
                :sm="container.sm"
                :xs="container.xs"
                style="height: 100%;"
            >
                <div style="background: rgba(255,37,37,.3);height: 100%;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            container: {
                xl: { span: 14, offset: 0 },
                lg: { span: 16, offset: 0 },
                md: { span: 18, offset: 0 },
                sm: { span: 20, offset: 0 },
                xs: { span: 24, offset: 0 }
            }
        }
    }


}
</script>

<style lang="less" scoped>
.Music {
    height: 100%;
    box-sizing: border-box;
    padding: 50px 0 0;
}
</style>