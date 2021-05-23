import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './assets/css/global.css'
import './plugins/element.js'
import './api/axios'
import VueResource from 'vue-resource'
// 使用antd-design-vue库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// 图片懒加载 
import Vuelazyload from 'vue-lazyload'
Vue.use(Vuelazyload)

Vue.use(VueResource)
Vue.http.options.root = 'api'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
