<template>

  <div style="margin: 4px">

    <v-select
      color="orange lighten-2"
      label="Choix du menu"
      class="combobox-class"
      no-data-text="Aucun menu disponible"
      :items="itemPeriode"      
      v-model="comboboxMenuSelected"></v-select>


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
            <tr> Matin
              <td class="tdplat" v-for="(item,i) in platsMatin" :key="i+'matin'"> 
                  <v-btn v-if="item.plat!=='/'" text @click="goToRecette(item.plat)">{{ item.plat }} </v-btn>
                  <p v-else style="color: red">

                    <v-icon color="red">mdi-close-thick</v-icon>
                  </p>
                  <p v-if="item.nbPers!==null && item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p> 
              </td>
            </tr>
            <tr> Midi
              <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
                <v-btn v-if="item.plat!=='/'" text @click="goToRecette(item.plat)">{{ item.plat }}</v-btn> 
                <p v-else style="color: red">

                  <v-icon color="red">mdi-close-thick</v-icon>
                </p>
                <p v-if="item.nbPers!==null && item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p>                  
              </td>
            </tr>
            <tr> Soir
              <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'"> 
                  <v-btn v-if="item.plat!=='/'" text @click="goToRecette(item.plat)">{{ item.plat }} </v-btn> 
                  <p v-else style="color: red">

                    <v-icon color="red">mdi-close-thick</v-icon>
                  </p>
                  <p v-if="item.nbPers!==null && item.nbPers !== nbPersonneFamille & item.plat !== '/'">{{item.nbPers}} personnes</p> 
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
    </div>

</template>

<script>
import MenuDao from './../services/api.menu'
import moment from 'moment'
let DAOMenu = new MenuDao()
  export default {
    data () {
      return {
        headers: [],
        items:[],        
        menus: null,
        itemPeriode: [],
        comboboxMenuSelected: null,
        pageCount: 0,
        page: 1,
        nbJourMenu: 0,
        platsMatin:[],
        platsMidi: [],
        platsSoir: [],
        nbPersonneFamille: 1
      }
    },

    async created () {
      console.log(this.$vuetify.breakpoint.width)
      this.comboboxMenuSelected='Aucun menu sélectionné'   
      this.nbPersonneFamille = this.$store.state.info.nbMembreActuel

      if(this.$store.state.info.idFamilleActuel !== null){
        this.menus = await DAOMenu.getMenuLock(this.$store.state.info.idFamilleActuel)

        this.menus.forEach(menu => {         
            let periodeNew = { 
                text: menu.periode_debut + ' - ' +menu.periode_fin,
                value: menu.id_menu
              }     
            this.itemPeriode.push(periodeNew)        
        });
      }

    },
    watch:{
        async comboboxMenuSelected(slot){           
        if(slot === 'Aucun menu sélectionné'){           
          this.items = []
        }
        else{ //check période des menus
           
           if(this.menus === null){
            this.menus = await DAOMenu.getMenuLock(this.$store.state.info.idFamilleActuel)
           }
           console.log(this.menus)
          //get id du menu
          this.headers = []
          this.platsMatin  = []
          this.platsMidi  = []
          this.platsSoir = []
          this.nbJourMenu = 0    
          let menuSelected = this.menus.find(menu => menu.id_menu === slot)  
          
          this.items = menuSelected.calendriers
          console.log(this.items)

          let indiceEnd = this.items.length < 7 ? this.items.length : 7       
          this.populateHeader(this.items,0,indiceEnd)
          this.fillPlat(this.items,0,indiceEnd)   

        }
      }
    },
    methods:{
      goToRecette(text){
          alert('Bientot disponible ' + text)
        },
      IscomboboxChange(slot){        
        return this.comboboxMenuSelected === slot
      },
      //remplir le header de la table avec les jours de la semaine du menu sélectionné
      populateHeader(menu,iStart, iEnd){ 
        this.headers = ['']
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
          console.log(jourPlat)
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
      }
    }
}
</script>


<style lang="sass">

.v-data-table
  white-space: pre-wrap

@media (min-width: 601px)
  .combobox-class
    margin: 20px,
    width: 7cm

@media (max-width: 600px)
  .combobox-class
    margin: 10px

.tdplat
  text-align: center

.v-application .primary--text 
  color: #FFB74D !important
  caret-color: #FFB74D  !important

.nodata
  text-align: center
  padding: 5px
  color: grey

.marginClass
  margin-top: 20px
  margin-bottom: 20px  

.v-data-table > 
  border-left: thin solid

</style>