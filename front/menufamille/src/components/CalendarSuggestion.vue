<template>

  <div style="margin: 4px">
      
      <div  style="margin: 4px">Menu à suggérer: {{periodeMenu}} </div>
      
      <v-data-table
            :headers="headers"
            :items="items"                                  
            class="suggTable"
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
                <v-btn text @click="goToRecette(item,'matin')">
                    <p v-if="item.Plat === ''" style="color: green"><v-icon>mdi-plus</v-icon></p>
                    <p v-else-if="item.Plat !=='/'">{{ item.Plat }} </p>
                    <p v-else style="color: red">X</p>                      
                  </v-btn>                     
                <p v-if="item.NbPers!==null">{{item.NbPers}} personnes</p> 
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
                <v-btn text @click="goToRecette(item,'midi')">
                    <p v-if="item.Plat === ''" style="color: green"><v-icon>mdi-plus</v-icon></p>
                    <p v-else-if="item.Plat!=='/'">{{ item.Plat }} </p>
                    <p v-else style="color: red">X</p>                                        
                </v-btn>               
                <p v-if="item.NbPers!==null">{{item.NbPers}} personnes</p> 
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'"> 
                <v-btn  text @click="goToRecette(item,'soir')">
                  <p v-if="item.Plat === ''" style="color: green"><v-icon>mdi-plus</v-icon></p>
                  <p v-else-if="item.Plat!=='/'">{{ item.Plat }} </p>
                  <p v-else style="color: red">X</p>
                </v-btn> 
                <p v-if="item.NbPers!==null">{{item.NbPers }} personnes </p>  
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
import {eventBus } from '../main'
export default {
    props:['periodeMenu'],
    data () {
      return {headers: [],
      menu: {          
          menu_id: 1,
          plats: [
            {
              id:10,
              jour: 'Lundi',
              date: '7/03',
              Matin: '/',
              MatinNbPers:null,
              Midi: '',
              MidiNbPers: null,
              Soir: '',
              SoirNbPers: null
            },
            {
              id:11,
              jour: 'Mardi',
              date: '8/03',
              Matin: '',
              MatinNbPers: null,
              Midi: '',
              MidiNbPers: null,
              Soir: '',
              SoirNbPers: null,
            },
            {
              id:12,
              jour: 'Mercredi',
              date: '9/03',
              Matin: '/',
              MatinNbPers:null,
              Midi: '/',
              MidiNbPers: null,
              Soir: '/',
              SoirNbPers: null,
            },
            {
              id:13,
              jour: 'Jeudi',
              date: '10/03',
              Matin: '',
              MatinNbPers:null,
              Midi: '',
              MidiNbPers: null,
              Soir: '',            
              SoirNbPers: null,
            },
            {
              id:14,
              jour: 'Vendredi',
              date: '11/03',
              Matin: '',
              MatinNbPers:null,
              Midi: '',
              MidiNbPers: null,
              Soir: '',
              SoirNbPers: null,
            }
          ],
          dateDebut: '7/03/2022',
          dateFin: '11/03/2022',
          verrou: true            
        },
        items: [],
        pageCount: 0,
        page: 1,
        nbJourMenu: 0,
        platsMatin:[],
        platsMidi: [],
        platsSoir: []      
         }
    },
    mounted(){
        console.log('des choses a faire avec l\'api')
        this.items = this.menu.plats

        let indiceEnd = this.items.length < 7 ? this.items.length : 7       
        this.populateHeader(this.items,0,indiceEnd)
        this.fillPlat(this.items,0,indiceEnd) 
        // call api to get the menu ou pas besoin
    },
    created(){
      eventBus.$on('updateMenuJour', this.updateMenuJour)
    },
    methods:{
      //// Affichage calendrier ///
      goToRecette(item,periode){
          console.log('click recette calendar ' + periode)
          //open dialogue with even bus
          eventBus.$emit('openDialog', item, periode, this.items)
        },
      populateHeader(menu,iStart, iEnd){ 
        this.headers = []
        this.nbJourMenu = 0       
        // 7 jour max display dans le cal        
        while(this.nbJourMenu < 7 & iStart < menu.length & iStart < iEnd){
          let jourPlat = menu[iStart]
          this.headers.push({
              text: jourPlat.jour + '\n' + jourPlat.date, 
              align: 'center',
              value: jourPlat.id
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

          this.platsMatin.push({
            id: jourPlat.id,
            Plat: jourPlat.Matin,
            NbPers: jourPlat.MatinNbPers
          })

          this.platsMidi.push({
            id: jourPlat.id,
            Plat: jourPlat.Midi,
            NbPers: jourPlat.MidiNbPers
          })

          this.platsSoir.push({
            id: jourPlat.id,
            Plat: jourPlat.Soir,
            NbPers: jourPlat.SoirNbPers
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

      /// UPDATE CALENDRIER  à corriger////

      updateMenuJour(menuJour, periode){
        console.log(menuJour)
        console.log(periode)

       
        let menuJourOld = this.menus.plats.find( elem => elem.id === menuJour.id)
        console.log('menu trouve ' + menuJourOld)

        if(periode === 'matin'){
          menuJourOld.Matin = menuJour.Plat
          menuJourOld.MatinNbPers = menuJour.NbPers
        }
        else if(periode === 'midi'){
          console.log('midi up')
          console.log(this.menu.plats)
          menuJourOld.Midi = menuJour.Plat
          menuJourOld.MidiNbPers = menuJour.NbPers
        }
        else if(periode === 'soir'){
          menuJourOld.Soir = menuJour.Plat
          menuJourOld.SoirNbPers = menuJour.NbPers
        }

        let iStart = (this.page-1) * 7
        let iEnd = this.page * 7              
        this.fillPlat(this.items,iStart,iEnd)
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