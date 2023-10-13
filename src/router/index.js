import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReserveHistory from '@/components/ReserveHistory.vue'
import LoginPage from '@/components/LoginPage.vue'
import AllUser from '@/components/AllUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/AllUser',
    name: 'AllUser',
    component: AllUser
  },
  {
    path: '/ReserveHistory',
    name: 'ReserveHistory',
    component: ReserveHistory
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
