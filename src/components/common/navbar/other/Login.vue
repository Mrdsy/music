<template>
    <div v-show="true" class="use">
        <div class="conter">
            <div class="logo">
                <img src="@/assets/img/music.png" alt="">
            </div>
            <div class="login">
                <div class="phone">
                    <span>电话：</span>
                    <el-input 
                        v-model="phone" placeholder="请输入电话"
                        prefix-icon="el-icon-phone">
                    </el-input>
                    <div class="point">
                        <span>
                            {{ pointphone }}
                        </span>
                    </div>
                </div>
                <div class="captcha">
                    <span>验证码：</span>
                    <el-input 
                        v-model="captcha" placeholder="请输入验证码"
                        prefix-icon="el-icon-s-order"
                        class="captcha-input">
                    </el-input>
                    <el-button type="text" @click="captchaclick">获取验证码</el-button>
                    <div class="point">
                        <span>
                            {{ captchapoint }}
                        </span>
                    </div>
                </div>
            </div>
            <el-button round @click="loginclick" :disabled="isdisabled">登录</el-button>
        </div>
    </div>
</template>

<script>
import {getcaptcha,getverify,loginCellphoneByCaptcha} from '@/network/netnavbar/navbarhotsearch'
    export default {
        props:{
            
        },
        data() {
            return {
                phone:null,
                captcha:null,
                captchapoint:'',
                pointphone:'',
                isdisabled:false,
                captchadata:null
            }
        },
        methods:{
            captchaclick(){
                let phonereg=/^1[3-9][0-9]{9}$/
                if(this.phone==''){
                    this.pointphone='未填写手机号'
                }else if(phonereg.test(this.phone)){
                    console.log(this.phone);
                    getcaptcha(this.phone).then(res =>{
                        console.log(res);
                    })
                    this.isdisabled=false

                }else{
                    this.pointphone='手机号错误'
                }
            },

            loginclick(){
                if(this.captcha==''){
                    this.captchapoint='未填写验证码'
                }else{
                    getverify(this.phone,this.captcha).then(res =>{
                        console.log(res);
                        this.captchadata=res.data.data
                        if(this.captchadata){
                            loginCellphoneByCaptcha(this.phone,this.captcha).then(res =>{
                                console.log(res);
                            })
                        }
                    })
                    
                }
            },
        }
    }
</script>

<style scoped>
.use{
    position: absolute;
    top: 60px;
    left: 1090px;
    width: 350px;
    height: 430px;
    /* 添加阴影 */
    box-shadow: rgb(0,0,0,.2) 0px 0px 6px;
    border-radius: 10px;
    z-index: 50;
    background-color: #fff;
    text-align: center;
}
.conter{
    margin-top: 50px;
}
.use .logo{
    margin: 0 auto;
}
.login{
    margin-top: 20px;
    margin-bottom: 30px;
}

.captcha span{
    font-size: 12px;
}
.phone{
    margin-bottom: 10px;
}
.el-input{
    width: 200px;
}
.captcha-input{
    width: 136px;
}
.logo {
    width: 42px;
    height: 42px;
    margin: 0px 20px 0px 37px;
    background-color: red;
    text-align: center;
    line-height: 42px;
    border-radius: 25%;
}
.point{
    height: 20px;
    width: 250px;
    margin: 0 auto;
    font-size: 13px;
    color: red;
    text-align:left;
    background-color: pink;
}
</style>