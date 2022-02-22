<template>
    <v-container class="checkboxes" fluid>
     
    <v-checkbox
      v-model="checkbox1"
      :label="`semaine`"
    ></v-checkbox>

     <v-checkbox
      v-model="checkbox2"
      :label="`personalisé`"   
    ></v-checkbox>

    
  </v-container>

  
</template>

<script>
  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: true,
      }
    },
  }
</script>

<style>

.v-input--selection-controls.v-input {
    display: inline-block;
    margin:10px;
 
}

</style>.