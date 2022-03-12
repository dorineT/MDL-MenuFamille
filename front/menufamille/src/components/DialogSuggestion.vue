 <template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
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
          <v-toolbar-title>Suggestion de menu</v-toolbar-title>
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
          <v-subheader>Menu du : {{completeMenu.jour}} {{periode}}  : {{ completeMenu.date}} </v-subheader>
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
                <p v-if="recetteChoisie!==''">Recette prévue : {{recetteChoisie}} </p>
                <p v-else><br></p>
                </v-list-item-title>
   
                     
              </v-list-item-content>


            </v-list-item>
            <v-expand-transition>
              <div>
              <v-container fluid>
                <v-row >
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-card>
                      <v-card-title >
                        la liste des recettes
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
      Menu suggéré sauvegardé !

    </v-snackbar>

  </v-row>
</template>

<script>
import {eventBus } from '../main'
  export default {
    data () {
      return {
        dialog: false,
        infoMenu: {},
        completeMenu:{},
        periode: '',
        snackbar: false,
        timeout: 3000,
        selectedRadioMenuOuiNon:'oui',
        recetteChoisie: '',
        comboboxRecetteSelected: null,
        itemRecettes: [
          'lasagne','pate carbo','flammekueche','petite saucisse -pdt','risotto','pizza','frite'
        ],
   
     
        newRecetteChoix: null,
       
       
    
      

      }
    },
    created (){
        eventBus.$on('openDialog', this.openModal) //listening event form CalendarModificationMenu component
    },
    methods: {
      /** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
        openModal(itemReceived, periode, menuComplet){
            this.dialog = true

            this.infoMenu.id = itemReceived.id
            this.infoMenu.Plat = itemReceived.Plat
            this.infoMenu.NbPers = itemReceived.NbPers

            //find menu dans le tab
            console.log(menuComplet)
            let menuFind = menuComplet.find(el => el.id === this.infoMenu.id)
            this.completeMenu = {
              jour: menuFind.jour,
              date: menuFind.date
            }

            this.periode = periode
            console.log('Données recues par l\'event dans  le modal \n' + JSON.stringify(itemReceived) + ' \n pour ' + periode)

            //menu prévu ?
            this.selectedRadioMenuOuiNon = 'oui'
         
            this.recetteChoisie = this.infoMenu.Plat
            if(this.infoMenu.Plat ==='/'){
              this.selectedRadioMenuOuiNon = 'non'
            }
            
            
            //reset
            this.resetNewRecette()
           

           
        },
        sauvegardeMenuJour(){

          //mise a jour calendrier
          console.log('update item ' + this.infoMenu.id)

          
          if(this.selectedRadioMenuOuiNon === 'non'){
            this.newRecetteChoix = '/'
          }
         //recette
          if(this.newRecetteChoix !== null){
            this.infoMenu.Plat = this.newRecetteChoix    
          }
          
          
          console.log(this.infoMenu) 
          

          this.dialog = false
          this.snackbar = true
          
          // envoi uniquement le menu jour modifie 
          eventBus.$emit('updateMenuJour', this.infoMenu, this.periode)
        },
        resetSelectedSuggestion(){
          this.radioSelectionSuggestion = null
          this.newRecetteChoix = this.comboboxRecetteSelected
        },
       
      resetNewRecette(){
        this.newRecetteChoix = null
        this.comboboxRecetteSelected = null
        this.radioSelectionSuggestion = null
      },
      
    }
  }
</script>

<style lang="sass">
.v-application .primary--text 
    color: #FFB74D !important
    caret-color: #FFB74D  !important

</style>