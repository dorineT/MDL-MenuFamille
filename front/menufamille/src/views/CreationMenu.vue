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
            <Constraintscalendar @formValideOK="stepAvance"/>
          
            <div class="flexDroite">
              <v-btn text disabled> Retour </v-btn>
              <v-btn color="#9CCC65" @click="submit"> Continue </v-btn>    
            </div>  
          
        </v-stepper-content>

        <v-stepper-content step="2">
          <CalendarConstraintDayDay/>
          <div class="flexDroite">
            <v-btn text @click="retourClick()"> Retour </v-btn>
            <v-btn color="#9CCC65" @click="stepComplete"> Continue </v-btn>    
          </div>        
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Constraintscalendar from "../components/Constraintscalendar";
import CalendarConstraintDayDay from "../components/CalendarConstraintDayDay";
import {eventBus } from '../main'

export default {
  name: "CreationMenu",

  components: {
    Constraintscalendar,
    CalendarConstraintDayDay,//: () => import('../components/CalendarConstraintDayDay'),
  },

  data(){
    return{    
      e1: 1,
      step: 1,
      form: null,
      items: []
    }
  },
  methods: {
    submit() {
      eventBus.$emit('validateFormContrainte')     
    },
    stepAvance(dataForm){  
      this.form = dataForm
      this.e1 = 2
      eventBus.$emit('configurationDD', this.form)
    },
    stepComplete(){
      //creation du menu terminee => send post api
      eventBus.$emit('creationMenuDone')
    },
    retourClick(){
      // + get items 
      this.e1 = 1
    }
  }
};
</script>


<style lang="sass">
.flexDroite
  float: right

</style>