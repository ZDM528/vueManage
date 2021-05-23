<template>
  <div style="heigth:100%;background-color:#fae8c8">
    <el-carousel
      :interval="4000"
      type="card"
      height="400px"
      style="width:60%"
    >
      <el-carousel-item
        v-for="item in carouselList"
        :key="item.id"
      >
        <!-- <router-link :to="{path:'CarouselDetail/12'}">  -->
          <img
            :src="item.url"
            :key="item.id"
            style="width:100%"
          />
        <!-- </router-link> -->
      </el-carousel-item>
    </el-carousel>
    <el-row
      ref="cardRef"
    >
      <el-col
        style="width:20%"
        v-for="(item,index) in foodList"
        :key="index"
        :offset="1"
      >
        <el-card :body-style="{ padding: '2px' }">
          <img
            v-lazy="item.src"
            class="image"
          >
          <div style="padding: 14px;">
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{item.title}}</span>
            <div>
              <span >作者:{{item.name}}</span>
              <el-button
                style="margin-left:50px"
                type="text"
                @click="authorRoom(item.id,item.name)"
              >个人空间</el-button>
              
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div
      v-loading="isLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
  </div>
</template>
<script>
import {getFoodList,getCarouselList} from '../../../api/axios'
export default {
  name:'MainPage',
  data () {
    return {
      carouselList: [],
      foodList: [],
      page: 1,
      isLoading: true,
      flag: true
    }
  },
  methods: {
    async getFoodList (page) {
      // const result = await getFoodList("/getPhoto", { params: { page: page } })
       const result = await this.$http.get("getPhoto", { params: { page: page } }) 
      if (result) {
        this.foodList = result.data
      }
    },
    async getCarouselList () {
      // const result = await getCarouselList('/getCarousel')
        const result = await this.$http.get('getCarousel')
      if (result) {
        this.isLoading = false
        this.carouselList = result.data
      }
    },
    getScroll () {
      if (this.flag) {
        this.flag=false
        const bottom = this.$refs.cardRef.$el.getBoundingClientRect().bottom -10
        const height = document.documentElement.clientHeight
        if (bottom < height) {
          this.page++
          this.isLoading = true
          this.getFoodList(this.page)
        }
        setTimeout(()=>{
          this.flag=true
        },100)
      }
    },
    authorRoom(index,name){
        // params传值刷新页面是要消失的，然而query却不会 
      this.$router.push({name:'AuthorRoom',query:{authorId:index,authorName:name}})
    }
  },
  mounted () {
    this.getCarouselList()
    this.getFoodList(this.page)
    window.addEventListener("scroll", this.getScroll)
  },
  destroyed () {
    window.removeEventListener("scroll", this.getScroll)
  }
}
</script>
<style lang="less" scoped>
.el-carousel {
  margin: 40px auto;
}
.el-card {
  margin-bottom: 20px;
}
.image {
  width: 100%;
  height: 200px;
  display: block;
}
</style>