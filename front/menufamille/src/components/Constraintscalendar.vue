<template>
    <v-container class="checkboxes" fluid>

    <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        color="error"
      >
        Configuration Menu
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color="error"
      >
        Configuration calendrier
      </v-stepper-step>

      <v-divider></v-divider>

      
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card >

      <h3> Période :</h3>

      <v-container
    class="px-0"
    fluid
  >
   <v-radio-group
      v-model="row"
      row
    >
      <v-radio
        label="semaine"
        value="radio-3"
      ></v-radio>
      <v-radio
        label="personnalisé"
        value="radio-4"
      ></v-radio>
    </v-radio-group>
  </v-container>


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
            color="error"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="error"
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
            color="error"
            @click="menu2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="error"
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
 <h3>Nombre de personne :</h3>
   
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


 <h3>Plat identique autorisé :</h3>

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
          :items="items2"
          label="Famille"
          dense
          outlined
        ></v-select>
      </v-col>
<h3>Type de menu :</h3>
<v-container
    class="px-0"
    fluid
  >
   <v-radio-group
      v-model="row1"
      row
    >
      <v-radio
        label="Automatique"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Manuel"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
  </v-container>

<v-checkbox
      v-model="checkbox6"
      :label="`Favoris`"   
    ></v-checkbox>
    
     <v-checkbox
      v-model="checkbox7"
      :label="`Historique`"   
    ></v-checkbox>
        </v-card>

        <v-btn
          color="error"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
        >

        <div style="margin: 4px">

    <v-combobox
      color="orange lighten-2"
      label="Choix du menu"
      class="combobox-class"
      :items="itemPeriode"      
      v-model="comboboxMenuSelected"></v-combobox>

        <v-data-table
            :headers="headers"
            :items="items"                                          
            class="elevation-8"
            disable-sort
            mobile-breakpoint="0"
            :footer-props="{             
              'disable-items-per-page':true,
              itemsPerPage:7,      
              'items-per-page-options': [7,14],
              'items-per-page-text':'Lignes par page',
            }"
        > 
         <template
            v-if="IscomboboxChange('Aucun menu sélectionné')"
            v-slot:no-data
          >
            Pas de menu sélectionné
          </template>
        
       <template v-slot:item="{ item }">
            <tr>
              <td class="tdplat"> {{ item.name }} </td>
              <td class="tdplat"> <v-btn text @click="goToRecette(item.Matin)">{{ item.Matin }} </v-btn></td>
              <td class="tdplat"> 
                <v-btn text @click="goToRecette(item.Midi)">{{ item.Midi }}</v-btn> 
                <p>{{item.MidiDesc}}</p>  
              </td>
              <td class="tdplat"> <v-btn text @click="goToRecette(item.Soir)">{{ item.Soir }} </v-btn> </td>
            </tr>
          </template>
          </v-data-table>  
      </div>  
    </v-card>

        <v-btn
          color="error"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text
        @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>

    
    </v-stepper-items>
  </v-stepper>

    </v-container>
    
</template>



<script>



 
  export default {  name: 'Home',

    
    data () {
      return {
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false,
        complete:false,
        step:1,
        items2: ['FamilleHeureux','FamillePasHeureux'],
        number1: null,
        number2: null, 
        column: null,
        row: null,
        row1: null,
        e1: 1,
        menu:false,
        date:'',
        datedebut:'',
        datefin:'',
        menu2:false,
        headers: [
          {
            text: 'Période',
            align: 'start',            
            value: 'name',
          },
          { text: 'Matin', align: 'center',value: 'Matin' },
          { text: 'Midi',align: 'center', value: 'Midi' },
          { text: 'Soir',align: 'center', value: 'Soir' },
        ],
        items:[],
        plats: [
          {
            name: 'Lundi \n14/02',
            Matin: 'céréale',
            Midi: 'croque-monsieur',
            Soir: 'pain',
          },
          {
            name: 'Mardi \n15/02',
            Matin: 'crepe',
            Midi: 'croque-monsieur',
            Soir: 'lasagne',

          },
          {
            name: 'Mercredi \n16/02',
            Matin: '/',
            Midi: 'pain',
            Soir: 'canard',

          },
          {
            name: 'Jeudi \n17/02',
            Matin: 'céréale',
            Midi: 'croque-monsieur',
            Soir: 'pain',

          },
          {
            name: 'Vendredi \n18/02',
            Matin: 'flocon d\'avoine',
            Midi: 'croque-monsieur',
            Soir: 'frites',

          },
          {
            name: 'Samedi \n19/02',
            Matin: 'céréale',
            Midi: 'spaghetti',
            Soir: 'crepe',

          },
          {
            name: 'Dimanche \n20/02',
            Matin: 'céréale',
            Midi: 'rotî sauce moutarde',
            MidiDesc:'18 personnes',
            Soir: '/',

          },
          {
            name: 'Lundi \n21/02',
            Matin: 'céréale',
            Midi: 'rotî sauce moutarde',
            MidiDesc: '18 personnes',
            Soir: '/',

          }
        ],
        itemPeriode: [
          '14/02 - 20/02'
        ],
        comboboxMenuSelected: null,        
      
    
    numberRule1: val => {
      if(val < 0) return 'Entrez un nombre positif'
      return true;
         },
     numberRule2: val => {
      if(val < 0) return 'Entrez un nombre positif'
      return true;

       
         },
         

      }
    },
    mounted () {
      console.log(this.$vuetify.breakpoint.width)
      this.comboboxMenuSelected='Aucun menu sélectionné'
    },
    watch:{
        comboboxMenuSelected(slot){     
        if(slot === 'Aucun menu sélectionné'){        
          this.items = []
        }
        else{ //check période des menus => Call API
          this.items = this.plats
        }
      }
    },
    methods:{
      goToRecette(text){
          alert('click ' + text)
        },
      IscomboboxChange(slot){        
        return this.comboboxMenuSelected === slot
      }
    }
  }


</script>

<style>

.v-input--selection-controls.v-input {
    display: inline-block;
    margin:10px;
 
}

.v-application .primary--text {
  color: #FFB74D !important;
  caret-color: #FFB74D  !important
}
</style>.
