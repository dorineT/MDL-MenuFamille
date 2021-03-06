import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import setupInterceptors from './services/setupInterceptors';
import VueQRCodeComponent from 'vue-qrcode-component';
import LoadingAvocado from './components/loadingAvocado';
import VueMeta from 'vue-meta'

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

Vue.use(require('vue-moment'));
Vue.use(VueMeta);
Vue.component('qr-code', VueQRCodeComponent);
Vue.component('loading-avocado', LoadingAvocado);




Vue.config.productionTip = false
export const eventBus = new Vue();
setupInterceptors(store)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')




