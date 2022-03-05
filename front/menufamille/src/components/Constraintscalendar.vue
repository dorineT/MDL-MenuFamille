<template>
<div>
  <v-card>
     <v-form>
    <h3>Période :</h3>   
    <v-container class="px-0" fluid>
      <v-radio-group v-model="row" row>
        <v-radio label="semaine" value="semaine"></v-radio>
        <v-radio label="personnalisé" value="peronalise"></v-radio>
      </v-radio-group>
    </v-container>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dateDebut"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="computedDateFormattedDebut"
              label="Début"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateDebut" no-title scrollable locale="fr">
            <v-spacer></v-spacer>
            <v-btn text color="green" @click="menu = false">
              Annuler
            </v-btn>
            <v-btn
              text
              color="green"
              @click="$refs.menu.save(dateDebut)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
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
              v-model="computedDateFormattedFin"
              label="Fin"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateFin" no-title scrollabe locale="fr">
            <v-spacer></v-spacer>
            <v-btn text color="green" @click="menu2 = false">
              Annuler
            </v-btn>
            <v-btn
              text
              color="green"
              @click="$refs.menu2.save(dateFin)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <br />
    <v-checkbox v-model="matinCheck" label="Matin"></v-checkbox>

    <v-checkbox v-model="midiCheck" label="Midi"></v-checkbox>

    <v-checkbox v-model="soirCheck" label=" Soir"></v-checkbox>
    <br />

    
      <v-container grid-list-xl fluid>
        <h3>Nombre de personne :</h3>
        <v-layout wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field
              type="number"
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model="nbPersonnes"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
 
      <v-container grid-list-xl fluid>
        <h3>Plat identique autorisé :</h3>
        <v-layout wrap>
          <v-flex xs12 sm6 md3>
            Matin :
            <v-text-field
              type="number"
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model="nbPlatMatin"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            Midi : 
            <v-text-field
              type="number"
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model="nbPlatMidi"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            Soir
            <v-text-field
              type="number"
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model="nbPlatSoir"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

    <v-container class="px-0" fluid>
      <h3>Type de menu :</h3>
      <v-radio-group v-model="choixTypeMenu" row @change="disabledChoixAutomatique">
        <v-radio label="Manuel (mode suggestion)" value="manuel"></v-radio>
        <v-radio label="Automatique" value="automatique"></v-radio>        
      </v-radio-group>
      <br>
      <v-radio-group v-model="choixMenuAutomatique" row :disabled="disabledChoixMenuAutomatique">
        <v-radio label="Favoris" value="favoris"></v-radio>
        <v-radio label="Historique" value="historique"></v-radio>
      </v-radio-group>
    </v-container>

    </v-form>
  </v-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      matinCheck: false,
      midiCheck: false,
      soirCheck: false,
      complete: false,
      nbPersonnes: null,
      nbPlatMatin: null,
      nbPlatMidi: null,
      nbPlatSoir: null,
      row: null,
      choixTypeMenu: 'manuel',
      choixMenuAutomatique: null,
      menu: false,    
      dateDebut: "",     
      dateFin: "",  
      menu2: false,
      disabledChoixMenuAutomatique: true,

      numberRule1: (val) => {
        if (val < 0) return "Entrez un nombre positif";
        return true;
      },
      numberRule2: (val) => {
        if (val < 0) return "Entrez un nombre positif";
        return true;
      },
    };
  },
  mounted() {
//
  },
  watch: {
    //
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    disabledChoixAutomatique(){
      this.disabledChoixMenuAutomatique = ! this.disabledChoixMenuAutomatique

      if(!this.disabledChoixMenuAutomatique){
        this.choixMenuAutomatique = 'null'
      }
    }
  },
  computed: {
    computedDateFormattedDebut() {
      return this.formatDate(this.dateDebut);
    },
    computedDateFormattedFin() {
      return this.formatDate(this.dateFin);
    },
  },
};
</script>

<style lang="sass">

.v-input--selection-controls.v-input
    display: inline-block
    margin:10px


.v-application .primary--text
  color: green /*#FFB74D*/ !important
  caret-color: green /*#FFB74D*/  !important

.v-application .accent 
    background-color: green !important
    border-color: green !important

.v-application .accent--text
  color: green /*#FFB74D*/ !important
  caret-color: green /*#FFB74D*/  !important 


@media only screen and (max-width: 959px)
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label
    display: flex !important



</style>
.
