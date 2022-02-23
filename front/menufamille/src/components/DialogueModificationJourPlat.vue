  <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="#FFB74D"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Modification du menu</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="sauvegardeMenuJour()"
            >
              Sauvegarder
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>        

        <v-list
          
          subheader
        >
          <v-subheader>Menu du : {{infoMenu.jour}} {{periode}}  : {{ infoMenu.date}} </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> Menu prévu pour cette période ? </v-list-item-title>
              <v-list-item-subtitle>
                <v-radio-group
                  v-model="selectedRadioMenuChoose"
                  row
                >
                  <v-radio
                    label="Oui"
                    value="oui"
                    color="orange lighten-2"
                  ></v-radio>
                  <v-radio
                    label="Non"
                    value="non"
                    color="orange lighten-2"
                  ></v-radio>
                </v-radio-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          </v-list>

          <v-divider ></v-divider>
          
          <v-list v-if='selectedRadioMenuChoose==="oui"'>
            <v-list-item >
               <v-expansion-panels >
                <v-expansion-panel >
                  <v-expansion-panel-header>
                    <v-list-item-content>
                      <v-list-item-title>Recette prévue</v-list-item-title>
                      <v-list-item-subtitle> {{recetteChoisie}}    </v-list-item-subtitle>
                    </v-list-item-content>
                     <v-list-item-content>
                      <v-btn outlined >Modifier</v-btn>
                    </v-list-item-content>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Suggestion supplémentaire faites pour le menu 
                    ou choix différent => input list de la liste de recette
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
     <!-- changer pour les expended panel avec advanced delete de la liste-->
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Tags choisis</v-list-item-title>
                <v-list-item-subtitle>
                  <ul>
                    <li>to complete</li>
                  </ul>
                </v-list-item-subtitle>
              </v-list-item-content>            
            </v-list-item>
          </v-list>
        
      </v-card>
    </v-dialog>

<!--Snackbar alert with timeout-->

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"            
      text
      color="orange lighten-2"
    >
      Menu sauvegardé !

    </v-snackbar>

  </v-row>
</template>

<script>
import {eventBus } from '../main'
  export default {
    data () {
      return {
        dialog: false,
        infoMenu: '',
        periode: '',
        snackbar: false,
        timeout: 2000,
        selectedRadioMenuChoose:'oui',
        recetteChoisie: ''
      }
    },
    created (){
        eventBus.$on('openDialog', this.openModal)
    },
    methods: {
        openModal(itemReceived, periode){
            this.dialog = true
            this.infoMenu = itemReceived
            this.periode = periode
            console.log('Données recues par l\'event dans  le modal \n' + JSON.stringify(itemReceived) + ' \n\n pour ' + periode)

            if(itemReceived.Matin ==='/' || itemReceived.Midi ==='/' || itemReceived.Soir ==='/'){
              this.selectedRadioMenuChoose = 'non'
            }

            if(periode === 'matin'){
              this.recetteChoisie = itemReceived.Matin
            }else if(periode === 'midi'){
              this.recetteChoisie = itemReceived.Midi
            }else{
              this.recetteChoisie = itemReceived.Soir
            }

        },
        sauvegardeMenuJour(){
          this.dialog = false
          this.snackbar = true
        }
    }
  }
</script>