import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { info } from './info.module';
import { loading } from './loading.module'; 
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store =  new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['info'],
    }),
  ],
  modules: {
    auth,
    info,
    loading
  },
});

export default store;