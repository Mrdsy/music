import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)



const store=new Vuex.Store({
    state:{
        trackIds:[]
    },
    mutations:{
        addtrackIds(state,song){
            state.trackIds.push(song)
        },
        emptysong(state){
            state.trackIds=[]
        }
    },
})
export default store