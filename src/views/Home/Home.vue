<template>
  <div style="background-color:#fae8c8;height:100%">
    <div class="header">
      <!-- <div v-for="(value,key,index) in obj" :key="index">
        <span>{{value}}</span>
      </div>
      <div v-for="(item,index) in arr" :key="index">
        <span>{{item}}</span>
      </div> -->
      <!-- <button @click="addObjB">添加obj.b</button> -->
      <span>美食大全</span>
      <el-button
        type="text"
        class="button"
        @click="dialogVisible = true"
      >
        退出
      </el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="25%"
      >
        <span style="margin-left:20px">确定退出吗?</span>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="suit"
          >确 定</el-button>
        </span>
      </el-dialog>
      <span>欢迎：{{username}}</span>
    </div>
    <el-menu
      :default-active="activeKey"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#000"
      active-text-color="#ffd04b"
      style="border-shadow:10px 0px 10px rgba(0,0,0,1)"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/mainPage">首页</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">菜谱大全</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="/personRoom">个人空间</el-menu-item>
    </el-menu>
    <keep-alive include="MainPage">
      <router-view style="padding:0 10%"></router-view>
    </keep-alive>

  </div>

</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      activeKey: '/mainPage',
      username: '',
      dialogVisible: false,
      obj:{
        a:1
      },
      arr:['arr1']
    }
  },
  methods: {
    suit () {
      this.dialogVisible = false
      Cookies.remove('token')
      this.$router.push("/login")
    },
    handleSelect (key) {
      this.activeKey = key
      window.sessionStorage.setItem("activeKey", this.activeKey)
    },
    // addObjB(){
    //  this.$set(this.obj,'b','2')
    //  this.arr.push("arr2")
    //  console.log(this.obj)
    //  console.log(this.arr);
    // }
  },
  created () {
    this.username = Cookies.get("username")
    this.activeKey = window.sessionStorage.getItem("activeKey")
  }
}
</script>
<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.header {
  width: 100%;
  height: 100px;
  background: #ad2e30;
  > span:first-child {
    margin-left: 50%;
    display: inline-block;
    transform: translateX(-50%);
    line-height: 100px;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    font-family: '微软雅黑';
  }
  > span:nth-of-type(2) {
    float: right;
    line-height: 100px;
    color: #fff;
  }
  .button {
    float: right;
    margin: -12px 3%;
    line-height: 100px;
  }
}

.el-menu-demo {
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.4);
  padding-left: 20%;
  padding-right: 20%;
  .el-menu-item:nth-of-type(3) {
    float: right;
  }
}
</style>