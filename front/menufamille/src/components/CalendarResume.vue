<template>

  <div style="margin: 4px">

    <v-select
      color="orange lighten-2"
      label="Choix du menu"
      class="combobox-class"
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
            <tr>
              <td class="tdplat" v-for="(item,i) in platsMatin" :key="i+'matin'"> 
                  <v-btn v-if="item.Matin!=='/'" text @click="goToRecette(item.Matin)">{{ item.Matin }} </v-btn>
                  <p v-else style="color: red">X</p>
                  <p v-if="item.MatinNbPers!==null">{{item.MatinNbPers}} personnes</p> 
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
                <v-btn v-if="item.Midi!=='/'" text @click="goToRecette(item.Midi)">{{ item.Midi }}</v-btn> 
                <p v-else style="color: red">X</p>
                <p v-if="item.MidiNbPers!==null">{{item.MidiNbPers}} personnes</p>                  
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'"> 
                  <v-btn v-if="item.Soir!=='/'" text @click="goToRecette(item.Soir)">{{ item.Soir }} </v-btn> 
                  <p v-else style="color: red">X</p>
                  <p v-if="item.SoirNbPers!==null">{{item.SoirNbPers}} personnes</p> 
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
  export default {
    data () {
      return {
        headers: [],
        items:[],
        menus: [
          {
            menu_id:0,
            plats: [
              {
                id:0,
                jour: 'Lundi',
                date: '14/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'pain',
                SoirNbPers: null
              },
              {
                id:1,
                jour: 'Mardi',
                date: '15/02',
                Matin: 'crepe',
                MatinNbPers: null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'lasagne',
                SoirNbPers: null,
              },
              {
                id:2,
                jour: 'Mercredi',
                date: '16/02',
                Matin: '/',
                MatinNbPers:null,
                Midi: 'pain',
                MidiNbPers: null,
                Soir: 'canard',
                SoirNbPers: null,
              },
              {
                id:3,
                jour: 'Jeudi',
                date: '17/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'pain',            
                SoirNbPers: null,
              },
              {
                id:4,
                jour: 'Vendredi',
                date: '18/02',
                Matin: 'flocon d\'avoine',
                MatinNbPers:null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'frites',
                SoirNbPers: null,
              },
              {
                id:5,
                jour: 'Samedi',
                date: '19/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'spaghetti',
                MidiNbPers: null,
                Soir: 'crepe',
                SoirNbPers: null,
              },
              {
                id:6,
                jour: 'Dimanche',
                date: '20/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'rotî sauce moutarde',
                MidiNbPers:'18',
                Soir: '/',
                SoirNbPers: null,
              },
              {
                id:7,
                jour: 'Lundi',
                date: '21/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'rotî sauce moutarde',
                MidiNbPers: '18',
                Soir: '/',
                SoirNbPers: null,
              }
            ],
            dateDebut: '14/02/2022',
            dateFin: '20/02/2022',
            verrou: true
          },
          {
            menu_id: 1,
            plats: [
              {
                id:10,
                jour: 'Lundi',
                date: '21/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'pain',
                SoirNbPers: null
              },
              {
                id:11,
                jour: 'Mardi',
                date: '22/02',
                Matin: 'crepe',
                MatinNbPers: null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'lasagne',
                SoirNbPers: null,
              },
              {
                id:12,
                jour: 'Mercredi',
                date: '23/02',
                Matin: '/',
                MatinNbPers:null,
                Midi: 'pain',
                MidiNbPers: null,
                Soir: 'canard',
                SoirNbPers: null,
              },
              {
                id:13,
                jour: 'Jeudi',
                date: '24/02',
                Matin: 'céréale',
                MatinNbPers:null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'pain',            
                SoirNbPers: null,
              },
              {
                id:14,
                jour: 'Vendredi',
                date: '25/02',
                Matin: 'flocon d\'avoine',
                MatinNbPers:null,
                Midi: 'croque-monsieur',
                MidiNbPers: null,
                Soir: 'frites',
                SoirNbPers: null,
              }
            ],
            dateDebut: '21/02/2022',
            dateFin: '25/02/2022',
            verrou: true
          }
        ],
        itemPeriode: [],
        comboboxMenuSelected: null,
        pageCount: 0,
        page: 1,
        nbJourMenu: 0,
        platsMatin:[],
        platsMidi: [],
        platsSoir: [] 
      }
    },
    mounted () {
      //console.log(this.$vuetify.breakpoint.width)
      this.comboboxMenuSelected='Aucun menu sélectionné'

      //select des periodes
      this.menus.forEach(menu => {
        if(menu.verrou){
          let periodeNew = { 
              text: menu.dateDebut + ' - ' +menu.dateFin,
              value: menu.menu_id
            }
          this.itemPeriode.push(periodeNew)
        }
      });

    },
    watch:{
        comboboxMenuSelected(slot){     
        if(slot === 'Aucun menu sélectionné'){           
          this.items = []
        }
        else{ //check période des menus => Call API
           
          //get id du menu
          this.headers = []
          this.platsMatin  = []
          this.platsMidi  = []
          this.platsSoir = []
          this.nbJourMenu = 0    
          let menuSelected = this.menus.find(menu => menu.menu_id === slot)  
          
          this.items = menuSelected.plats

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
            Matin: jourPlat.Matin,
            MatinNbPers: jourPlat.MatinNbPers
          })

          this.platsMidi.push({
            id: jourPlat.id,
            Midi: jourPlat.Midi,
            MidiNbPers: jourPlat.MidiNbPers
          })

          this.platsSoir.push({
            id: jourPlat.id,
            Soir: jourPlat.Soir,
            SoirNbPers: jourPlat.SoirNbPers
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


<style>
/*table tr {
     display:flex;
     flex-direction: column;
     float: left;
  }

  thead,tbody {
    float: left;
  }*/
</style>

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
  /*border: 1px solid*/
  /*border-color: green*/

.v-application .primary--text 
  color: #FFB74D !important
  caret-color: #FFB74D  !important

.nodata
  text-align: center
  padding: 5px
  color: grey
</style>