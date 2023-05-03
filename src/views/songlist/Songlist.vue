<template>
    <div class="song">
        <song-detail :songdata="songdata"></song-detail>
        <tabulation :songid="songid" class="tabulation"></tabulation>
    </div>
</template>

<script>
import {getall} from '@/network/home/nothome'
import SongDetail from './SongDetail.vue'
import tabulation from './songlist/tabulation.vue'
    export default {
        name:'Songlist',
        data() {
            return {
                id:null,
                songdata:{
                    creator:{
                    }
                },
            songid:[]
            }
        },
        components:{
            SongDetail,
            tabulation,
        },
        mounted(){

        },
        created(){
            this.songsId()
        },
        methods:{
            songsId(){
                this.id=this.$route.params.id
                let cookie=sessionStorage.getItem('cookie')
                getall(this.id,cookie).then(res =>{
                    this.songdata=res.data.playlist
                    //歌单的所有歌曲
                    this.songid=res.data.playlist.trackIds
                    this.$store.commit('addindex',null)
                })
            }
        },
    }
</script>

<style scoped>
.tabulation{
    width: 100%;
    height: 1020px;
}
.song{
    /* width: 100%;
    height: 100%; */
    overflow: hidden;
    overflow-y:scroll;
}
.song::-webkit-scrollbar{
    width: 5px;
}
/* 滚动的滑块 */
.song::-webkit-scrollbar-thumb{
    background-color: #BEBEBE;
    border-radius: 20px;
}
</style>