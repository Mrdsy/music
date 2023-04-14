<template>
    <div class="main-tab-bar" @click="tabbarclick" :class="{tabactive : isactive()}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props:{
            path:{
                type:String
            }
        },
        methods:{
            tabbarclick(){
                this.$router.push(this.path).catch(err => err)
            },
            isactive(){
                return this.$route.path.indexOf('/home/'+this.path)==0
                
            }
        },
    }
</script>

<style scoped>
.main-tab-bar{
    height: 31px;
    line-height: 31px;
    margin-right: 20px;
    padding: 0 5px;
    cursor: pointer;
}
.tabactive{
    font-weight: 900;
    border-bottom: 2px solid red;
}
</style>