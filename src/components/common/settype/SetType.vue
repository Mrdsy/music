<template>
    <div class="settype">
        <ul>
            <li v-for="item in settype">
                <img :src="item.picUrl" alt="">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'SetType',
        props:{
            settype:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.settype{
    /* float: right; */
    width: 1100px;
    /* height: 524px; */
    background-color:green;
}
.settype li{
    float: left;
    width: 205px;
    height: 253px;
    margin-right: 18.7px;
    margin-top: 19px;
}
img{
    width: 205px;
    height: 205px;
    border-radius: 10px;
}
.settype li:nth-child(5n){
    margin-right: 0px;
}

.settype li:nth-child(-n+5){
    margin-top: 0;
}
</style>