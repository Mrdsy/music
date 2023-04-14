<template>
    <el-carousel :interval="4000" type="card" height="198px" class="mains">
        <el-carousel-item v-for="item in banners" :key="item.imageUrl">
            <img :src="item.imageUrl" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        props:{
            banners:{
                type:Array,
                default(){
                    return []
                }
            }
        }
        
    }
</script>

<style scoped>
.el-carousel__item{
    border-radius: 10px;
    /* width: 539px; */
}
.el-carousel__item img {
    height: 198px;
    width: 550px;
}
.mains >>>.el-carousel__indicator button{
    width: 6px;
    height: 6px;
    background: #dcdcdc;
    border-radius: 50%;
    opacity: 0.5;
}
.mains >>>.el-carousel__indicator--horizontal.is-active button{
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 50%;
    opacity: 1;
}

</style>