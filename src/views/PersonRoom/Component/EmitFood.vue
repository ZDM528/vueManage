<template>
  <div style="background-color:#fff;margin:20px 10% 20px 10%">
    <el-form
      style="width:50%;padding:10px 0"
      ref="emitForm"
      :model="emitForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item
        label="标题"
        prop="title"
      >
        <el-input v-model="emitForm.title"></el-input>
      </el-form-item>
      <el-form-item
        label="菜谱属性"
        prop="attrs"
      >
        <el-cascader
          v-model="emitForm.attrs"
          :options="options"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="工艺"
        prop="divide"
      >
        <el-select
          v-model="emitForm.divide"
          placeholder="请选择"
        >
          <el-option
            v-for="item in divides"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="成品图"
        prop="photo"
      >
        <UploadImg @photoName="getphotoName"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UploadImg from './UploadImg'
import {emitFood} from '../../../api/axios'
import qs from 'qs'

export default {
  data () {
    return {
      emitForm: {
        title: '',
        attrs: [],
        divide: '',
        photo:''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        attrs: [
          { required: true, message: '请选择菜谱属性', trigger: 'change' },
        ],
        divide: [
          { required: true, message: '请选择菜谱属性', trigger: 'change' },
        ],
        photo: [
          { required: true, message: '请上传成品图', trigger: 'change' },
        ],

      },
      options: [{
        value: '中化菜系',
        label: '中化菜系',
        children: [{
          value: '川菜',
          label: '川菜',
        }, {
          value: '粤菜',
          label: '粤菜',
        }, {
          value: "东北菜",
          label: "东北菜"
        }, {
          value: "鲁菜",
          label: "鲁菜"
        }]
      }, {
        value: '外国菜谱',
        label: '外国菜谱',
        children: [{
          value: '韩国料理',
          label: '韩国料理',
        }, {
          value: '日本料理',
          label: '日本料理',
        }, {
          value: "法国菜",
          label: "法国菜"
        }, {
          value: "意大利餐",
          label: "意大利餐"
        }]
      }],
      divides: [{
        value: '煮',
        label: '煮'
      }, {
        value: '蒸',
        label: '蒸'
      }, {
        value: '炒',
        label: '炒'
      }, {
        value: '烘焙',
        label: '烘焙'
      }],
    }
  },
  methods: {
    onSubmit () {
      this.$refs.emitForm.validate(async valid => {
        if (!valid) return
        const result=await emitFood('/emitFood',qs.stringify(this.emitForm))
        if(result.data.code===200){
          this.$router.push("/personRoom")
        }
      })
    },
    getphotoName(name){
      this.emitForm.photo=name
    }
  },
  components:{
    UploadImg
  }
}
</script>
<style lang="less" scoped>
</style>