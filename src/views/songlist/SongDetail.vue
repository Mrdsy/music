<template>
    <div class="songdetail">
        <div class="songimg">
            <img :src="songdata.coverImgUrl" alt="">
        </div>
        <div class="concer">
            <!-- <div class="types">歌单</div> -->
            <div class="title">
                <div class="types">歌单</div>
                <h2>{{ songdata.name }}</h2>
            </div>
            <div class="user">
                <img :src="songdata.creator.avatarUrl" alt="">
                <span class="username">{{songdata.creator.nickname}}</span>
                <span class="usertime">{{ songdata.createTime | showDate }}创建</span>
            </div>
            <div class="function">
                <div class="play">
                    <i class="el-icon-caret-right"></i>
                    <div>播放全部</div>
                </div>
                <i class="el-icon-plus"></i>
                <div class="collect">
                    <i class="el-icon-folder-add"></i>
                    <div>收藏({{ Count(songdata.subscribedCount) }})</div>
                </div>
                <div class="share">
                    <i class="el-icon-share"></i>
                    <div>分享({{ Count(songdata.shareCount) }})</div>
                </div>
            </div>
            <div class="count">

                <p class="count-label" >
                    标签:
                    <span v-for="item in songdata.tags">
                        <span class="symbol">/</span>
                        <span class="conter"> {{ item }}</span>
                    </span>
                </p>
            </div>
            <div class="data">
                <p>
                    <span class="left">
                        歌曲：{{ Count(songdata.trackCount) }}
                    </span>
                    <span>
                        播放：{{ Count(songdata.playCount) }}
                    </span>
                </p>
            </div>
            <div class="count-introduction" v-if="songdata.description!=null">
                <input type="checkbox" class="dianji">
                <p>简介：{{ songdata.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/components/common/time/index'
    export default {
        name:'SongDetail',
        props:{
            songdata:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        
        data() {
            return {
                path:'',
                tagslength:[]
            }
        },
        created(){
            
        },
        mounted(){

        },
        filters:{
            showDate(value){
                const date = new Date(value);
                return formatDate(date, 'yyyy-MM-dd')
            }
        },
        methods:{
            Count(playCount){
                if(playCount / 10000 < 1){
                return playCount
                }else{
                const wan = playCount /  10000  
                return Math.floor(wan)+ "万";
                }
            }
        },
    }
</script>

<style scoped>
.songdetail{
    display: flex;
    width: 100%;
}
.songimg img{
    width: 183px;
    height: 183px;
    border-radius: 5px;
}
.concer{
    margin-top: 3px;
    margin-left: 18px;
}
.title{
    height: 20px;
    display: flex;
    line-height: 20px;
}

.types{
    width: 35px;
    height: 20px;
    border: 1px solid red;
    font-size: 14px;
    text-align: center;
    border-radius: 2px;
    color: red;
    margin-right: 12px;
}
.user{
    margin-top: 12px;
    height: 25px;
    line-height: 25px;
    margin-bottom: 13px;
}
.user img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 8px;
}
.username{
    margin-right: 8px;
    font-size: 14px;
    color: #507baf;
}
.usertime{
    font-size: 14px;
}
.function{
    display: flex;
}
.play{
    display: flex;
    height: 31px;
    width: 100px;
    border-radius: 30px 0 0 30px;
    background-color: red;
    color: aliceblue;
    font-size: 14px;
    line-height: 31px;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 8px;
}
.el-icon-caret-right{
    font-size: 20px;
    line-height: 31px;
    margin-right: 3px;
}
.el-icon-plus{
    height: 31px;
    width: 37px;
    background-color: red;
    color: aliceblue;
    line-height: 31px;
    text-align: center;
    font-size: 20px;
    border-radius: 0 30px 30px 0;
    border-left: 1px solid #ee5454;
    cursor: pointer;
    margin-right: 11px;
}
.play:hover{
    background-color: #bd413a;

}
.el-icon-plus:hover{
    background-color: #bd413a;
}
.collect{
    display: flex;
    width: 110px;
    height: 31px;
    border-radius:30px;
    border: 1px solid #d9d9d9;
    margin-right: 11px;
    font-size: 14px;
    line-height: 31px;
    justify-content: center;
    cursor: pointer;

}
.el-icon-folder-add{
    font-size: 20px;
    line-height: 31px;
    margin-right: 3px;
}
.share{
    display: flex;
    width: 110px;
    height: 31px;
    border-radius:30px;
    border: 1px solid #d9d9d9;
    margin-right: 11px;
    font-size: 14px;
    line-height: 31px;
    justify-content: center;
    cursor: pointer;
}
.el-icon-share{
    font-size: 20px;
    line-height: 31px;
    margin-right: 3px;
}
.count , .data {
    font-size: 14px;
    margin-bottom: 6px;
}
.conter{
    color: #507baf;
    cursor: pointer;
}
.data .left{
    margin-right: 3px;
}
/* .count-introduction{
    position: relative;
    font-size: 14px;
    white-space: pre-line;
    display: flex;
} */
.count-introduction{
  white-space: pre-line;
  display: flex;
  position: relative;
  width: 100vh;
}

.dianji{
  position: absolute;
  right: 0px;
}
.count-introduction p{
  height: 17px;
  width: 660px;
  font-size: 14px;
  overflow: hidden;
}

input:checked~p{
  height: 100%;
  overflow: visible;
}
.collect:hover{
    background-color: #F5F5F5;
}
.share:hover{
    background-color: #F5F5F5;
}
</style>