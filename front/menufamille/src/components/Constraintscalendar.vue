<template>
  <v-container fluid>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="green">
          Configuration global
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" color="green">
          Configuration jour/jour
        </v-stepper-step>

        <v-divider></v-divider>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
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

            <h3>Type de menu :</h3>
            <v-container class="px-0" fluid>
              <v-radio-group v-model="row1" row>
                <v-radio label="Automatique" value="radio-1"></v-radio>
                <v-radio label="Manuel" value="radio-2"></v-radio>
              </v-radio-group>
            </v-container>

            <v-checkbox v-model="favorisCheck" :label="`Favoris`"></v-checkbox>

            <v-checkbox v-model="historiqueCheck" :label="`Historique`"></v-checkbox>
          </v-card>

          <v-btn color="error" @click="e1 = 2"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <div style="margin: 4px"></div>
          </v-card>

          <v-btn color="error" @click="e1 = 1"> Continue </v-btn>

          <v-btn text @click="e1 = 1"> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      matinCheck: false,
      midiCheck: false,
      soirCheck: false,
      historiqueCheck: false,
      favorisCheck: false,
      complete: false,
      step: 1,
      number1: null,
      number2: null,
      column: null,
      row: null,
      row1: null,
      e1: 1,
      menu: false,    
      dateDebut: "",     
      dateFin: "",  
      menu2: false,
      headers: [],
      items: [],
      comboboxMenuSelected: null,

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
    console.log(this.$vuetify.breakpoint.width);
    this.comboboxMenuSelected = "Aucun menu sélectionné";
  },
  watch: {
    comboboxMenuSelected(slot) {
      if (slot === "Aucun menu sélectionné") {
        this.items = [];
      } else {
        //check période des menus => Call API
        this.items = this.plats;
      }
    }
  },
  methods: {
    goToRecette(text) {
      alert("click " + text);
    },
    IscomboboxChange(slot) {
      return this.comboboxMenuSelected === slot;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
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

.v-application .accent .accent--text
  

@media only screen and (max-width: 959px)
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label
    display: flex !important
</style>
.
