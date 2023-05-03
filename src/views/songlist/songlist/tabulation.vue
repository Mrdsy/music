<template>
    <div>
        <div class="column">
            <div class="operate">操作</div>
            <div class="title">标题</div>
            <div class="singer">歌手</div>
            <div class="album">专辑</div>
            <div class="time">时间</div>
        </div>
       
        <div class="song">
            <ul>
                <li class="song-conter" v-for=" ( item , index) in song" @dblclick="songclick(index)"
                :class="{active : item.id===$store.getters.viewsongid}">
                    <div class="num">
                        <div v-if="item.id!=$store.getters.viewsongid">
                            {{ index+1 }}
                        </div>
                        <img src="@/assets/img/扬声器.png" alt="" v-if="item.id===$store.getters.viewsongid">
                    </div>
                    <div class="title">{{item.name}}</div>
                    <div class="singer">{{item.ar[0].name}}</div>
                    <div class="album">{{ item.al.name }}</div>
                    <div class="time">{{time(item.dt)}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getsong} from '@/network/home/nothome'
import {formatDuration} from '@/components/common/time'
    export default {
        data() {
            return {
                contersong:null,
                id:[],
                song:[],
                isstaroff:null,
                isstaron:null
            }
        },
        props:{
            songid:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        created() {
        },
       methods:{
            getPhotoList (res) {
                for (const iterator of res) {
                    getsong(iterator.id).then(res =>{
                        this.song.push(res.data.songs[0])
                    })
                }
            },
            // 获得歌曲的详细信息
            getsong(id){
                getsong(id).then(res =>{
                    console.log(res);
                })
            },

            time(data){
                return formatDuration(data)
            },

            songclick(index){
               this.$store.commit('emptysong')
               this.$store.commit('addindex',index)
               for (const iterator of this.song) {
                this.$store.commit('addtrackIds',iterator)
               }
            },
       },
       watch:{
        songid:function(newData){
            this.id=newData
            this.getPhotoList(this.id)
        }
       },
        computed:{
            // recordsongid(){
            //     return this.$store.commit('')
            // }
        }
    }
</script>

<style scoped>
.column{
    position: relative;
    display: flex;
    width: 100%;
    height: 33px;
    font-size: 13px;
    line-height: 33px;
    color: #888888;
    /* background-color: pink; */
}

.operate{
    position: absolute;
    left: 56px;
}
.title{
    position: absolute;
    left: 114px;
}
.singer{
    position: absolute;
    left: 1060px;
}
.album{
    position: absolute;
    left: 1508px;
}
.time{
    position: absolute;
    left: 2117px;
}
.song-conter{
    position: relative;
    display: flex;
    width: 100%;
    height: 33px;
    font-size: 13px;
    line-height: 33px;
    align-items: center;
    color: #888888;
    /* background-color: pink; */
}
.num{
    position: absolute;
    left: 28px;

}
.el-icon-star-off{
    position: absolute;
    left: 60px;
    cursor: pointer;
    font-size: 13px;
    z-index: 3;
}
.el-icon-star-on{
    position: absolute;
    left: 60px;
    cursor: pointer;
    z-index: 3;
}
.active{
    color: red;
}
.num img{
    width: 14px;
    height: 14px;
    margin-bottom: 3px;
}
</style>