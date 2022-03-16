import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import setupInterceptors from './services/setupInterceptors';

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

import moment from 'moment'
//Vue.prototype.moment = moment
Vue.use(moment)

Vue.config.productionTip = false
export const eventBus = new Vue();
setupInterceptors(store)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')




