<!--
 * @Author: 情雨随风
 * @Date: 2019-08-02 22:56:28
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-04 23:27:41
 * @Description: 项目界面
 -->


<template>
    <div class="Titem" @touchmove.prevent>
        <el-row style="height: 100%;" @touchmove.prevent>
            <el-col
                :xl="container.xl"
                :lg="container.lg"
                :md="container.md"
                :sm="container.sm"
                :xs="container.xs"
                style="height: 100%;"
            >
                <container></container>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import container from '@/views/Titem/container';
export default {
    components: {
        container
    },
    data() {
        return {
            container: {
                xl: { span: 14, offset: 5 },
                lg: { span: 16, offset: 4 },
                md: { span: 18, offset: 3 },
                sm: { span: 20, offset: 2 },
                xs: { span: 24, offset: 0 }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.Titem {
    height: 100%;
    box-sizing: border-box;
    padding: 50px 0 12px;
    @media (max-width: 500px) {
        padding-bottom: 0;
    }
}
</style>