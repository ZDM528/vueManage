<template>
  <div>
    <el-upload
      action="string"
      list-type="picture-card"
      :http-request="uploadImg"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
  </div>

</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      imageUrl: '',
      photoName: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("upload-url", this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt8M = file.size / 1024 / 1024 < 8
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt8M) {
        this.$message.error('上传头像图片大小不能超过 8MB!')
      }
      return isJPG && isLt8M
    },
    async uploadImg (param) {
      // var img = new Image()
      // var canvas = document.createElement("canvas")
      // if (canvas.getContext) {
      //   var context = canvas.getContext("2d")
      // }
      // const reader = new FileReader()
      // reader.readAsDataURL(param.file)
      // reader.onload = e => {
      //   img.src = e.target.result
      //   img.onload = function () {
      //     var originWidth = this.width
      //     var originHeight = this.height
      //     var maxWidth = 400
      //     var maxHeight = 400
      //     var targetWidth = originWidth
      //     var targetHeight = originHeight
      //     if (originWidth > maxWidth || originHeight > maxHeight) {
      //       if (originWidth / originHeight > maxWidth / maxHeight) {
      //         targetWidth = maxWidth
      //         targetHeight = Math.round(maxWidth * (originWidth / originHeight))
      //       }
      //       else {
      //         targetHeight = maxHeight
      //         targetWidth = Math.round(maxHeight * (originWidth / originHeight))
      //       }
      //     }
      //     canvas.width = targetWidth
      //     canvas.height = targetHeight
      //     context.clearRect(0, 0, targetWidth, targetHeight)
      //     context.drawImage(img, 0, 0, targetWidth, targetHeight)
      //     canvas.toBlob(function (blob) {
      //       console.log(blob);
      //     })
      //   }
      // }
      const formData = new FormData()
      formData.append('file', param.file)
      const result = await axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (result.data.code === 200) {
        this.photoName = result.data.name
        this.$emit("photoName", this.photoName)
        this.$message.success("上传图片成功")
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>