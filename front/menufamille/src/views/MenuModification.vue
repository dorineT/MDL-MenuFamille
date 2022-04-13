<template>
    <v-card       
        class="cardmarginModification"
    >
      

      <calendar-modification-menu
        :periodeMenu="periode"
        :idMenu="idPeriode"
      ></calendar-modification-menu>



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
  beforeMount(){
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

 
</style>