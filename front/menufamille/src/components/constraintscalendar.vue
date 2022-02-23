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

    <br>

 <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="datedebut"
            label="Début"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datedebut"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      
       <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false" 
       
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="datefin"
            label="Fin"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datefin"
          @input="menu2 = false"
          no-title
          scrollabe
        > <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu2.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>


    <br>
     <v-checkbox
      v-model="checkbox3"
      :label="`Matin`"   
    ></v-checkbox>
    
     <v-checkbox
      v-model="checkbox4"
      :label="`Midi`"   
    ></v-checkbox>

     <v-checkbox
      v-model="checkbox5"
      :label="`Soir`"   
    ></v-checkbox>
 <br>
 <h3>Nombre de personne:</h3>
   
    <v-form>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field
              type="number"   
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model.number="number1"
            ></v-text-field>
          </v-flex>
 
        </v-layout>
      </v-container>
    </v-form>


 <h3>plat identique autorisé:</h3>

    <v-form>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field
              type="number"   
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model.number="number2"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

 <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="Famille"
          dense
          outlined
        ></v-select>
      </v-col>

    </v-container>

  
</template>

<script>
  export default {
    data () {
      return {
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        items: ['FamilleHeureux','FamillePasHeureux'],
        number1: 0,
        number2: 0,
    numberRule1: val => {
      if(val < 0) return 'Please enter a positive number'
      return true;
         },
     numberRule2: val => {
      if(val < 0) return 'Please enter a positive number'
      return true;
         }
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