<template>
    <div class="mainaside">
        <Aside class="aside">
            <aside-item path="/home">
                <div>发现音乐</div>
            </aside-item>
            <aside-item path="/podcast">
                <div>博客视频</div>
            </aside-item>
        </Aside>
        <Aside v-if="isplaylist">
            <div class="playlist">我的歌单</div>
            <songitem v-for="itme in playlist" :songitem="itme">
                <div class="conter" >{{ itme.name }}</div>
            </songitem>
        </Aside>
    </div>
</template>

<script>
import Aside from '@/components/common/aside/Aside.vue';
import AsideItem from './AsideItem.vue';
import Songitem from '@/views/songlist/Songitem.vue';

import {getplaylist} from '@/network/home/nothome'
    export default {
        data() {
            return {
                userid:'',
                playlist:[],
                isplaylist:false,
                id:''
            }
        },
        components:{
            Aside,
            AsideItem,
            Songitem
        },
        created() {
            this.userid=sessionStorage.getItem("id")
            if(sessionStorage.getItem('cookie')){
                getplaylist(this.userid).then(res =>{
                    this.playlist=res.data.playlist
                    this.isplaylist=true
                })
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
.mainaside{
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
}
.aside{
    margin-top: 12px;
}
.playlist{
    margin-left: 12px;
    font-size: 14px;
    color: #8B8989;
}
.conter{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>