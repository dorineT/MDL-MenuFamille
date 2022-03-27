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
        
          <h3 style="margin: 10px">Menu du : {{jourSemaine}} {{periode}}  : {{date}} </h3>
       
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
                        item-text="nom"
                        return-object
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
                    {{newRecetteChoix.nom}}
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
import moment from 'moment'
import RecetteDAO from '../services/api.recette'

let DAORecette = new RecetteDAO()

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
        itemRecettes: [], 
        newRecetteChoix: null,
        jourSemaine: null,
        date: null,

      }
    },
    created (){
        eventBus.$on('openDialogSuggestion', this.openModal) //listening event form CalendarSuggestion.vue
    },
    destroyed (){
        eventBus.$off('openDialogSuggestion') //listening event form CalendarSuggestion.vue
    },

    
    methods: {
      /** evenement modification d'une periode, recupération et affichage des informations du menu sur une période */
        async openModal(itemReceived, dateJournée){
            this.dialog = true

            this.infoMenu.id = itemReceived.id
            this.infoMenu.plat = itemReceived.plat
            this.infoMenu.nbPers = itemReceived.nbPers

            // à completer
            this.date = dateJournée;
            this.jourSemaine = moment(dateJournée,'DD-MM-YYYY').locale('fr').format('dddd')
            console.log(this.jourSemaine)
            this.periode = itemReceived.periode;

            // charge toutes les recettes avec leur tags
            this.itemRecettesAll= await DAORecette .getAll()
            console.log(this.itemRecettesAll)
            this.itemRecettes = this.copyTab(this.itemRecettesAll)
            console.log(this.itemRecettes)

            //find menu dans le tab
            //console.log(menuComplet)
           // let menuFind = menuComplet.find(el => el.id === this.infoMenu.id)
           /* console.log(menuFind)
            this.completeMenu = {
              jour: menuFind.jour,
              date: menuFind.date
            }

           
            console.log('Données recues par l\'event dans  le modal \n' + JSON.stringify(itemReceived) + ' \n pour ' + periode)
*/
            //menu prévu ?
          /*  this.selectedRadioMenuOuiNon = 'oui'
         
            this.recetteChoisie = this.infoMenu.plat
            if(this.infoMenu.plat ==='/'){
              this.selectedRadioMenuOuiNon = 'non'
            }
           */ 
            
            //reset
            this.resetNewRecette()
           

           
        },
        sauvegardeMenuJour(){

          //mise a jour calendrier
          console.log('update item ' + this.infoMenu.id)

          /*
          if(this.selectedRadioMenuOuiNon === 'non'){  
            this.newRecetteChoix = '/'
          } */
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
      /**Copier un tableau - superficielle
			 * (uniquement les tab contenant des objets qui ne sont pas destinés à être modifiés) */
			copyTab(source){
				let cible = []
				if(source === null ) return []

				source.forEach(elem => {
					cible.push(elem)
				})
				return cible
			},
      
    }
  }
</script>

<style lang="sass">
.v-application .primary--text 
    color: #FFB74D !important
    caret-color: #FFB74D  !important

</style>