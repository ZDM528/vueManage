<template>
    <div>
        <el-tabs v-model="activeName"  style="margin-top:20px;margin-left:10px">
        <el-tab-pane label="关注" name="attention">
            <Attention :authorId="authorId" />
        </el-tab-pane>
        <el-tab-pane label="粉丝" name="love">
            <Love :authorId="authorId"/>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
            <Collect :authorId="authorId"/>
        </el-tab-pane>
        <el-tab-pane label="菜谱" name="foodNum">
            <FoodNum :authorId="authorId"/>
        </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Attention from '../Component/Attention'
import Collect from '../Component/Collect'
import FoodNum from '../Component/FoodNum'
import Love from '../Component/Love'

export default {
    props:["authorId"],
    data() {
      return {
        activeName: 'attention',
        title:'1'
      }
    },
    components:{
        Attention,
        Love,
        Collect,
        FoodNum
    }
}
</script>
<style lang="less" scoped>

</style>