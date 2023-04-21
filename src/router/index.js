import Vue from "vue";
import VueRouter from "vue-router";

const Home = () =>import('../views/home/Home.vue')
const recommend= () => import('../views/home/ability/recommend.vue')
const exclusive= () => import('../views/home/ability/exclusive.vue')
const SongSheet= () => import('../views/home/ability/SongSheet.vue')
const ranking= () => import('../views/home/ability/ranking.vue')
const singer= () => import('../views/home/ability/singer.vue')
const newmusic= () => import('../views/home/ability/newmusic.vue')

const Podcast = () =>import('../views/podcast/Podcast.vue')
const Songlist =()=> import('../views/songlist/Songlist.vue')

Vue.use(VueRouter)
const routes=[
    {
        path:'/',
        redirect:'/home',
        
    },
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'/',
                redirect:'recommend',
            },
            {
                path:'recommend',
                component:recommend,
            },
            {
                path:'exclusive',
                component:exclusive,
            },
            {
                path:'songsheet',
                component:SongSheet,
            },
            {
                path:'ranking',
                component:ranking,
            },
            {
                path:'singer',
                component:singer,
            },
            {
                path:'newmusic',
                component:newmusic,
            }
        ]
    },
    {
        path:'/podcast',
        component:Podcast,
    },
    {
        path:'/songlist/:id',
        component:Songlist,
    }
]
const router=new VueRouter({
    routes,
    mode:'history'
})

export default router