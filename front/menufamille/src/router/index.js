import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menuModification',
    name: 'MenuModification',
    component: () => import( '../views/MenuModification.vue'),
    props: true
  },
  {
    path: '/menuSuggestion',
    name: 'MenuSuggestion',
    component: () => import( '../views/MenuSuggestion.vue'),
    
  },
  {

    // links to access to the creation menu page
    path: '/creationMenu',
    name: 'CreationMenu',
    component: () => import('../views/CreationMenu.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
