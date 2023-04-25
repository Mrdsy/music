<template>
    <div class="navbar">
    <!-- logo -->
        <div class="logo">
            <img src="@/assets/img/music.png" alt="">
        </div>
        <span class="logoname">网易云音乐</span>
        <div class="left" @click="left()"></div>
        <div class="right" @click="right()"></div>
        <!-- 搜索 -->
        <el-input 
        ref="input"
        v-model="input" placeholder="请输入歌曲名或歌手名"
        prefix-icon="el-icon-search"
        @focus="infocus"
        @blur="inblur">
        </el-input>
        <!-- 点击搜索后的效果 --> 
        <transition name="fade">
            <div v-show="isinput" class="hotsearch">
                <div class="hot-text">热搜榜</div>
                <ul v-for="(item,index) in hounum">
                    <li class="hot"
                        @mouseover="mouseover(index)"
                        @mouseleave="mouseLeave"
                        :class="{active: index===hotin}">
                        <div :class="{ranking:index===0 | index===1 | index===2}">{{ index+1 }}</div>
                        <div class="hotmusic">
                            <div>
                                <span class="searchWord" :class="{hotmusicnob:index===0 | index===1 | index===2}">{{ item.searchWord}}</span>
                                <span v-if="index===0">
                                    <img :src="item.iconUrl" alt="">
                                </span>
                                <span class="score">{{ item.score }}</span>
                            </div>
                            <div class="content">{{ item.content }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
        <!-- 登入界面 -->

        <div class="userlogo" @click="userlogin" >
            <el-avatar class="el-avatar" shape="circle"  fit="fit" :src="avatarUrl"></el-avatar>
            <span>{{nickname}}</span>
        </div>
        <transition>
        <div v-if="isshow"  >
            <div v-if="isLogin">
                <qrimgs @useclick="useclick" @usedata="usedata(arguments)" ></qrimgs>
            </div>
            <div v-if="isnoLogin">
                <exit @outlogin="outlogin"></exit>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
import {gethotsearch} from '@/network/netnavbar/navbarhotsearch'
import Login from "./other/Login.vue"
import qrimgs from './other/qrimgs.vue'
import Exit from './other/Exit.vue'
    export default {
        inject:['reload'],
        data() {
            return {
                input:'',
                isinput:false,
                active:'',
                hounum:[],
                hotin:null,
                isshow:false,
                nickname:'登录',
                avatarUrl:'',
                isdisabled:false,
                isLogin:true,
                isnoLogin:false
            }
        },
        components:{
            Login,
            qrimgs,
            Exit
        },
        created(){
            gethotsearch().then(res => {
                const data=res.data
                this.hounum=data.data
            })
            if(sessionStorage.getItem("cookie")){
                this.nickname=sessionStorage.getItem("nickname")
                this.avatarUrl=sessionStorage.getItem("avatarUrl")
                this.isLogin=false
                this.isnoLogin=true
            }
            
        },
        watch:{

        },
        methods:{
            infocus(){
                this.isinput=true
            },
            inblur(){
                this.isinput=false
            },
            mouseover(index){
            for (let i = 0; i < this.hounum.length; i++) {
                if(index===i){
                    this.hotin=i
                }
            }
            },
            mouseLeave(){
                this.hotin = null;
            },
            useclick(){
                this.isshow=false
            },

            userlogin(){
                this.isshow = true
            },
            left(){
                this.$router.go(-1)
                this.reload();
            },
            right(){
                this.$router.go(+1)
                this.reload();
            },
            outlogin(){
                this.isshow=false
            }
        }
    }
</script>

<style  scoped>
.navbar{
    /* align-items纵轴居中，配合display: flex使用 */
    position: relative;
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    background-color: #c62f2f;
}
.logo {
    width: 42px;
    height: 42px;
    background-color: #ff0000;
    margin: 0px 20px 0px 37px;
    text-align: center;
    line-height: 42px;
    border-radius: 25%;
}
.logoname{
    color: aliceblue;
    font-size: 17px;
    margin-right: 45px;
}
.left,.right{
    width: 25px;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50px;
}
.left{
    margin-right: 15px;
    background-image: url('@/assets/img/sprites1\ -\ 副本.png');
    background-position: -306px -273px
}
.right{
    background-image: url('@/assets/img/sprites.png');
    background-position: -70px -103px;
    margin-right: 26px;
}
.el-input{
    width: 200px;
    opacity: 0.5;
}
.userlogo{
    display: flex;
    align-items: center;
    position: absolute;
    right: 250px;
    cursor: pointer;
}
.userlogo span{
    color: aliceblue;
    font-size: 17px;
    margin-right: 5px;
}
.hotsearch{
    position: absolute;
    top: 60px;
    left: 250px;
    width: 350px;
    height: 430px;
    /* 添加阴影 */
    box-shadow: rgb(0,0,0,.2) 0px 0px 6px;
    border-radius: 10px;
    overflow: hidden;
    overflow-y:scroll;
    z-index: 50;
    background-color: #fff;
}
/* 滚动条整体部分，可以设置宽度啥的 */
.hotsearch::-webkit-scrollbar{
    width: 5px;
}
/* 滚动的滑块 */
.hotsearch::-webkit-scrollbar-thumb{
    background-color: #BEBEBE;
    border-radius: 20px;
}
/* 配合transition标签 */
/* -enter-active进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间 */
/* -leave-active离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间 */
.fade-enter-active,
.fade-leave-active {
    /* css动画 */
  transition: opacity 0.2s ease;
}
/* -enter-from进入动画的起始状态。在元素插入之前添加 */
/* -leave-to离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 v-leave-from 被移除的同时) */
.fade-enter-from,
.fade-leave-to {
    transition: opacity 0.2s ease;
}
.hot-text{
    display: flex;
    height: 50px;
    align-items: center;
    font-size: 14px;
    padding-left: 25px;
}
.hotsearch .hot{
    display: flex;
    height: 46px;
    width: 350px;
    align-items: center;
    padding-left: 25px;
}
.active{
    background-color:#F5F5F5;

}
.hotmusic{
    padding-left: 25px;
}
.content{
    font-size: 9px;
    color: #BEBEBE;
}
.searchWord{
    font-size: 14px;
}
.score{
    font-size: 5px;
    color: #BEBEBE;
    margin-left: 3px;
}
.ranking{
    color: #ff0000;
}
.hotmusicnob{
    font-weight:900;
}
.hotmusic img{
    height: 14px;
    margin-left: 4px;
}

</style>