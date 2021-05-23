<template>
  <div style="background-color:#fff;margin:10px 10% 10px 10%">
    <el-form
      ref="personForm"
      :model="personForm"
      label-width="80px"
      style="padding:20px"
    >
      <!-- <el-form-item label="上传头像">
        <upload-img @upload-url="uploadUrl"/>
      </el-form-item> -->
      <el-form-item label="姓名">
        <el-input v-model="personForm.username" disabled />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          v-model="personForm.age"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input
          type="textarea"
          v-model="personForm.desc"
          style="width:60%"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import UploadImg from '../Component/UploadImg'
import {getInfoData,getSave} from '../../../api/axios'
import Cookies from 'js-cookie'
import qs from 'qs'

export default {
  data () {
    return {
      personForm: {
        username: '',
        age: '',
        desc: ''
      }
    }
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    async getInfo () {
      let name=Cookies.get("username")
      const result=await getInfoData("/getInfo",{params:{username:name}})
      if(result){
        this.personForm=result.data[0]
      }
    },
    async onSubmit () {
      const result=await getSave("/getSave",qs.stringify(this.personForm))
      if(result.data.code===200){
          this.$router.push("/personRoom")
      }
    },
    // uploadUrl(data){
    //   console.log(data);
    // }
  },
  components: {
    // UploadImg
  }
} 
</script>


<style lang="less" scoped>
.el-input {
  width: 30%;
}
</style>