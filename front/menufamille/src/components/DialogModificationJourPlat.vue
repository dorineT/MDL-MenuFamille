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
                  v-model="selectedRadioMenuOuiNon"
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
          
          <v-list v-if='selectedRadioMenuOuiNon==="oui"'>
            <v-list-item >
              <v-list-item-content>

                <v-list-item-title>
                   Recette prévue : {{recetteChoisie}} 

                   <v-btn
                    outlined
                    rounded
                    small
                    color="orange lighten-2"
                    class="btnInlist "
                    @click="showModifMenu = !showModifMenu"
                  >Modifier</v-btn>
                </v-list-item-title>
   
                <div v-if="newRecetteChoix!==null">
                  <br>
                Vous avez choisi de remplacer le menu par : 

                  <v-chip                   
                    class="ma-2"
                    close
                    color="orange"
                    label
                    outlined
                    @click:close="resetNewRecette()"
                  >
                    {{newRecetteChoix}}
                  </v-chip>
                </div>               
              </v-list-item-content>


            </v-list-item>
            <v-expand-transition>
              <div v-show="showModifMenu">
              <v-container fluid>
                <v-row  >
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  
                    <v-card>
                      <v-card-title >
                        Suggestion
                      </v-card-title>
                      <v-card-text>
                        <v-radio-group v-model="radioSelectionSuggestion" @change="changeChoixPlat()">
                          <v-radio
                            v-for="(sugg,n) in suggestions"
                            :key="n"
                            :label="sugg"
                            :value="sugg"
                            color="orange lighten-2"
                          ></v-radio>
                        </v-radio-group>
                      </v-card-text>
                    </v-card>

                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-card>
                      <v-card-title >
                        Choix parmis la liste de recettes
                      </v-card-title>
                      <v-card-text>
                        <v-autocomplete
                        color="orange lighten-2"
                        label="Recette"                      
                        :items="itemRecettes"      
                        v-model="comboboxRecetteSelected"
                        @change="resetSelectedSuggestion()"
                        no-data-text="Aucune recette correspondante"></v-autocomplete>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              </div>
            </v-expand-transition>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Tags choisis</v-list-item-title>
                <v-col xl="6" md="6" sm="6" xs="12">
                  <v-autocomplete
                    chips
                    clearable
                    deletable-chips
                    multiple
                    :items="tagsListe"
                    v-model="tagRecetteChoix"
                    color="orange lighten-2"                  
                    no-data-text="Aucun tag correspondant"
                  ></v-autocomplete>  
                </v-col>    
              </v-list-item-content>            
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nombre de personnes</v-list-item-title>
                 <v-col xl="6" md="6" sm="6" xs="12">
                  <v-text-field 
                    type="number"   
                    step="1"
                    min="0"
                    ref="input"
                    :rules="[numberRule]"
                    v-model="numberPersonneNew"
                    clearable                                 
                  ></v-text-field>
                </v-col>  
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
        timeout: 3000,
        selectedRadioMenuOuiNon:'oui',
        recetteChoisie: '',
        showModifMenu: false,
        comboboxRecetteSelected: null,
        itemRecettes: [
          'lasagne','pate carbo','flammekueche'
        ],
        suggestions:['petite saucisse - pdt', 'risotto'],
        radioSelectionSuggestion: null,
        newRecetteChoix: null,
        tagsListe: ['soupe','lunch-box','light','épicé','gaterie / sucre','calorie hight'],
        tagRecetteChoix: null,
        numberPersonneNew: null,
        numberPersonneOld: null

      }
    },
    created (){
        eventBus.$on('openDialog', this.openModal) //listening event form CalendarModificationMenu component
    },
    methods: {
      /** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
        openModal(itemReceived, periode){
            this.dialog = true
            this.infoMenu = itemReceived
            this.periode = periode
            console.log('Données recues par l\'event dans  le modal \n' + JSON.stringify(itemReceived) + ' \n\n pour ' + periode)

            //quelle periode  + menu prévu ?
            if(periode === 'matin'){
              this.recetteChoisie = itemReceived.Matin
              this.numberPersonneOld = itemReceived.MatinNbPers
              if(itemReceived.Matin ==='/'){
                this.selectedRadioMenuOuiNon = 'non'
              }
            }else if(periode === 'midi'){
              this.recetteChoisie = itemReceived.Midi
              this.numberPersonneOld = itemReceived.MidiNbPers
               if(itemReceived.Midi ==='/'){
                this.selectedRadioMenuOuiNon = 'non'
              }
            }else{
              this.recetteChoisie = itemReceived.Soir
              this.numberPersonneOld = itemReceived.SoirNbPers
               if(itemReceived.Soir ==='/'){
                this.selectedRadioMenuOuiNon = 'non'
              }
            }
            
            //reset
            this.resetNewRecette()
            this.tagRecetteChoix = null

            //set nb perso            
            this.numberPersonneNew = this.numberPersonneOld
        },
        sauvegardeMenuJour(){

          //mise a jour calendrier
          console.log('update item ' + this.infoMenu.id)

          
          if(this.selectedRadioMenuOuiNon === 'non'){
            this.newRecetteChoix = '/'
          }
         //recette
          if(this.newRecetteChoix !== null){
            if(this.periode === 'matin'){
              this.infoMenu.Matin = this.newRecetteChoix         
            }
            else if(this.periode === 'midi'){
              this.infoMenu.Midi = this.newRecetteChoix
            
            }else if(this.periode === 'soir'){
              this.infoMenu.Soir = this.newRecetteChoix                   
            }    
          }
          //number
          if(this.numberPersonneNew !== this.numberPersonneOld){
            if(this.numberPersonneNew < 0 ){              
              return false
            }
            if(this.periode === 'matin'){         
              this.infoMenu.MatinNbPers = this.numberPersonneNew        
            }
            else if(this.periode === 'midi'){           
              this.infoMenu.MatinNbPers = this.numberPersonneNew   
            
            }else if(this.periode === 'soir'){       
              this.infoMenu.MatinNbPers = this.numberPersonneNew              
            }    
          }
    

          this.dialog = false
          this.snackbar = true

          eventBus.$emit('updateMenuJour', this.infoMenu, this.periode)
        },
        resetSelectedSuggestion(){
          this.radioSelectionSuggestion = null
          this.newRecetteChoix = this.comboboxRecetteSelected
        },
        changeChoixPlat(){
          this.comboboxRecetteSelected = null
          this.newRecetteChoix = this.radioSelectionSuggestion
      },
      resetNewRecette(){
        this.newRecetteChoix = null
        this.comboboxRecetteSelected = null
        this.radioSelectionSuggestion = null
      },
      /**verifie que le nombre de personnes entre dans le textfiel est positif */
      numberRule: val => {
        if(val < 0) return 'Entrez un nombre un nombre positif'
        return true
      }
    }
  }
</script>

<style lang="sass">
.v-application .primary--text 
    color: #FFB74D !important
    caret-color: #FFB74D  !important

</style>
