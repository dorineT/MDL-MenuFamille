<template>

  <div style="margin: 4px">
      
      <div  style="margin: 4px">Menu à suggérer: {{periodeMenu}} </div>
      
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
          hide-default-footer         
          @page-count="pageCount = $event"
          :page.sync="page"
        > 

          <template v-slot:body>
            <tbody v-if="items.length === 0">
              <td class="nodata" colspan="0">Auncun menu sélectionné</td>
            </tbody>
            <tbody v-else>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsMatin" :key="i+'matin'"> 
 
                 <p v-if="item.plat ==='/'" style="color: red">X</p> 
                <p v-else>
                  <v-btn text @click="goToRecette(item,'matin')">
                      <p v-if="item.plat.length == 0" style="color: green"><v-icon>mdi-plus</v-icon></p>
                      <p v-else>{{ item.plat}} &nbsp; <v-avatar color = "teal" size="22" ><span class="white--text ">{{currentUser.firstname.substr(0,1) + currentUser.lastname.substr(0,1)}}</span></v-avatar> </p> <!-- il faut utiliser des initials-->                             
                      </v-btn>      
                </p>
               <!-- <p v-if="item.nbPers!==null">{{item.nbPers}} personnes</p> --> 
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
                 <p v-if="item.plat ==='/'" style="color: red">X</p> 
              <p v-else>
                <v-btn text @click="goToRecette(item,'midi')">
                    <p v-if="item.plat.length == 0" style="color: green"><v-icon>mdi-plus</v-icon></p>
                    <p v-else>{{item.plat }} &nbsp; <v-avatar color = "teal" size="22" ><span class="white--text ">{{currentUser.firstname.substr(0,1) + currentUser.lastname.substr(0,1)}}</span></v-avatar> </p>                                       
                </v-btn>       
              </p>        
             <!--   <p v-if="item.nbPers!==null">{{item.nbPers}} personnes</p> -->
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'">          
                  <p v-if="item.plat ==='/'" style="color: red">X</p> 
              <p v-else>
                <v-btn  text @click="goToRecette(item,'soir')">
                  <p v-if="item.plat.length == 0" style="color: green"><v-icon>mdi-plus</v-icon></p>
                  <p v-else>{{item.plat }} &nbsp; <v-avatar color = "teal" size="22" ><span class="white--text ">{{currentUser.firstname.substr(0,1) + currentUser.lastname.substr(0,1)}}</span></v-avatar> </p>
                </v-btn> 
              </p>
            <!--    <p v-if="item.nbPers!==null">{{item.nbPers }} personnes </p>  -->
              </td>
            </tr>
            </tbody>
          </template>
        </v-data-table>

      <v-pagination
        v-model="page"
        :length="pageCount"
        color="green"
        @next="nextPageMenu"
        @previous="previousPageMenu"
        @input="changePageEvent"
      ></v-pagination>
    </div>



</template>

<script>
import MenuDao from '../services/api.menu'
import {eventBus } from '../main'
import moment from 'moment'
let menuSuggest = new MenuDao()

export default {
    props:['periodeMenu','menuId'],
    data () {
      return {
        
      headers: [],
      menu: {}, 
        items: [],
        pageCount: 0,
        page: 1,
        nbJourMenu: 0,
        platsMatin:[],
        platsMidi: [],
        platsSoir: []      
         }
    },
   // call api to get the menu 
    async created(){

      console.log(this.menuId + 'menu suggestion crée')
      console.log(this.menu)
      this.menu = await menuSuggest.getSuggestionMenuById(this.menuId) 
      console.log(this.menu)
      this.items = this.menu.calendriers // ! 
      console.log(this.items)
    

     
      let indiceEnd = this.items.length < 7 ? this.items.length : 7
      this.populateHeader(this.items,0,indiceEnd)
      this.fillPlat(this.items,0,indiceEnd)

      eventBus.$on('updateMenuSuggestionJour', this.updateMenuSuggestionJour)
     /* eventBus.$on('saveSuggestion', this.saveSuggestionMenu) */
    },
    destroy(){
     /* eventBus.$off('saveSuggestion') */
      eventBus.$off('updateMenuSuggestionJour')
    },
    
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods:{
      //// Affichage calendrier ///
      goToRecette(item){      
        let searchMenu = this.items.find(element => element.id_calendrier === item.idJour) //! pas de id_jour dans BD
        console.log(searchMenu)
        let searchPeriode = searchMenu.calendrier_recettes.find(element => element.id_periode === item.id_periode)
          //open dialogue with even bus
          eventBus.$emit('openDialogSuggestion', searchPeriode , searchMenu.date)
        },
      populateHeader(menu,iStart, iEnd){ 
        this.headers = []
        this.nbJourMenu = 0       
        // 7 jour max display dans le cal        
        while(this.nbJourMenu < 7 & iStart < menu.length & iStart < iEnd){
          let jourPlat = menu[iStart]
          this.headers.push({
              text: moment(jourPlat.date,'DD-MM-YYYY').locale('fr').format('dddd') + '\n' + jourPlat.date, 
              align: 'center',
              value: jourPlat.id_calendrier
          })
          iStart++
          this.nbJourMenu++
        }
      },
      /* remplir les différents tableaux avec les repas par separation, matin - midi -soir*/
      fillPlat(menu,iStart, iEnd){    
        
        this.platsMatin = []
        this.platsMidi = []
        this.platsSoir = []

        while(iStart<iEnd & iStart<menu.length){
          let jourPlat = menu[iStart]
          let periodeId = jourPlat.calendrier_recettes[0]
          

          this.platsMatin.push({
            idJour: jourPlat.id_calendrier,
            id_periode: periodeId.id_periode,
            plat: periodeId.suggestions.length !== 0 ? periodeId.suggestions[0].recette.nom : periodeId.suggestions,
            nbPers: periodeId.nb_personne,
          })

          periodeId = jourPlat.calendrier_recettes[1]
          this.platsMidi.push({
            idJour: jourPlat.id_calendrier,
            id_periode: periodeId.id_periode,
            plat: periodeId.suggestions.length !== 0 ? periodeId.suggestions[0].recette.nom : periodeId.suggestions,
            nbPers: periodeId.nb_personne,
          })

          periodeId = jourPlat.calendrier_recettes[2]
          this.platsSoir.push({
            idJour: jourPlat.id_calendrier,
            id_periode: periodeId.id_periode,
            plat: periodeId.suggestions.length !== 0 ? periodeId.suggestions[0].recette.nom : periodeId.suggestions,
            nbPers: periodeId.nb_personne,
          })

          iStart++
        }      
      },
      //event quand on clique sur page suivante
      nextPageMenu(){
        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7     
        this.populateHeader(this.items, iStart, iEnd)
        this.fillPlat(this.items,iStart,iEnd)
      },
      //event quand on clique sur page precedente
      previousPageMenu(){   // p1 : 0 -> 7 (6)   , P2 : 7 -> 14 (13) 
        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7     
        this.populateHeader(this.items, iStart, iEnd)
        this.fillPlat(this.items,iStart,iEnd)
      },
      changePageEvent(newPage){
        let iStart = (newPage-1) * 7
        let iEnd = newPage * 7      
        this.populateHeader(this.items, iStart, iEnd)
        this.fillPlat(this.items,iStart,iEnd)
      },

      /// UPDATE CALENDRIER////

      updateMenuSuggestionJour(item){
        console.log('test update suggestion')
        console.log(item)
        let menuJourOld = this.items.find( elem => elem.id_calendrier === item.id_calendrier)
        let menuPeriodeOld =  menuJourOld.calendrier_recettes.find(element => element.id_periode === item.id_periode)
        
        let storePeriode = structuredClone(menuPeriodeOld)

        console.log(menuJourOld)
        console.log(menuPeriodeOld)

        if(item.periode === 'matin'){
          menuJourOld.calendrier_recettes[0] = structuredClone(item)   //! changer dans les suggestions
          /*menuJourOld.matinNbPers = menuJour.nbPers*/
        }
        else if(periode === 'midi'){
          menuJourOld.calendrier_recettes[1] = structuredClone(item)
         // menuJourOld.midiNbPers = menuJour.nbPers
        }
        else if(periode === 'soir'){
          menuJourOld.calendrier_recettes[2] = structuredClone(item)
         // menuJourOld.soirNbPers = menuJour.nbPers
        }

        console.log(menuJourOld + 'après mise à jour')

        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7              
        this.fillPlat(this.items,iStart,iEnd)
        },

        saveSuggestionMenu(){
          eventBus.$emit('postSuggestion', this.menu)
        }

    }
}
</script>


<style lang="sass">

.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>