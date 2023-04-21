<template>
    <div>
        <home-tab-bar></home-tab-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import HomeTabBar from '@/components/content/hometabbar/HomeTabBar.vue'

    export default {
        name:'Home',
        components:{
            HomeTabBar,
        }
    }
</script>

<style scoped>

</style>