import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)



const store=new Vuex.Store({
    state:{
        trackIds:[],
        index:null
    },
    mutations:{
        addtrackIds(state,song){
            state.trackIds.push(song)
        },
        addindex(state,ind){
            state.index=ind
        },
        emptysong(state){
            state.trackIds=[]
        }
    },
    getters:{
        songmutations(state){
            return state.trackIds
        }
    }
})
export default store