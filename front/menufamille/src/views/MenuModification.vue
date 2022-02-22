<template>
    <v-card       
        class="cardmargin"
    >   
    <calendar-modification-menu
      :periodeMenu="periode"
    ></calendar-modification-menu>
    </v-card>
</template>


<script>
import CalendarModificationMenu from '../components/CalendarModificationMenu.vue'
export default {
  name: 'MenuModification',

  components: {
    CalendarModificationMenu
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
.cardmargin
  margin: 10px
  padding: 10px
</style>