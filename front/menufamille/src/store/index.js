import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { info } from './info.module';
import { loading } from './loading.module';
Vue.use(Vuex);

const store =  new Vuex.Store({
  modules: {
    auth,
    loading,
    info
  },
});

export default store;