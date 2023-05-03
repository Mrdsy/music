<template>
    <div class="songsheet">
        <h3>当前歌单</h3>
        <div class="songdata">
            <span class="data">{{$store.getters.songlength}}首</span>
            <span class="empty">全部清除</span>
        </div>
        
        <div class="songlist">
            <ul v-for="(item,index) in song">
                <li id="song" @click="onsong(item,index)" :class="{active : item.id===$store.getters.viewsongid}">
                    <div class="current">
                        <img src="@/assets/img/暂停b.png" alt="" v-if="item.id===$store.getters.viewsongid">
                    </div>
                    <div class="title">
                        {{item.name}}
                        <img src="@/assets/img/vip-l.png" alt="" v-if="item.fee===1">
                        <img src="@/assets/img/MV-a.png" alt="" v-if="item.mv!==0">
                    </div>
                    <div class="singer">{{item.ar[0].name}}</div>
                    <div class="time">{{time(item.dt)}}</div>
                    <div>
                    </div>
                </li>
            </ul>
        </div>
        
    </div>

</template>

<script>
import {formatDuration} from '@/components/common/time'
    export default {
        data() {
            return {
                current:false
            }
        },
        methods:{
            time(data){
                return formatDuration(data)
            },
            onsong(item,index){
               this.$store.commit('addindex',index)
                this.$store.commit('recordsongid',item.id)
                console.log(item);
            }
        },
       computed: {
        song(){//所有歌曲
                return this.$store.getters.songmutations
            },
       },
    }
</script>

<style scoped>
.songsheet{
    position: relative;
    width: 420px;
    height: 1040px;
    box-shadow: rgb(0,0,0,.2) 0px 0px 6px;
    border-radius: 10px;
    background-color: #fff;

}

h3{
    position: absolute;
    margin-top: 16px;
    margin-left: 21px;
}
.songdata{
    position: absolute;
    margin-top: 40px;
    height: 43px;
    line-height: 43px;
    margin-left: 20px;
    font-size: 14px;
}
.data{
    color: #cecece;
}
.empty{
    margin-left: 280px;
    color: #5a7cab;
}
#song{
    display: flex;
    position: relative;
    height: 32px;
    /* margin-left: 20px; */
    background-color: #fff;
    font-size: 13px;
    line-height: 32px;
    cursor: pointer;
}
.songlist{
    position: absolute;
    margin-top: 80px;
    width: 419px;
    overflow: hidden;
    overflow-y:scroll;
}
.songlist::-webkit-scrollbar{
    width: 5px;
}
/* 滚动的滑块 */
.songlist::-webkit-scrollbar-thumb{
    background-color: #BEBEBE;
    border-radius: 20px;
}
.singer{
    position: absolute;
    left: 192px;
}
.time{
    position: absolute;
    left: 350px;
    color: #e8e8e8;
}
.active{
    color: red;
}
.current{
    width: 20px;
    line-height: 32px;
}
.current img{
    width: 10px;
    height: 10px;
    margin-left: 5px;
}
.title{
    width: 170px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.fade-enter-active,
.fade-leave-active {
    /* css动画 */
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    transition: opacity 0.2s ease;
}
</style>