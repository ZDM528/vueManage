<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span style="display:inline-block;margin-left:50%;transform:translateX(-50%)">
          欢迎来到{{authorName}}个人空间
        </span>
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <img
              :src="infoList[0]?infoList[0].src:''"
              style="width:90%;height:30vh"
            />
          </el-col>
          <el-col :span="loginUsername?12:10">
            <div
              v-if="loginUsername !==null"
              style="font-weight:bolder;font-size:20px"
            >{{infoList[0]?infoList[0].username:''}}</div>
            <div
              v-else
              style="font-weight:bolder;font-size:20px"
            >{{authorName}}</div>
            <div>性别：{{infoList[0]?infoList[0].sex:0}}</div>
            <div>年龄：{{infoList[0]?infoList[0].age:0}}</div>
            <el-row>
              <span>段位等级：</span>
              <el-rate
                v-model="score"
                disabled
                show-score
                text-color="#ff9900"
              >
              </el-rate>
            </el-row>
            <el-button
              type="text"
              :disabled="loginUsername===null"
              @click="editPerson"
            >编辑个人资料</el-button>
          </el-col>
          <el-col
            :span="2"
            v-if="loginUsername ===null"
          >
            <el-button
              type="danger"
              class="button"
              @click="payAttention"
            >{{ispayAttention==='true'?"已关注":"+关注"}}</el-button>
            <div>
              <el-button
                type="text"
                v-if="ispayAttention==='true'"
                @click="cancelAttention"
                style="margin-left:13px"
              >取消关注</el-button>
            </div>
            <div></div>
          </el-col>
          <el-col :span="6">
            <div :style="smallCardStyle">
              <el-card class="smallCard">
                <div>
                  <div>关注</div>
                  <div class="card-number">{{infoList[0]?infoList[0].attention:0}}</div>
                </div>
              </el-card>
              <el-card class="smallCard">
                <div>
                  <div>粉丝</div>
                  <div class="card-number">{{infoList[0]?infoList[0].love:0}}</div>
                </div>
              </el-card>
              <el-card class="smallCard">
                <div>
                  <div>收藏</div>
                  <div class="card-number">{{infoList[0]?infoList[0].collect:0}}</div>
                </div>
              </el-card>
              <el-card class="smallCard">
                <div>
                  <div>菜谱</div>
                  <div class="card-number">{{infoList[0]?infoList[0].foodNum:0}}</div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <PersonTab
      :authorId="authorId"
      v-if="loginUsername !==null"
    />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import PersonTab from './Component/PersonTab.vue'
import { getPersonInfo, payAttention, cancelAttention } from '../../api/axios'
export default {
  data () {
    return {
      authorName: null,
      authorId: null,
      loginUsername: null,
      infoList: [],
      score: 0,
      ispayAttention: 'false',
      smallCardStyle: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    }
  },
  methods: {
    async getPersonInfo () {
      const result = await getPersonInfo('/getPersonInfo', { params: { authorId: this.authorId, loginUsername: this.loginUsername } })
      if (result) {
        this.infoList = result.data
        this.score = Number(this.infoList[0].score)
        this.ispayAttention = this.infoList[0].ispayAttention
      }
    },
    async payAttention () {
      const result = await payAttention("/payAttention", { params: { authorId: this.authorId } })
      if (result) {
        this.ispayAttention = 'true'
      }
    },
    async cancelAttention () {
      const result = await cancelAttention("/cancelpayAttention", { params: { authorId: this.authorId } })
      if (result) {
        this.ispayAttention = 'false'
      }
    },
    editPerson () {
      this.$router.push('/editPerson')
    }
  },
  watch: {
    $route: {
      immediate: true,  // 首次进入页面也会监听路由变化
      handler () {
        if (this.$route.query.authorId) {
          this.authorName = this.$route.query.authorName
          this.authorId = this.$route.query.authorId
          this.loginUsername = null
          this.getPersonInfo()
        }
        else {
          this.authorName = '我的'
          this.authorId = null
          this.loginUsername = Cookies.get("username")
          this.getPersonInfo()
        }
      }
    }
  },
  components: {
    PersonTab
  }
}
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.box-card {
  margin-top: 20px;
}
.smallCard {
  width: 30%;
  margin: 10px;
  text-align: center;
  .card-number {
    text-align: center;
    color: red;
  }
}
.el-rate {
  display: inline-block;
}
.button {
  line-height: 0.1;
}
</style>