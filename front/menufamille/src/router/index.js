import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/menuModification',
    name: 'MenuModification',
    component: () => import( '../views/MenuModification.vue'),
    props: true
  },
  {

    // links to access to the creation menu page
    path: '/creationMenu',
    name: 'CreationMenu',
    component: () => import(/* webpackChunkName: "creationMenu" */ '../views/CreationMenu.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
