<template>
    <div class="recommend">
        <div class="concer">
            <div>
                <Carousel :banners="banners"></Carousel>
            </div>
            <div class="bgm">
                <div class="recommend-title" @click="bgmclick">推荐歌单
                    <i class="el-icon-arrow-right"></i>
                </div>
                <set-type :settype="settype"></set-type>
            </div>
        </div>
    </div>
</template>

<script>
import Carousel from '@/components/common/carousel/Carousel.vue';
import SetType from '@/components/common/settype/SetType.vue'
import { getbanner,getpersonalized,getplaylist} from '@/network/home/nothome';
    export default {
        name:"recommend",
        components:{
            Carousel,
            SetType
        },
        data() {
            return {
                banners:[],
                settype:[],

            }
        },
        created(){
            getbanner().then(res => {
                this.banners=res.data.banners
            })
            getpersonalized().then(res =>{
                this.settype=res.data.result
                console.log(this.settype);
            })
            
        },
        mounted(){
            
        },
        methods:{
            bgmclick(){
                this.$router.push('songsheet')
            },
            getplaylist(userid){
                getplaylist(userid).then(res=>{
                    console.log(res);
                })
            }
        },
    }
</script>

<style scoped>
/* .recommend{
    text-align: center;

} */
.concer{
    overflow: hidden;
    height: 1155px;
    width: 1100px;
    background-color: pink;
    margin: 0 auto;
    overflow-y:scroll;
}
.recommend-title{
    font-weight: 900;
    cursor: pointer;
    margin-bottom: 11px;
}

.concer::-webkit-scrollbar{
    width: 5px;
}
/* 滚动的滑块 */
.concer::-webkit-scrollbar-thumb{
    background-color: #BEBEBE;
    border-radius: 20px;
}
</style>