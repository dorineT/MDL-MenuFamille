import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { info } from './info.module';
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
    info
  },
});

export default store;