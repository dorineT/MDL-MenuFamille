import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from "vuex-persist";
import { auth } from './auth.module';
import { info } from './info.module';
import { loading } from './loading.module';
Vue.use(Vuex);

const vueLocalStorage = new VuexPersist({
  key: 'STORAGE_KEY',
  storage: window.localStorage,
  reducer: (state) => ({
    persistedModuleName: {
      idFamilleActuel: state.info.idFamilleActuel,
      nomFamille: state.info.nomFamille,
      nbMembreActuel: state.info.nbMembreActuel,
      roleActuel: state.info.roleActuel
    }
  })
})
const store =  new Vuex.Store({
  plugins: [vueLocalStorage.plugin],
  modules: {
    auth,
    loading,
    info
  },
});

export default store;