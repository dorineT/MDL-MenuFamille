<template>
    <v-card       
        class="cardSuggestion"
    >
      <dialogue-modification-jour-plat></dialogue-modification-jour-plat>

      <calendar-modification-menu
        :periodeMenu="periode"
      ></calendar-modification-menu>
    </v-card>
</template>


<script>
import CalendarModificationMenu from '../components/EmptyCalendar.vue'
import DialogueModificationJourPlat from '../components/DialogModificationJourPlat.vue'
export default {
  name: 'MenuSuggestion',

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


