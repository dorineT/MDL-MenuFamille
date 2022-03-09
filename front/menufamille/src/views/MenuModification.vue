<template>
    <v-card       
        class="cardmarginModification"
    >
      <dialogue-modification-jour-plat :stringUpdateModal="'updateMenuJour'"></dialogue-modification-jour-plat>

      <calendar-modification-menu
        :periodeMenu="periode"
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
  mounted(){  
    this.idPeriode = this.$route.query.id
    this.periode = this.$route.query.periode
  },
  created(){
    eventBus.$on('postMenuModification', this.postMenu)
  },
  methods: {
    valideModification(){    
      eventBus.$emit('validationModification')
    },
    saveModification(){     
      eventBus.$emit('saveModification')
    },
    postMenu(menu){
      console.log('post api')
      console.log(menu)
      this.$router.push('/');
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