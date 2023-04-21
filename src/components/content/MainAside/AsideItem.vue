<template>
    <div class="asideitem" @click="onaside" :class="{ative:isAtive()}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props:{
            path:{
                type:String
            }
        },
        methods:{
            onaside(){
                this.$router.push(this.path).catch(err => err)
            },
            isAtive(){
                return this.$route.path.indexOf(this.path)==0
            },
        },
    }
</script>

<style scoped>
.asideitem{
    height: 36px;
    width: 177px;
    line-height: 36px;
    margin-left: 12px;
    font-size: 14px;
    /* 鼠标悬浮变成小手 */
    cursor: pointer;
}
.asideitem:hover{
    background-color:#f6f6f7;
}
.ative{
    font-weight: 900;
    background-color:#f6f6f7;
}
</style>