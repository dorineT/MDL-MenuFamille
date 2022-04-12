<template>

  <div style="margin: 4px">
      
      <div  style="margin: 4px">Menu : {{periodeMenu}} </div>
      
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
              <td class="tdplat"> <strong>Matin</strong> </td>
              <td class="tdplat" v-for="(item,i) in platsMatin" :key="i+'matin'"> 
                <v-btn text @click="goToRecette(item)">

                    <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>
                    <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>
                    <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
                    <p v-else>{{ item.plat }} </p>                   

                  </v-btn>                     
                <p v-if="item.nbPers!==null & item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p> 
              </td>
            </tr>
            <tr> 
              <td class="tdplat"> <strong>Midi</strong> </td>
              <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
                <v-btn text @click="goToRecette(item)">
                    <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>
                  <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>
                  <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
                  <p v-else>{{ item.plat }} </p>                                    
                </v-btn>               
                <p v-if="item.nbPers!==null & item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p> 
              </td>
            </tr>
            <tr> 
              <td class="tdplat"> <strong>Soir</strong> </td>
              <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'"> 
                <v-btn  text @click="goToRecette(item)">
                  <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>     
                  <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>             
                  <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
                  <p v-else>{{ item.plat }} </p>
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
        class="marginClass"
      ></v-pagination>

      <v-container grid-list-xs fluid>
        Contraintes sur le nombre de plats autorisés
        <v-row class="paddingclass">
          <v-col>
            <v-card class="paddingclass" xs="12" sm="4" lg="4" xl="4">
              <v-card-title>Matin</v-card-title>
              <v-text-field
                type="number"
                step="any"
                min="0"
                ref="input"
                :rules="nbPlatRule"
                v-model.number="menu.plat_identique_matin"                            
              ></v-text-field>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="paddingclass" xs="12" sm="4" lg="4" xl="4">
               <v-card-title>Midi</v-card-title>
              <v-text-field
                type="number"
                step="any"
                min="0"
                ref="input"
                :rules="nbPlatRule"
                v-model.number="menu.plat_identique_midi"                            
              ></v-text-field>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="paddingclass" xs="12" sm="4" lg="4" xl="4">
               <v-card-title>Soir</v-card-title>
              <v-text-field
                type="number"
                step="any"
                min="0"
                ref="input"
                :rules="nbPlatRule"
                v-model.number="menu.plat_identique_soir"                            
              ></v-text-field>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="errorMessage.error" text color="red">
        {{ errorMessage.message }}
      </v-snackbar>
    </div>

</template>

<script>
import {eventBus } from '../main'
import checkContrainte from '../services/checkContrainteMenu'

import MenuDAO from '../services/api.menu'
import moment from 'moment'
let DAOMenu = new MenuDAO()

export default {
    props:['periodeMenu','idMenu'],
    data () {
      return {
        headers: [],
        menu: {},
        items: [],
        pageCount: 0,
        page: 1,
        nbPersonneFamille: null,
        nbJourMenu: 0,
        platsMatin:[],
        platsMidi: [],
        platsSoir: [],
        errorMessage: {
          message: "",
          error: false,
        }, 
        
        nbPlatRule: [								    
          v => (v >= 0) || 'Chiffre supérieur positif ou 0',
        ],
        
      }
    },
    mounted(){       
      
      DAOMenu.getMenuById(this.idMenu).then(
        (response) => {
          this.menu = response.data
          this.menu.plat_identique_matin = this.menu.plat_identique_matin === -1 ? null : this.menu.plat_identique_matin
          this.menu.plat_identique_midi = this.menu.plat_identique_midi === -1 ? null : this.menu.plat_identique_midi
          this.menu.plat_identique_soir = this.menu.plat_identique_soir === -1 ? null : this.menu.plat_identique_soir
          
          this.items = this.menu.calendriers
          let indiceEnd = this.items.length < 7 ? this.items.length : 7       
          this.populateHeader(this.items,0,indiceEnd)
          this.fillPlat(this.items,0,indiceEnd) 

          this.nbPersonneFamille = this.$store.state.info.nbMembreActuel
        }
      )
      

      eventBus.$on('updateMenuJour', this.updateMenuJour)
      eventBus.$on('validationModification', this.valideMenu)
      eventBus.$on('saveModification', this.saveMenu)
    },
    destroy(){
      eventBus.$off('validationModification')
      eventBus.$off('updateMenuJour')
      eventBus.$off('saveModification')
    },
    methods:{
      //// Affichage calendrier ///
      goToRecette(item){    
          let menuFind = this.items.find(el => el.id_calendrier === item.id_jour)// le jour         
          let periodeFind = menuFind.calendrier_recettes.find(el => el.id_periode === item.id_periode)      

          //open dialogue with even bus
          eventBus.$emit('openDialog', periodeFind, menuFind.date)
        },
      populateHeader(menu,iStart, iEnd){ 
        this.headers = [{text: 'Période', align:'center'}]
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

      /// UPDATE CALENDRIER ////

      updateMenuJour(item){  
            
        let menuJourOld = this.items.find( elem => elem.id_calendrier === item.id_calendrier)
        let menuPeriodeOld = menuJourOld.calendrier_recettes.find(elem => elem.id_periode === item.id_periode)
        this.errorMessage.message = ""

        //copy all attribute from menuPeriodeOld to periodeSave
        //let periodeSave = JSON.parse(JSON.stringify(menuPeriodeOld))
        //or (new)
        let periodeSave = structuredClone(menuPeriodeOld)    

        if(item.periode === 'matin'){
          menuJourOld.calendrier_recettes[0] = structuredClone(item)
          if(this.menu.plat_identique_matin !== null){
            this.errorMessage.message = checkContrainte.verifContraintePlat(this.items, this.menu.plat_identique_matin, 0);
          }
        }
        else if(item.periode === 'midi'){
          menuJourOld.calendrier_recettes[1] = structuredClone(item)
          if(this.menu.plat_identique_midi !== null){
            this.errorMessage.message = checkContrainte.verifContraintePlat(this.items, this.menu.plat_identique_midi, 1);
          }
        }
        else if(item.periode === 'soir'){
          menuJourOld.calendrier_recettes[2] = structuredClone(item)
          if(this.menu.plat_identique_soir !== null){
            this.errorMessage.message = checkContrainte.verifContraintePlat(this.items, this.menu.plat_identique_soir, 2);
          }
        }

        if (this.errorMessage.message !== "") {           			
          this.errorMessage.error = true
          menuPeriodeOld = periodeSave     

        } else {        
          let iStart = (this.page-1) * 7
          let iEnd = this.page * 7              
          this.fillPlat(this.items,iStart,iEnd)
          this.errorMessage.error = false		
          
          // sendPeriodeUpdate
          DAOMenu.sendPeriodeUpdate(item)
        }

      },
      valideMenu(){
        this.menu.verrou = true
        eventBus.$emit('postMenuModification', this.menu)
      },
      saveMenu(){
        eventBus.$emit('postMenuModification', this.menu)
      }
      
    }
}
</script>


<style lang="sass">

.v-data-table
  white-space: pre-wrap

.tdplat
  text-align: center

.paddingclass
  padding: 10px

.marginClass
  margin-top: 20px
  margin-bottom: 20px  
</style>