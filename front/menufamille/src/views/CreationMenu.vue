<template>
   <v-container fluid>
    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#9CCC65">
           Global
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" color="#9CCC65">
          Détails
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Constraintscalendar/>
          
          <div class="flexDroite">
            <v-btn text > Retour </v-btn>
            <v-btn color="#9CCC65" @click="e1 = 2"> Continue </v-btn>    
          </div>        
        </v-stepper-content>

        <v-stepper-content step="2">
          <CalendarConstraintDayDay/>
          <div class="flexDroite">
            <v-btn text @click="e1 = 1"> Retour </v-btn>
            <v-btn color="#9CCC65" @click="e1 = 1"> Continue </v-btn>    
          </div>        
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Constraintscalendar from "../components/Constraintscalendar";
import CalendarConstraintDayDay from "../components/CalendarConstraintDayDay";

export default {
  name: "CreationMenu",

  components: {
    Constraintscalendar,
    CalendarConstraintDayDay
  },

  data(){
    return{
      e1: 1,
      step: 1,
    }
  }
};
</script>


<style lang="sass">
.flexDroite
  float: right

</style>