<template>
    <Aside class="aside">
        <aside-item path="/home">
            <div>发现音乐</div>
        </aside-item>
        <aside-item path="/podcast">
            <div>博客视频</div>
        </aside-item>
    </Aside>
</template>

<script>
import Aside from '@/components/common/aside/Aside.vue';
import AsideItem from './AsideItem.vue';
    export default {
        components:{
            Aside,
            AsideItem
        }
    }
</script>

<style scoped>
.aside{
    margin-top: 12px;
}
</style>