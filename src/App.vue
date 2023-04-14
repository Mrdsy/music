<template>
  <div id="app">
    <el-container class="app">
    <!-- 置顶导航 -->
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <!-- 侧边栏，和内容 -->
      <el-container>
        <el-aside :width="wth">
          <main-aside></main-aside>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
      <!-- 底部 -->
        <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import NavBar from './components/common/navbar/NavBar.vue';
import MainAside from './components/content/MainAside/MainAside.vue';
export default {
  name: 'App',
  data() {
    return {
      wth:'200px',
    }
  },
  components: {
    NavBar,
    MainAside,
  }
}
</script>

<style>
@import '@/assets/css/base.css';
.app{
  position: relative;
  height: 100vh;
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
  background-color: blue;
}
</style>
