<template>

    <v-card 
    class="cardShopping">

    <shopping-info></shopping-info>
 
    </v-card>


</template>


<script>
import ShoppingInfo from '../components/ShoppingInfo.vue'

export default {
  components: {
  ShoppingInfo
  },
}
</script>

<style lang="sass">
.cardShopping
  margin: 10px
</style>
