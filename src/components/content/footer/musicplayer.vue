<template>
    <div class="musicPlay">
        <audio class="playMusicAudio" 
        ref="audio" autoplay :src="songurl" controls
        @ended="nextsong"></audio>
    </div>
</template>

<script>
import {geturl} from '@/network/home/nothome'
    export default {
        data() {
            return {
                //存放歌曲
                songdata:[],
                // songid:null,
                //歌曲url
                songurl:'',
                //点击那首歌曲
                num:null,
            }
        },
        methods:{
            //获取歌曲url的api
            geturl(id){
                geturl(sessionStorage.getItem('cookie'),id).then(res =>{
                    this.songurl=res.data.data[0].url
                    console.log(this.songurl);
                })
            },
            //存放歌曲
            songlist(){
                this.songdata=[]
                for (const iterator of this.song) {
                    this.songdata.push(iterator)
                }
            },
            // 播放到最后一首歌的时候重新回到第一首
            nextsong(){
                this.songlist()
                this.geturl(this.songdata[this.num].id)
                console.log(this.songdata[this.num].name);
            }
        },
        computed:{
            song(){//所有歌曲
                return this.$store.getters.songmutations
            },
            addindex(){
                return this.$store.state.index
            }
        },
        watch:{
            addindex:function(vla) {
                console.log(vla);
                this.num=vla
                this.songlist()
                console.log(this.songdata[this.num].name);
                this.geturl(this.songdata[this.num].id)
            }
        },
    }
</script>

<style  scoped>
.musicPlay{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
}
.playslider{
    width: 43%;
    margin-top: -5px;
    margin-left: 50%;
    transform: translateX(-50%);
}
</style>