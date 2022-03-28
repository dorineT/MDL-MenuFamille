<template>
    <v-card       
        class="cardmarginModification"
    >
      <dialogue-modification-jour-plat :stringUpdateModal="'updateMenuJour'"></dialogue-modification-jour-plat>

      <calendar-modification-menu
        :periodeMenu="periode"
        :idMenu="idPeriode"
      ></calendar-modification-menu>

      <div >
            <v-btn class="margin" outlined color="grey" to="/">Retour</v-btn>
     
            <v-btn  class="margin" outlined color="orange" @click="saveModification">Sauvegarder</v-btn>
       
            <v-btn class="margin"  outlined color="green" @click="valideModification">Valider</v-btn>

      </div>

    </v-card>
</template>


<script>
import CalendarModificationMenu from '../components/CalendarModificationMenu.vue'
import DialogueModificationJourPlat from '../components/DialogModificationJourPlat.vue'
import {eventBus } from '../main'

import MenuDao from './../services/api.menu'
let DAOMenu = new MenuDao()

export default {
  name: 'MenuModification',

  components: {
    CalendarModificationMenu,
    DialogueModificationJourPlat
  },

  data (){
    return{
      periode: null,
      idPeriode: null
    }
  },
  created(){
    eventBus.$on('postMenuModification', this.postMenu)
    this.idPeriode = this.$route.query.menu.value
    this.periode = this.$route.query.menu.text
  },
   destroyed() {
    eventBus.$off('postMenuModification');
  },
  methods: {
    valideModification(){    
      eventBus.$emit('validationModification')
    },
    saveModification(){     
      eventBus.$emit('saveModification')
    },
    postMenu(menu){
      DAOMenu.sendMenuUpdate(menu, this.$store.state.info.idFamilleActuel)
      if(this.$router.path !== '/') this.$router.push('/');
    }
  }
}
</script>

<style lang="sass">
.cardmarginModification
  margin: 10px
  padding: 15px
  padding-top: 30px

.flexDroite
  float: right

.margin
  margin: 10px  
</style>