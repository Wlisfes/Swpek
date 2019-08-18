<template>
    <div id="app">
        <BackImage></BackImage>
        <Header></Header>
        <router-view />
        <Audio></Audio>
    </div>
</template>

<script>
import Audio from '@/components/common/Audio';
import Header from '@/components/common/Header';
import BackImage from '@/components/common/BackImage';
export default {
    components: {
        Header,
        Audio,
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
