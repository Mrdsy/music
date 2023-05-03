<template>
  <div id="app">
    <el-container class="app">
    <!-- 置顶导航 -->
      <el-header @click.native="listclick">
        <nav-bar></nav-bar>
      </el-header>
      <!-- 侧边栏，和内容 -->
      <el-container>
        <el-aside :width="wth" @click.native="listclick">
          <main-aside></main-aside>
        </el-aside>

        <el-main @click.native="listclick">
            <router-view v-if="isRouterAlive"/>
        </el-main>

      </el-container>
      <!-- 底部 -->
        <el-footer height="80px">
          <musicplayer :playerclick="playerclick" @click.native="playclick"></musicplayer>
        </el-footer>
    </el-container>
  </div>
</template>

<script>
import NavBar from './components/common/navbar/NavBar.vue';
import MainAside from './components/content/MainAside/MainAside.vue';
import musicplayer from './components/content/footer/musicplayer.vue';
export default {
  name: 'App',
  data() {
    return {
      wth:'200px',
      he:'70px',
      isRouterAlive:true,
      playerclick:true
    }
  },
  provide(){
      return{
        reload:this.reload
      }
    },
  components: {
    NavBar,
    MainAside,
    musicplayer
  },
  methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },
      listclick(){
        this.playerclick=false
      },
      playclick(){
        this.playerclick=true
      }
    },
}
</script>

<style>
@import '@/assets/css/base.css';
.app{
  position: relative;
  /* height: 100vh; */
}
.el-header {
  padding: 0 0px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.el-aside{
  border-right: 1px solid #DCDCDC;
}
.el-footer{
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top:2px solid #afafaf;
  z-index:20;
}
</style>
