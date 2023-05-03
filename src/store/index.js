import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)



const store=new Vuex.Store({
    state:{
        trackIds:[],
        randomarry:[],
        index:null,
        songid:null
    },
    mutations:{
        // 歌单的全部歌曲
        addtrackIds(state,song){
            state.trackIds.push(song)
        },
        //歌曲下标
        addindex(state,ind){
            state.index=ind
        },
        //当播放到最后一首回到第一首
        songindex(state){
            state.index++
            if (state.index>=state.trackIds.length) {
                state.index=0
            }
        },
        //第一首歌倒退到最后一首歌
        songleft(state){
            state.index--
            if (state.index<0) {
                state.index=state.trackIds.length-1
            }
        },
        // 随机播放
        shuffle(state,random){
            state.randomarry=random
        },
        // 清空随机播放
        emptyshuffle(state){
            state.randomarry=[]
        },
        // 随机播放到最后一首回到第一首
        shuffleindex(state){
            state.index++
            if (state.index>=state.randomarry.length) {
                state.index=0
            }
        },
        //随机播放第一首歌倒退到最后一首歌
        shuffleleft(state){
            state.index--
            if (state.index<0) {
                state.index=state.randomarry.length-1
            }
        },
        recordsongid(state,id){
            state.songid=id
        },
        // 清空歌曲
        emptysong(state){
            state.trackIds=[]
        }
    },
    getters:{
        songmutations(state){
            return state.trackIds
        },
        songlength(state){
            return state.trackIds.length
        },
        songshuffle(state){
            return state.randomarry
        },
        viewsongid(state){
            return state.songid
        }
    }
})
export default store