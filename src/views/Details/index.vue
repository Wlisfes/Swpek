<!--
 * @Author: 情雨随风
 * @Date: 2019-08-03 20:38:35
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-08-05 23:13:22
 * @Description: 富文本详情页面
 -->


<template>
    <div class="Details" >
        <div class="detailswrapper-content">
            <div class="container">
                <div v-show="container" v-html="container" v-highlight></div>
                <iSnone v-if="!container && !load"></iSnone>
            </div>    
        </div>
        <a-back-top />
        <div class="load" v-show="load">
            <a-icon :spin="true" type="loading-3-quarters" style="fontSize: 80px;color: #ffffff;" />
        </div>
    </div>
</template>

<script>
import scorll from '@cop/common/scorll';
import iSnone from '@cop/common/iSnone';
export default {
    data() {
        return {
            container: '',
            load: true
        }
    },
    components: { scorll,iSnone },
    created() {
        this.Details()
    },
    methods: {
        //富文本详情
        async Details() {
            try {
                const { id,type } = this.$route.params
                if(type === 'tubook') {
                    let res = await this.api.ArticleDetails({ id })
                    if(res.code === 200) {
                        this.container = res.data.Text
                    }
                }
                else if(type === 'notes') {
                    let res = await this.api.BookDetails({ id })
                    if(res.code === 200) {
                        this.container = res.data.Text
                    }
                }
            } catch (error) {}
            this.load = false
        }
    }
}
</script>

<style lang="less" scoped>
.Details {
    position: relative;
    min-height: 100%;
    z-index: 99;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    .load {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.detailswrapper-content {
    flex: 1;
    max-width: 1020px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .container {
        flex: 1;
        background-color: #ffffff;
        cursor: pointer;
        padding: 24px;
            @media (max-width: 500px) {
            padding: 12px;
        }
    }
}
</style>
