<!--
 * @Author: 情雨随风
 * @Date: 2019-08-02 22:57:35
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-05 22:14:32
 * @Description: 笔记界面
 -->


<template>
    <div class="Notes" @touchmove.prevent>
        <el-row class="book-content" style="height: 100%;" @touchmove.prevent>
            <el-col
                :xl="sider.xl"
                :lg="sider.lg"
                :md="sider.md"
                :sm="sider.sm"
                class="hidden-xs-only"
                style="height: 100%;"
            >
                <sider></sider>
            </el-col>
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
        <siderDrawer></siderDrawer>
    </div>
</template>

<script>
import sider from '@/views/Notes/sider';
import siderDrawer from '@/views/Notes/siderDrawer';
import container from '@/views/Notes/container';
export default {
    components: {
        sider,
        container,
        siderDrawer
    },
    data() {
        return {
            sider:{
                xl: { span: 4, offset: 2 },
                lg: { span: 5, offset: 1 },
                md: { span: 6, offset: 0 },
                sm: { span: 6, offset: 0 }
            },
            container: {
                xl: { span: 13 },
                lg: { span: 16 },
                md: { span: 18 },
                sm: { span: 18 },
                xs: { span: 24 }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.Notes {
    height: 100%;
    box-sizing: border-box;
    padding: 50px 0 12px;
    @media (max-width: 500px) {
        padding-bottom: 0;
    }
}
</style>