<template>
  <div style="background-color:#fff;padding:10px">
    <el-row v-for="item in infoList" :key="item.id" style="margin:14px 0;border-bottom:1px solid rgba(0,0,0,.1)">
      <el-col :span="4">
        <img
          :src="item.src"
          style="width:80%;height:20vh"
        />
      </el-col>
      <el-col :span="12">
        <div
          style="font-weight:bolder;font-size:20px"
        >{{item.name}}</div>
        <div>性别：{{item.sex}}</div>
        <div>年龄：{{item.age}}</div>
        <el-row>
          <span>段位等级：</span>
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#ff9900"
          >
          </el-rate>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getAttention } from '../../../api/axios'
export default {
  props: ["authorId"],
  data () {
    return {
      infoList:[]
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {  
        this.getAttention()
      }
    }
  },
  methods: {
    async getAttention () {
      const result = await getAttention('/getAttention', { params: { authorId: this.authorId } })  
        if(result){
            this.infoList=result.data
        }
    }
  }
}
</script>
<style lang="less" scoped>
</style>