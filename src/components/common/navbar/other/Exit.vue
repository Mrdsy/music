<template>
    <div class="nologin">
        <div class="top">
            <div class="topp">
                退出登录
                <i class="el-icon-close" @click="outclick"></i>
            </div>
        </div>
        <ul>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li>1111</li>
            <li @click="noclick">
                <i class="el-icon-circle-close"></i>
                退出登录
            </li>
        </ul>
    </div>
</template>

<script>
import {logout} from '@/network/netnavbar/navbarhotsearch'
    export default {
        data() {
            return {
                isshow:0,
            }
        },
        methods:{
            outclick(){
                // console.log(1);
                this.$emit("outlogin")
            },
            noclick(){
                logout().then(res=>{
                    console.log(res);
                    sessionStorage.removeItem('cookie')
                    sessionStorage.removeItem('nickname')
                    sessionStorage.removeItem('avatarUrl')
                    this.$router.go(0)
                })
            }
        }
    }
</script>

<style scoped>
.nologin{
    position: absolute;
    top: 60px;
    left: 1090px;
    width: 530px;
    height: 350px;
    box-shadow: rgb(0,0,0,.2) 0px 0px 6px;
    border-radius: 10px;
    z-index: 60;
    background-color: #fff;
    padding: 0 auto;
}
.top{
    width: 530px;
    height: 50px;
    background-color: rgb(49, 35, 35);
  color:white
}
.topp{
    font-weight: bold;
    margin-left: 18px;
    margin-right:18px ;
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
}
li{
    width: 100%;
    height: 30px;
    border-top: 1px solid #BEBEBE;
    line-height: 30px;
    padding-left: 4px;
}
li:hover{
    background-color: #f6f6f7;
    cursor: pointer;
}
</style>