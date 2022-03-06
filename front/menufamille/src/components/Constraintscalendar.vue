<template>
<div>
  <v-card>
     <v-form>
    <h3>Période :</h3>   
    <v-container class="px-0" fluid>
      <v-radio-group v-model="choixPeriode" row>
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
        <v-row wrap>
          <v-col xs12 sm6 md3>
            <h3>Nombre de personnes :</h3>
            <v-text-field
              type="number"
              step="any"
              min="0"
              ref="input"
              :rules="[numberRule2]"
              v-model.number="nbPersonnes"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
 
      <v-container  fluid>            
        <v-row>          
          <v-col cols="12" sm="4" md="4" lg="4" xl="4">
            <v-card>
              <v-card-title>
                Matin
              </v-card-title>
              <v-card-subtitle>
                Plats identiques autorisés :
              </v-card-subtitle>
              <v-card-text>
                <v-text-field
                  type="number"
                  step="any"
                  min="0"
                  ref="input"
                  :rules="[numberRule2]"
                  v-model.number="nbPlatMatin"
                ></v-text-field>
              </v-card-text>             
              <v-divider></v-divider>
              <v-card-subtitle>
                Tags
              </v-card-subtitle>
              <v-card-text>
                <v-autocomplete
                  chips
                  clearable
                  deletable-chips
                  multiple
                  :items="tagsListe"
                  v-model="tagsMatin"
                  color="orange lighten-2"                  
                  no-data-text="Aucun tag correspondant"
                ></v-autocomplete> 
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4" xl="4">
            <v-card>
              <v-card-title>
                Midi
              </v-card-title>
              <v-card-subtitle>
                Plats identiques autorisés :
              </v-card-subtitle>
              <v-card-text>
                <v-text-field
                  type="number"
                  step="any"
                  min="0"
                  ref="input"
                  :rules="[numberRule2]"
                  v-model.number="nbPlatMidi"
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-subtitle>
                Tags
              </v-card-subtitle>
              <v-card-text>
                <v-autocomplete
                  chips
                  clearable
                  deletable-chips
                  multiple
                  :items="tagsListe"
                  v-model="tagsMidi"
                  color="orange lighten-2"                  
                  no-data-text="Aucun tag correspondant"
                ></v-autocomplete> 
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4" md="4" lg="4" xl="4">
            <v-card>
              <v-card-title>
                Soir
              </v-card-title>
              <v-card-subtitle>
                Plats identiques autorisés :
              </v-card-subtitle>
              <v-card-text>
                <v-text-field
                  type="number"
                  step="any"
                  min="0"
                  ref="input"
                  :rules="[numberRule2]"
                  v-model.number="nbPlatSoir"
                ></v-text-field>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-subtitle>
                Tags
              </v-card-subtitle>
              <v-card-text>
                <v-autocomplete
                  chips
                  clearable
                  deletable-chips
                  multiple
                  :items="tagsListe"
                  v-model="tagsSoir"
                  color="orange lighten-2"                  
                  no-data-text="Aucun tag correspondant"
                ></v-autocomplete> 
              </v-card-text>  
            </v-card>
          </v-col>
        </v-row>
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
      choixPeriode: null,
      choixTypeMenu: 'manuel',
      choixMenuAutomatique: null,
      menu: false,    
      dateDebut: "",     
      dateFin: "",  
      menu2: false,
      disabledChoixMenuAutomatique: true,
      tagsListe: ['sel', 'sucre', 'lunch'],
      tagsMatin: null,
      tagsMidi: null,
      tagsSoir: null,

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
      if(this.choixPeriode === 'semaine'){                
        var date = new Date(this.dateDebut);
        // add 7 days
        date.setDate(date.getDate() + 6);
        console.log(date)        
      }
      this.computedDateFormattedFin
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

.v-card
  padding: 5px
</style>
.
