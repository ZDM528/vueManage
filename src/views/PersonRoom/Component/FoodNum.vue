<template>
  <div style="background-color:#fff;padding:20px">
    <a-list
      item-layout="horizontal"
      :data-source="list"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
      >
        <a type="link"  @click="deleteFood(item.id)"  slot="actions">删除</a>
        <a-list-item-meta :description="'菜谱属性：'+item.attrs+' 工艺：'+item.divide">
          <a-checkbox slot="title" >
            {{'菜谱名字： '+  item.title }}
          </a-checkbox>
          <!-- <a-avatar
            slot="avatar"
            :src="imageData[0]"
          /> -->
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { mapActions, mapState  } from 'vuex'
export default {
  data () {
    return {
      imageData: []
    }
  },
  methods: {
    ...mapActions(['getFoodList']),
    handleImage () {
      this.list.image.forEach(item => {
        const blob = new Blob([item.data], {
          type: 'application/jpg;charset=utf-8',
        })
        const url = window.URL.createObjectURL(blob)
        this.imageData.push(url)
      })
      
    },
    async deleteFood(id){
      await this.$store.dispatch('deleteFood',id)
      await this.getFoodList()
      this.$message.success("删除成功！")
    }
  },
  computed: {
    ...mapState(['list'])
  },
  async mounted () {
    await this.getFoodList()
    this.handleImage()
  }
};
</script>
<style lang="less" scoped>
</style>