<template>
 
    <v-card  
   
        class="cardSuggestion"
    >
      <dialog-suggestion></dialog-suggestion>

      <calendar-suggestion
        :periodeMenu ="periode"
        :menuId ="idPeriode"                      
      ></calendar-suggestion>
      <div >
        <v-btn class = "retourSugg" outlined color = "red" to = "/"> Retour </v-btn>
      
      </div>
    </v-card>
</template>


<script>
import {eventBus} from '../main'
import CalendarSuggestion from '../components/CalendarSuggestion.vue'
import DialogSuggestion from '../components/DialogSuggestion.vue'
import MenuDao from '../services/api.menu'

let menuSuggest = new MenuDao()

export default {
 

  components: {
    CalendarSuggestion,
    DialogSuggestion
  
  },

  data (){
    return{
      periode: null,
      idPeriode: null,             
    }
  },
  beforeMount(){      
    eventBus.$on('postSuggestion', this.postSuggMenu)
    
    this.idPeriode = this.$route.query.menu.value 
    this.periode = this.$route.query.menu.text   
  },

  destroyed() {
    eventBus.$off('postSuggestion')
  },

  methods: {
    postSuggMenu(postmenu){
      menuSuggest.sendMenuUpdate(postmenu)     
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


