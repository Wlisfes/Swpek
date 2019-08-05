<template>
    <div id="app">
        <BackImage></BackImage>
        <Header></Header>
        <router-view />
    </div>
</template>

<script>
import Header from '@/components/common/Header'
import BackImage from '@/components/common/BackImage'
export default {
    components: {
        Header,
        BackImage
    }
}
</script>

<style lang="less">
#app {
    width: 100%;
    height: 100%;
}
</style>
