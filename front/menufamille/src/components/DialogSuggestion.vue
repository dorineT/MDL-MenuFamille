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
        
          <h3 style="margin: 10px">Menu du : {{completeMenu.jour}} {{periode}}  : {{ completeMenu.date}} </h3>
       
          <v-divider ></v-divider>
          


                    <v-card>
                      <v-card-title >
                        Choisissez votre plat ! &#128523; &#127789;
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


            <div v-if="newRecetteChoix!==null">
                  <br>
                Vous avez choisi de suggérer :

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
        recetteChoisie: '',
        comboboxRecetteSelected: null,
        itemRecettes: [
          'lasagne','pate carbo','flammekueche','petite saucisse -pdt','risotto','pizza','frite'
        ],
        
        newRecetteChoix: null,
      }
    },
    created (){
        eventBus.$on('openDialogSuggestion', this.openModal) //listening event form CalendarSuggestion.vue
    },
    destroy (){
        eventBus.$off('openDialogSuggestion') //listening event form CalendarSuggestion.vue
    },
    methods: {
      /** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
        openModal(itemReceived, periode, menuComplet){
            this.dialog = true

            this.infoMenu.id = itemReceived.id
            this.infoMenu.plat = itemReceived.plat
            this.infoMenu.nbPers = itemReceived.nbPers

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
         
            this.recetteChoisie = this.infoMenu.plat
            if(this.infoMenu.plat ==='/'){
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
            this.infoMenu.plat = this.newRecetteChoix    
          }
          
          
          console.log(this.infoMenu) 
          

          this.dialog = false
          this.snackbar = true
          
          // envoi uniquement le menu jour modifie 
          eventBus.$emit('updateMenuSuggestionJour', this.infoMenu, this.periode)
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