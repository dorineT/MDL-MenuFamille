<template>

  <div style="margin: 4px">

    <v-select
      color="orange lighten-2"
      label="Choix du menu"
      class="combobox-class"
      :items="itemPeriode"      
      v-model="comboboxMenuSelected"></v-select>
<!--mobile-breakpoint="0"-->

        <v-data-table
            :headers="headers"
            :items="items"                                  
            class="elevation-8"
            disable-sort
            
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

          <template
            v-if="IscomboboxChange('Aucun menu sélectionné')"
            v-slot:no-data
          >
            Pas de menu sélectionné
          </template>


          <template v-slot:body="">
           <!-- <tr >
              <td class="tdplat" v-for="item in items" :key="item.id"> 
                {{ item.jour }} <br> {{item.date}} 
            </td>
            </tr>-->
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
      console.log(this.$vuetify.breakpoint.width)
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

          this.populateHeader(menuSelected) 
          

          let indiceEnd = this.items.length < 7 ? this.items.length : 7
          console.log('length ' + this.items.length) 
          this.fillPlat(menuSelected,0,indiceEnd)   

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
      populateHeader(menuSelect){
        let i = 0;
        // 7 jour max display dans le cal
        while(this.nbJourMenu < 7 & i < menuSelect.plats.length){
          let jourPlat = menuSelect.plats[i]
          this.headers.push({
              text: jourPlat.jour + '\n' + jourPlat.date, 
              align: 'center',
              value: jourPlat.id
          })
          i++
          this.nbJourMenu++
        }
      },
      fillPlat(menu,iStart, iEnd){       
        while(iStart<iEnd){
          let jourPlat = menu.plats[iStart]

          this.platsMatin.push({
            Matin: jourPlat.Matin,
            MatinNbPers: jourPlat.MatinNbPers
          })

          this.platsMidi.push({
            Midi: jourPlat.Midi,
            MidiNbPers: jourPlat.MidiNbPers
          })

          this.platsSoir.push({
            Soir: jourPlat.Soir,
            SoirNbPers: jourPlat.SoirNbPers
          })

          iStart++
        }
        
      },
      //event quand on clique sur page suivante
      nextPageMenu(){
        alert('hrllo')
      },
      //event quand on clique sur page precedente
      previousPageMenu(){
        alert('hrllo')
      },
      changePageEvent(number){
        alert(number)
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
  border: 1px solid
  border-color: green
  border-radius: 6px
  margin: 3px

.v-application .primary--text 
  color: #FFB74D !important
  caret-color: #FFB74D  !important

</style>