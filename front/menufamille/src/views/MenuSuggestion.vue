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
      <dialogue-modification-jour-plat></dialogue-modification-jour-plat>

      <calendar-modification-menu
        :periodeMenu="periode"
      ></calendar-modification-menu>
    </v-card>
</template>


<script>
import CalendarModificationMenu from '../components/CalendarSuggestion.vue'
import DialogueModificationJourPlat from '../components/DialogSuggestion.vue'
export default {
  name: 'MenuSuggestion',

  components: {
    CalendarModificationMenu,
    DialogueModificationJourPlat
  
  },

  data (){
    return{
      periode: null,
      idPeriode: null,
      nomFamille:['BonneFamille', 'SuperFamille']
        
    }
  },
  mounted(){
    console.log(this.$route.query.id + ' ' + this.$route.query.periode )
    this.idPeriode = this.$route.query.id
    this.periode = this.$route.query.periode
  }
}
</script>

<style lang="sass">
.cardSuggestion
  margin: 10px
  padding: 15px
  padding-top: 30px
</style>


