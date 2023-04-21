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
                if(sessionStorage.getItem('cookie')){
                    console.log(this.id);
                    getall(this.id,cookie).then(res =>{
                        this.songdata=res.data.playlist
                        this.songid=res.data.playlist.trackIds
                    })
                }
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
</style>