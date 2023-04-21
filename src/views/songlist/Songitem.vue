<template>
    <div>
        <div class="songitem" @click="songclick()">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        props:{
            songitem:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            songclick(){
                this.$router.push('/songlist/'+this.songitem.id).catch(err => err)
                this.reload();
        }
        },
    }
</script>

<style scoped>
.songitem{
    height: 36px;
    width: 177px;
    line-height: 36px;
    margin-left: 12px;
    font-size: 14px;
    /* 鼠标悬浮变成小手 */
    cursor: pointer;
}
.songitem:hover{
    background-color:#f6f6f7;
}
.ative{
    font-weight: 900;
    background-color:#f6f6f7;
}

</style>