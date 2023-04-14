<template>
    <div class="use">
        <div class="top">
         <div class="topp">
              登录
           <i class="el-icon-close" @click="useclick"></i>
         </div>
     </div>
     <div class="mid">
     <div class="left">
         <img src="
         https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" alt="">
     </div>
     <div class="right">
         <div class="rightt">扫码登陆</div>
         <img :src="qrimgs" alt="" style="width:200px;height:200px">
<div class="rightb">使用&nbsp;<a href="https://music.163.com/#/download" style="color:skyblue">网易云app</a>
    扫码登录</div>
     </div>
       </div>
 </div>
</template>

<script>
import {getkey,getceate,getcheck,getStatus} from '@/network/netnavbar/navbarhotsearch'
    export default {
        props:{
            show:{
                type:Number
            }
        },
        data() {
            return {
                unikey: '',//key
                qrurl: '',
                qrimgs: '',//二维码图片
                qrCheckData: {},//状态
                isLogin: false,//是否登录
                isshow:0,
                status:{}
            }
        },
        mounted() {
            this.getkey()
            this.$bus.$on('userlogin',() => {
                this.isshow=0
                console.log(this.isshow);
            })
            
        },
        created(){
        //    this.getkey()
        },
        methods:{
            getkey(){
                getkey().then(res=>{
                    this.unikey=res.data.data.unikey
                    this.getceate(this.unikey)
                })
            },
            // 获取二维码
            getceate(key){
                getceate(key).then(res => {
                    this.qrimgs=res.data.data.qrimg
                    this.getcheck()
                })
            },
            // 获取二维码的状态
            getcheck(){
                getcheck(this.unikey).then(res=>{
                    this.qrCheckData=res.data
                    sessionStorage.setItem('cookie', res.data.cookie);
                    this.isLogin = true
                })
            },
            getStatus(){
                getStatus(sessionStorage.getItem('cookie')).then(res =>{
                    sessionStorage.getItem('cookie')
                    sessionStorage.setItem('nickname', res.data.data.profile.nickname);
                    sessionStorage.setItem('backgroundUrl', res.data.data.profile.avatarUrl);
                })
            },
            useclick(){
                this.$emit("useclick")
                this.isshow=1
            },

        },
        watch:{
            isLogin:function(){
                let times=setInterval(async () => {
                    if(this.isshow==0){
                        console.log('程序运行中');
                            this.getcheck()
                        let code=this.qrCheckData.code
                        if (code === 801) {
                            console.log('等待扫码');
                        } else if (code === 802) {
                            console.log('待确认');
                        } else if (code === 803){
                            console.log('授权成功');
                            this.getStatus()
                            this.$emit("usedata",sessionStorage.getItem("nickname"),
                            sessionStorage.getItem("backgroundUrl"))
                            clearInterval(times)
                        }
                    }else if(this.isshow==1){
                        console.log("停止");
                        clearInterval(times)
                    }
                        
 
                },5000)
            }
        }
    }
</script>

<style scoped>
.use{
    position: absolute;
    top: 60px;
    left: 1090px;
    width: 530px;
    height: 350px;
    /* 添加阴影 */
    box-shadow: rgb(0,0,0,.2) 0px 0px 6px;
    border-radius: 10px;
    z-index: 50;
    background-color: #fff;
    text-align: center;
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
.mid{
    padding: 30px;
      display: flex;
}
.left img{
    width: 125px;
    height: 220px;
    margin-left: 20px;

}
.right{
       margin-left: 20px;
        display: flex;
        align-content: space-between;
        flex-direction: column
}
.rightt{
    margin-left: 5px;
    font-size: 18px;
    font-weight: 500;
    color: #333;
    /* // width: 200px;
    // height: 24px; */
    color: rgba(0, 0, 0, 0.4);
   
}
.rightb{
margin-left: 15px;
}
.but{
  position: absolute;
  bottom: 0;
  margin-left: 10px;
}
.mid{
  margin-left: 50px;
}
</style>