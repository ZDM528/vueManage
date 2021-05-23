<template>
    <div style="background-color:#fff;padding:20px">
        <span style="text-align:center;display:inline-block;width:100%">暂时没有人关注你哦！快去发布作品把</span>
        <el-button 
        type="danger" 
        style="margin-left:50%;transform:translateX(-50%);margin-top:40px"
        @click="emitFood"
        >发布作品</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        emitFood(){
            this.$router.push('/emitFood')
        }
    }   
}
</script>
<style lang="less" scoped>

</style>