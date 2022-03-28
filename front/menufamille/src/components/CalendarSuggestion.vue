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
              <h4 v-if="item.plat!=='' & item.plat !== '/'">{{ item.plat }} </h4>
              <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
              <v-btn v-else text @click="goToRecette(item)">
                <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>     
                <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>                             
              </v-btn>                 
              <p v-if="item.nbPers!==null & item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p> 
            </td>
          </tr>
          <tr>
            <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
              <h4 v-if="item.plat!=='' & item.plat !== '/'">{{ item.plat }} </h4>
              <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
              <v-btn v-else text @click="goToRecette(item)">
                <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>     
                <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>                             
              </v-btn>          
              <p v-if="item.nbPers!==null & item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p> 
            </td>
          </tr>
          <tr>
            <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'"> 
              <h4 v-if="item.plat!=='' & item.plat !== '/'">{{ item.plat }} </h4>
              <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
              <v-btn v-else text @click="goToRecette(item)">
                <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>     
                <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>                             
              </v-btn> 
              <p v-if="item.nbPers!==null && item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers }} personnes </p>  
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
        nbPersonneFamille: null,
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
      this.menu = await menuSuggest.getMenuById(this.menuId) 
      this.nbPersonneFamille = this.$store.state.info.nbMembreActuel

      this.items = this.menu.calendriers
      let indiceEnd = this.items.length < 7 ? this.items.length : 7       

      this.populateHeader(this.items,0,indiceEnd)
      this.fillPlat(this.items,0,indiceEnd)     
      eventBus.$on('updateMenuSuggestionJour', this.updateMenuSuggestionJour)     
    },
    destroy(){
      //eventBus.$off('updateMenuSuggestionJour')
    },
    methods:{
      //// Affichage calendrier ///
      goToRecette(item){      
          let menuFind = this.items.find(el => el.id_calendrier === item.id_jour)// le jour         
          let periodeFind = menuFind.calendrier_recettes.find(el => el.id_periode === item.id_periode)  
          console.log(periodeFind) 
          //open dialogue with even bus
          eventBus.$emit('openDialogSuggestion', periodeFind, menuFind.date)
        },
      populateHeader(menu,iStart, iEnd){ 
        this.headers = []
        this.nbJourMenu = 0       
        // 7 jour max display dans le cal        
        while(this.nbJourMenu < 7 & iStart < menu.length & iStart < iEnd){
          let jourPlat = menu[iStart]
          this.headers.push({
              text: moment(jourPlat.date, 'DD-MM-YYYY').locale('fr').format('dddd') + '\n' + jourPlat.date, 
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

          let periode = jourPlat.calendrier_recettes[0]
          this.platsMatin.push({
            id_jour: jourPlat.id_calendrier,
            id_periode: periode.id_periode,
            plat: periode.recette !== null ? periode.recette.nom : (periode.is_recette ? "" : "/"), // can be null
            nbPers: periode.nb_personne,
            tags: periode.tags
          })

          periode = jourPlat.calendrier_recettes[1]
          this.platsMidi.push({
            id_jour: jourPlat.id_calendrier,
            id_periode: periode.id_periode,
            plat: periode.recette !== null ? periode.recette.nom : (periode.is_recette ? "" : "/"), 
            nbPers: periode.nb_personne,
            tags: periode.tags
          })

          periode = jourPlat.calendrier_recettes[2]
          this.platsSoir.push({
            id_jour: jourPlat.id_calendrier,
            id_periode: periode.id_periode,
            plat: periode.recette !== null ? periode.recette.nom : (periode.is_recette ? "" : "/"),
            nbPers: periode.nb_personne,
            tags: periode.tags
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
        /*let menuJourOld = this.items.find( elem => elem.id_calendrier === item.id_calendrier)
        let menuPeriodeOld =  menuJourOld.calendrier_recettes.find(element => element.id_periode === item.id_periode)
        
        //let storePeriode = structuredClone(menuPeriodeOld)

        console.log(menuJourOld)
        console.log(menuPeriodeOld)

        if(item.periode === 'matin'){
          menuJourOld.calendrier_recettes[0] = structuredClone(item)   //! changer dans les suggestions
          /*menuJourOld.matinNbPers = menuJour.nbPers
        }
        else if(item.periode === 'midi'){
          menuJourOld.calendrier_recettes[1] = structuredClone(item)
         // menuJourOld.midiNbPers = menuJour.nbPers
        }
        else if(item.periode === 'soir'){
          menuJourOld.calendrier_recettes[2] = structuredClone(item)
         // menuJourOld.soirNbPers = menuJour.nbPers
        }

        console.log(menuJourOld + 'après mise à jour')

        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7              
        this.fillPlat(this.items,iStart,iEnd)*/
        },
    }
}
</script>


<style lang="sass">

.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center
</style>