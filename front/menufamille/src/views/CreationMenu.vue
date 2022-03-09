<template>
   <v-container fluid>

    <dialogue-modification-jour-plat :stringUpdateModal="'updateMenuJourCreate'"></dialogue-modification-jour-plat>

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
              <v-btn color="#9CCC65" @click="submit"> Continue </v-btn>    
            </div>  
          
        </v-stepper-content>

        <v-stepper-content step="2">
          <CalendarConstraintDayDay/>
          <div class="flexDroite">
            <v-btn text @click="e1 = 1"> Retour </v-btn>
            <v-btn color="#9CCC65" @click="stepComplete"> Continue </v-btn>    
          </div>        
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Constraintscalendar from "../components/Constraintscalendar";
import DialogueModificationJourPlat from '../components/DialogModificationJourPlat.vue'
import CalendarConstraintDayDay from "../components/CalendarConstraintDayDay";
import {eventBus } from '../main'
export default {
  name: "CreationMenu",

  components: {
    Constraintscalendar,
    CalendarConstraintDayDay,//: () => import('../components/CalendarConstraintDayDay'),
    DialogueModificationJourPlat
  },

  data(){
    return{    
      e1: 1,
      step: 1,
      form: null,
    }
  },
  created(){
    eventBus.$on('formValideOK', this.stepAvance)
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
      //creation du menu terminee
      console.log('fini')
    }
  }
};
</script>


<style lang="sass">
.flexDroite
  float: right

</style>