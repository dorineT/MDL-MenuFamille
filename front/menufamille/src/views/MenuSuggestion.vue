<template>
 
    <v-card  
   
        class="cardSuggestion"
    >
    <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >     
      <v-select
          :items="nomFamille"
          label="Famille"
          outlined
        ></v-select>
      </v-col>
    </v-row>
 </v-container>
      <dialog-suggestion></dialog-suggestion>

      <calendar-suggestion
        :periodeMenu ="periode"
        :menuId ="idPeriode"                      
      ></calendar-suggestion>
      <div >
        <v-btn class = "retourSugg" outlined color = "red" to = "/"> Retour </v-btn>
       <!-- <v-btn class = "sauvegarderSugg" outlined color = "green" @click ="saveSuggestion"> Sauvegarder </v-btn> -->
      </div>
    </v-card>
</template>


<script>
import {eventBus} from '../main'
import CalendarSuggestion from '../components/CalendarSuggestion.vue'
import DialogSuggestion from '../components/DialogSuggestion.vue'
import MenuSugg from '../services/api.menuSuggestion'

let menuSuggest = new MenuSugg()

export default {
 

  components: {
    CalendarSuggestion,
    DialogSuggestion
  
  },

  data (){
    return{
      periode: null,
      idPeriode: null,
      nomFamille:['BonneFamille', 'SuperFamille']
        
    }
  },
  /*mounted(){
    console.log(this.$route.query.id + ' ' + this.$route.query.periode )
    this.idPeriode = this.$route.query.id
    this.periode = this.$route.query.periode
  },
  */
  created(){ 
    console.log("je suiis la")      
    eventBus.$on('postSuggestion', this.postSuggMenu)
    
    this.idPeriode = this.$route.query.menu.value
    console.log(this.idPeriode)            //! c'est vraiment ID 0
    this.periode = this.$route.query.menu.text
    console.log(this.periode) 
  },

  destroyed() {
    eventBus.$off('postSuggestion')
  },

  methods: {
    /*saveSuggestion(){                     //car pas besoin de btn save
      eventBus.$emit('saveSuggestion')
    },*/

    postSuggMenu(postmenu){
      menuSuggest.sendPostSuggestionMenu(postmenu,this.$store.state.auth.user.id_membre)
      console.log('test postSuggMenu' + postmenu)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
.cardSuggestion
  margin: 10px
  padding: 15px
  padding-top: 30px

.sauvegarderSugg
 float: right
</style>


