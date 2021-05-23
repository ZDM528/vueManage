<template>
  <div class="login">
    <div class="login-content">
      <el-form class="form" :rules="rules" :model="myForm" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user-solid"
            v-model="myForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            type="password"
            prefix-icon="el-icon-unlock"
            v-model="myForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary"  @click="loginSumbit">登录</el-button>
          <el-button type="primary"  @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import Cookies from 'js-cookie'
import {Login} from '../api/axios'
export default {
  data () {
    return {
      myForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    loginSumbit () {
      this.$refs.loginFormRef.validate( async valid => {
          if(!valid) return 
          // const result=await Login("/login", qs.stringify(this.myForm))  // 使用axios
          const result=await this.$http.post("login", this.myForm) // 使用vue-resource
          if(result.data.code=='200'){
            this.$message.success("登陆成功!")
            Cookies.set("username",this.myForm.username)
            Cookies.set("token",result.data.token)
            this.$router.replace("/home")
          }
          else{
              this.$message.error("用户名或密码不正确！")
          }
  
      })
    }
  }
}

</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
  .login-content {
    position: absolute;
    width: 25vw;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    form {
      margin: 20px;
    }
  }
}
</style>
