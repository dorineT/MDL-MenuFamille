import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/profile.vue'
import Recette from '../views/Recette.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import MenuModification from '../views/MenuModification.vue'
import FamilyView from '../views/FamilyView.vue'

import ShoppingList from '../views/ShoppingList.vue'
import MenuSuggestion from '../views/MenuSuggestion.vue'
import CreationMenu from '../views/CreationMenu.vue'

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
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/recipe',
    name: 'Recette',
    component: Recette
  },
  {
    path: '/menuModification',
    name: 'MenuModification',
    component: MenuModification,
    props: true
  },
  {
    path: '/family',
    name: 'FamilyView',
    component: FamilyView
  },
  {
    path: '/menuSuggestion',
    name: 'MenuSuggestion',
    component: MenuSuggestion
    
  },
  {

    // links to access to the creation menu page
    path: '/creationMenu',
    name: 'CreationMenu',
    component: CreationMenu
  },
  {
    path: '/shoppingList',
    name: 'ShoppingList',
    component: ShoppingList
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
