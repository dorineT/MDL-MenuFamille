<template>
    <v-card       
        class="cardmarginModification"
    >
      <dialogue-modification-jour-plat :stringUpdateModal="'updateMenuJour'"></dialogue-modification-jour-plat>

      <calendar-modification-menu
        :periodeMenu="periode"
      ></calendar-modification-menu>
    </v-card>
</template>


<script>
import CalendarModificationMenu from '../components/CalendarModificationMenu.vue'
import DialogueModificationJourPlat from '../components/DialogModificationJourPlat.vue'
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
    console.log(this.$route.query.id + ' ' + this.$route.query.periode )
    this.idPeriode = this.$route.query.id
    this.periode = this.$route.query.periode
  }
}
</script>

<style lang="sass">
.cardmarginModification
  margin: 10px
  padding: 15px
  padding-top: 30px
</style>