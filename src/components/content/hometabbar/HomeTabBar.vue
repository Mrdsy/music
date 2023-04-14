<template>
    <div class="hometb">
        <tab-bar>
            <main-tab-bar path="recommend">
                <div>个性推荐</div>
            </main-tab-bar>
            <main-tab-bar path="exclusive">
                <div>专属定制</div>
            </main-tab-bar>
            <main-tab-bar path="songsheet">
                <div>歌单</div>
            </main-tab-bar>
            <main-tab-bar path="ranking">
                <div>排行榜</div>
            </main-tab-bar>
            <main-tab-bar path="singer">
                <div>歌手</div>
            </main-tab-bar>
            <main-tab-bar path="newmusic">
                <div>最新音乐</div>
            </main-tab-bar>
        </tab-bar>
    </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar.vue';
import MainTabBar from '@/components/content/hometabbar/MainTabBar.vue';
    export default {
        components:{
            TabBar,
            MainTabBar
        }
    }
</script>

<style scoped>
.hometb{
    margin-bottom: 20px;
}
</style>