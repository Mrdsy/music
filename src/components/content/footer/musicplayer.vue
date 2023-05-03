<template>
    <div class="musicPlay">
        <audio class="playMusicAudio" id="audio"
        ref="audio" autoplay :src="songurl"
        @ended="nextsong"
        @canplay="getDuration"
        @timeupdate="durationUpdate">
        </audio>
        <div class="picUrl">
            <img :src="picUrl" alt="" v-if="!isplay">
        </div>
        <div v-if="!isplay">
            <p class="name">{{ name }}</p>
            <p class="arname">{{ arname }}</p>
        </div>
        <div id="playSlider" v-if="!isplay">
            <div class="mode" @click="ranicon" @mouseover="mouseover" @mouseleave="mouseleave">
                <div id="icon" v-if="this.iconNum===1">
                    <img src="@/assets/img/列表循环.png" v-if="!mouse">
                    <img src="@/assets/img/列表循环b.png" v-if="mouse">
                </div>
                <div id="icon" v-if="this.iconNum===2">
                    <img src="@/assets/img/单曲循环.png"  v-if="!mouse">
                    <img src="@/assets/img/单曲循环b.png" v-if="mouse">
                </div>
                <div id="icon" v-if="this.iconNum===3">
                    <img src="@/assets/img/随机播放.png"  v-if="!mouse">
                    <img src="@/assets/img/随机播放b.png" v-if="mouse">
                </div>
                <div id="icon" v-if="this.iconNum===4">
                    <img src="@/assets/img/列表.png"  v-if="!mouse">
                    <img src="@/assets/img/列表b.png" v-if="mouse">
                </div>
            </div>
            <div class="button">
                <div class="up" @click="left" @mouseover="overup" @mouseleave="leaveup">
                    <img src="@/assets/img/上一首.png" v-if="!up">
                    <img src="@/assets/img/上一首b.png" v-if="up">
                </div>
                <div class="centre" @click="play" v-if="!isPlaying">
                    <img src="@/assets/img/开始.png">
                </div>
                <div class="centre" @click="pause" v-if="isPlaying">
                    <img src="@/assets/img/暂停.png">
                </div>
                <div class="down" @click="right" @mouseover="overdown" @mouseleave="leavedown">
                    <img src="@/assets/img/下一首.png" v-if="!down">
                    <img src="@/assets/img/下一首b.png" v-if="down">
                </div>
                <span class="starttime" v-if="!isplay">{{ starttime }}</span>
                <span class="time" v-if="!isplay">{{time}}</span>
            </div>
        </div>
        <div class="block" v-if="!isplay">
                <el-slider v-model="musicDuration" :max="musicAllDuration" :show-tooltip="false" @change="changeMusicDuration" @mousedown.native="isChange = true" @mouseup.native="isChange = false"></el-slider>
        </div>
        <div class="other" v-if="!isplay">
            <img src="@/assets/img/列表播放.png" alt="" @click="clicklist" class="songlistlogo">
            <el-tooltip effect="light" placement="top" popper-class="testtooltip">
                <div slot="content" class="volumebar">
                    <el-slider class="volumeslider" vertical height="100px" v-model="audio.volume" :step="0.01" :max="1"
                    :show-tooltip="false" @input="voiceChange()"></el-slider>
                </div>
                <img src="@/assets/img/音量.png" alt="" @click="mute" class="volume" v-if="!audio.muted">
                <img src="@/assets/img/静音.png" alt="" @click="cancelMute" class="volume" v-if="audio.muted">
            </el-tooltip>
        </div>
        <transition name="fade">
            <div v-if="playerclick" v-show="isshow">
                <songlist class="songlist" :songlist="song"></songlist>
            </div>
        </transition>
    </div>
</template>

<script>
import {geturl} from '@/network/home/nothome'
import {formatDuration} from '@/components/common/time'
import songlist from "./songlist.vue"
    export default {
        data() {
            return {
                //歌曲url
                songurl:'',
                // 判断当前是否在播放
                isPlaying: false,
                //判断播放顺序模式
                playOrd: 0,
                //歌曲总时长
                musicAllDuration: 0,
                // 歌曲当前时长
                musicDuration: 0,
                //判断是否被拖动
                isChange: false,
                // 是否暂停
                isPlaying:false,
                isplay:true,
                // 歌曲封面
                picUrl:'',
                name:'歌名',
                arname:'专辑名',
                //显示歌曲的总时长
                time:0,
                //显示歌曲的当前时长
                starttime:0,
                // 切换模式
                iconNum:0,
                // 获取下标
                num:0,
                //切换模式的悬浮样式
                mouse:null,
                // 上一首的悬停样式
                up:null,
                // 下一首的悬停样式
                down:null,
                // 随机播放
                isshuffle:false,
                isshow:false,
                audio:{
                    // 播放状态
                    playing:false,
                    // 静音状态
                    muted:false,
                    // 音频当前播放时长
                    currentTime:0,
                    // 音量
                    volume:0.2,
                    // 音频最大播放时长
                    maxTime:0,
                    // 当前的音量
                    recordvolume:0
                }
            }
        },
        props:{
            playerclick:{
                type:Boolean,
            }
        },
        components:{
            songlist
        },
        created(){
            this.iconNum=1
        },
        methods:{
            mute(){
                this.audio.volume=0
                this.audio.muted=true
                this.$refs.audio.muted=true
            },
            cancelMute(){
                this.audio.volume=0.2
                this.audio.muted=false
                this.$refs.audio.muted=false
            },
            voiceChange(){
                if (this.audio.volume===0) {
                    this.mute()
                }else{
                    this.$refs.audio.muted=false
                    this.audio.muted=false
                }
                this.$refs.audio.volume=this.audio.volume
            },
            clicklist(){
                this.isshow=!this.isshow
            },
            shuffle(arr){
                let _arr = arr.slice();
                for (let i = 0; i<_arr.length; i++){
                    let j = this.getRandomInt(0,i);
                    let t = _arr[i];
                    _arr[i] = _arr[j];
                    _arr[j] = t;
                }
                return _arr;
            },
            getRandomInt(min,max){
                return Math.floor(Math.random()*(max-min+1))+min;
            },
            // 下一首的悬停样式
            overdown(){
                this.down=true
            },
            leavedown(){
                this.down=false

            },
            // 上一首的悬停样式
            overup(){
                this.up=true
            },
            leaveup(){
                this.up=false
            },
            //切换模式的悬浮样式
            mouseleave(){
                this.mouse=false
            },
            mouseover(){
                this.mouse=true
            },
        // 切换播放模式
            ranicon(){
                switch (this.iconNum) {
                    case 1:
                        console.log("顺序播放");
                        this.iconNum = 2
                        break;
                    case 2:
                        console.log("单曲循环");
                        this.iconNum = 3
                        this.isshuffle=true
                        this.$store.commit('shuffle',this.shuffle(this.song))
                        break;
                    case 3:
                        this.isshuffle=false
                        this.$store.commit('emptyshuffle')
                        console.log("随机播放");
                        this.iconNum = 4
                        break;
                    case 4:
                        console.log("列表播放");
                        this.iconSongNum=4
                        this.iconNum = 1
                        break;
                    default:
                        break;
                }
            },
            // 时间转化
            times(data){
                return formatDuration(data)
            },
            // 上一首
            left(){
                if (this.isshuffle) {
                    this.$store.commit('shuffleleft')
                }else{
                    this.$store.commit('songleft')
                }
            },
            // 暂定
            pause(){
                this.$refs.audio.pause()
                this.isPlaying=false
            },
            // 开始
            play(){
                this.$refs.audio.play()
                this.isPlaying=true
            },
            // 下一首
            right(){
                if (this.isshuffle) {
                    this.$store.commit('shuffleindex')
                }else{
                    this.$store.commit('songindex')
                }
            },
            // 获取歌曲的总时间
            getDuration(){
                this.musicAllDuration = this.$refs.audio.duration
            },
            //更新当前时长
            durationUpdate() {
                if (this.isChange === true) return
                this.musicDuration = this.$refs.audio.currentTime
            },
            //鼠标拖拽松开时
            changeMusicDuration() {
                if (this.musicAllDuration === 0) return
                this.$refs.audio.currentTime = this.musicDuration
                this.isChange = false
            },
            //获取歌曲url的api
            geturl(id){
                geturl(sessionStorage.getItem('cookie'),id).then(res =>{
                    this.songurl=res.data.data[0].url
                })
            },
            // 播放模式
            nextsong(){
                switch (this.iconNum) {
                    case 1:
                        console.log(this.iconNum);
                        this.$store.commit('songindex')
                        break;
                    case 2:
                        console.log(this.iconNum);
                        if (this.musicAllDuration===this.musicDuration) {
                            this.musicDuration=0
                            this.$refs.audio.play()
                        }
                        break;
                    case 3:
                        this.$store.commit('shuffleindex')
                        break;
                    case 4:
                        if (this.num==this.song.length-1) {
                            this.$refs.audio.pause()
                            console.log(this.iconNum);
                            break;
                        }
                        this.$store.commit('songindex')
                        break;
                    default:
                        break;
                }
            }
        },
        computed:{
            song(){//所有歌曲
                return this.$store.getters.songmutations
            },
            addindex(){
                return this.$store.state.index
            },
            songshuffle(){
                return this.$store.getters.songshuffle
            }
        },
        watch:{
            addindex:function(vla) {
                if (vla!==null) {
                    this.num=vla
                    this.isPlaying=true
                    this.isplay=false
                    if (this.isshuffle) {
                        this.geturl(this.songshuffle[vla].id)
                        this.picUrl=this.songshuffle[vla].al.picUrl
                        this.name=this.songshuffle[vla].name
                        this.arname=this.songshuffle[vla].ar[0].name
                        this.time=this.times(this.songshuffle[vla].dt)
                        this.$store.commit('recordsongid',this.songshuffle[vla].id)
                    }else{
                        this.geturl(this.song[vla].id)
                        this.picUrl=this.song[vla].al.picUrl
                        this.name=this.song[vla].name
                        this.arname=this.song[vla].ar[0].name
                        this.time=this.times(this.song[vla].dt)
                        this.$store.commit('recordsongid',this.song[vla].id)
                    }
                }
            },
            musicDuration:function(params) {
                this.starttime=this.times(params*1000)
            },
            // playerclick:function(vla){
            //     this.isshow=vla
            // }
        },
    }
</script>

<style  scoped>
.musicPlay{
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
.picUrl{
    width: 50px;
    height: 50px;
    margin-right: 13px;
}
.picUrl img{
    width: 50px;
    height: 50px;
}
.arname{
    font-size: 14px;
    font-family: 微软雅黑;
}
#playSlider {
    position: absolute;
    display: flex;
    width: 371px;
    margin-top: -5px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.mode{
    margin-left: 75px;
}
#icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
}
#icon img{
    width: 19px;
    height: 19px;
}
#noicon{
    font-size: 25px;
    margin-right: 29px;
    color: #cecece;
}
.button{
    display: flex;
    height: 36px;
}
.up img{
    width: 19px;
    height: 19px;
}
.centre{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f5f5f5;
    margin-left: 10px;
    margin-right: 10px;
}
.centre:hover{
    background-color: #e5e5e5;
}
.up{
    margin-left: 27px;
}
.up,.down{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
.centre img{
    width: 19px;
    height: 19px;
}
.down img{
    width: 19px;
    height: 19px;
}
.block{
    position: absolute;
    width: 371px;
    margin-left: 50%;
    transform: translateX(-50%);
    top: 60%;
}
.time{
    position: absolute;
    left: 373px;
    bottom: -18px;
    font-size: 1px;
}
.starttime{
    position: absolute;
    right: 376px;
    bottom: -18px;
    font-size: 1px;
}
.block >>>  .el-slider__button {
    width: 0px;
    height: 0px;
    border: 0px solid #cecece; 
}

.block >>> .el-slider__bar{
    background-color: #ff4e4e;
}
.songlist{
    position: absolute;
    right: 0;
    bottom: 59px;
}
.other{
    display: flex;
}
.other .songlistlogo{
    position: absolute;
    right: 20px;
    width: 19px;
    height: 19px;
}
.volume{
    position: absolute;
    right: 70px;
    width: 19px;
    height: 19px;
}
.volumebar{
    max-width: 15px;
    position: relative;
    right: 11px;
}
.volumeslider >>> .el-slider__bar{
    background-color: #ff4e4e;
}
.volumeslider >>> .el-slider__button{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ff4e4e;
    border: 1px solid #ff4e4e;
}
</style>