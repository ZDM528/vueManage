import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home/Home.vue'
import PersonRoom from '../views/PersonRoom/PersonRoom'
import MainPage from '../views/Home/Component/MainPage'
import EditPerson from '../views/PersonRoom/Component/EditPerson'
import EmitFood from '../views/PersonRoom/Component/EmitFood'
import Cookies from 'js-cookie'
Vue.use(VueRouter)

// 解决重复点击菜单路由一样错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/mainPage',
    component: Home,
    children: [
      {
        path: '/mainPage',
        name: 'MainPage',
        component: MainPage,
      },
      {
        path: "/personRoom",
        name: 'PersonRoom',
        component: PersonRoom
      },
      {
        path: "/authorRoom",
        name: 'AuthorRoom',
        component: PersonRoom
      },
      {
        path:"/editPerson",
        name:'EditPerson',
        component:EditPerson
      },
      {
        path:"/emitFood",
        name:'EmitFood',
        component:EmitFood
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

//路由导航守卫控制访问权限，如果有登录则可跳转，没登录则强制退到登陆界面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenstr = Cookies.get("token")
  if (!tokenstr) return next('/login')
  next()
})

export default router
