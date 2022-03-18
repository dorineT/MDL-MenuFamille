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
              <td class="tdplat" v-for="(item,i) in platsMatin" :key="i+'matin'"> 
                <v-btn text @click="goToRecette(item,'matin')">

                    <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>
                    <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>
                    <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
                    <p v-else>{{ item.plat }} </p>                   

                  </v-btn>                     
                <p v-if="item.nbPers!==null">{{item.nbPers}} personnes</p> 
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsMidi" :key="i+'midi'"> 
                <v-btn text @click="goToRecette(item,'midi')">
                    <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>
                  <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>
                  <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
                  <p v-else>{{ item.plat }} </p>                                    
                </v-btn>               
                <p v-if="item.nbPers!==null">{{item.nbPers}} personnes</p> 
              </td>
            </tr>
            <tr>
              <td class="tdplat" v-for="(item,i) in platsSoir" :key="i+'soir'"> 
                <v-btn  text @click="goToRecette(item,'soir')">
                  <p v-if="item.plat === '' &  item.tags.length > 0" style="color: green"><strong>Tags</strong></p>     
                  <p v-else-if="item.plat === ''" style="color: green"><v-icon color="green" large>mdi-plus</v-icon></p>             
                  <p v-else-if="item.plat==='/'" style="color: red"><v-icon color="red">mdi-close-thick</v-icon></p>
                  <p v-else>{{ item.plat }} </p>
                </v-btn> 
                <p v-if="item.nbPers!==null">{{item.nbPers }} personnes </p>  
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
                v-model.number="menu.nbPlatMatin"                            
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
                v-model.number="menu.nbPlatMidi"                            
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
                v-model.number="menu.nbPlatSoir"                            
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
export default {
    props:['periodeMenu'],
    data () {
      return {
        headers: [],
        menu: {          
          menu_id: 1,
          plats: [
            {
              id:10,
              jour: 'Lundi',
              date: '21/02',
              matin: 'céréale',
              matinNbPers:null,
              midi: 'croque-monsieur',
              midiNbPers: null,
              soir: 'pain',

              soirNbPers: null,
              tagsMatin:[],
              tagsMidi: [],
              tagsSoir: []

            },
            {
              id:11,
              jour: 'Mardi',
              date: '22/02',
              matin: 'crepe',
              matinNbPers: null,
              midi: 'croque-monsieur',
              midiNbPers: null,
              soir: 'lasagne',
              soirNbPers: null,
              tagsMatin:[],
              tagsMidi: [],
              tagsSoir: []
            },
            {
              id:12,
              jour: 'Mercredi',
              date: '23/02',
              matin: '/',
              matinNbPers:null,
              midi: 'pain',
              midiNbPers: null,
              soir: 'canard',
              soirNbPers: null,
              tagsMatin:[],
              tagsMidi: [],
              tagsSoir: []
            },
            {
              id:13,
              jour: 'Jeudi',
              date: '24/02',
              matin: 'céréale',
              matinNbPers:null,
              midi: 'croque-monsieur',
              midiNbPers: null,
              soir: 'pain',            
              soirNbPers: null,
              tagsMatin:[],
              tagsMidi: [],
              tagsSoir: []
            },
            {
              id:14,
              jour: 'Vendredi',
              date: '25/02',
              matin: 'flocon d\'avoine',
              matinNbPers:null,
              midi: 'croque-monsieur',
              midiNbPers: null,
              soir: 'frites',
              soirNbPers: null,
              tagsMatin:['sucre'],
              tagsMidi: ['sel'],
              tagsSoir: []
            }
          ],
          dateDebut: '21/02/2022',
          dateFin: '25/02/2022',
          nbPlatMatin: null,
          nbPlatMidi: null,
          nbPlatSoir: null,
          verrou: false            
        },
        items: [],
        pageCount: 0,
        page: 1,
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
        console.log('des choses a faire avec l\'api')
        this.items = this.menu.plats

        let indiceEnd = this.items.length < 7 ? this.items.length : 7       
        this.populateHeader(this.items,0,indiceEnd)
        this.fillPlat(this.items,0,indiceEnd) 
        // call api to get the menu ou pas besoin
    },
    created(){
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
      goToRecette(item,periode){    

          let menuFind = this.items.find(el => el.id === item.id)
          //open dialogue with even bus
          eventBus.$emit('openDialog', item, periode, menuFind.jour, menuFind.date)
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
            plat: jourPlat.matin,
            nbPers: jourPlat.matinNbPers,
            tags: jourPlat.tagsMatin
          })

          this.platsMidi.push({
            id: jourPlat.id,
            plat: jourPlat.midi,
            nbPers: jourPlat.midiNbPers,
            tags: jourPlat.tagsMidi
          })

          this.platsSoir.push({
            id: jourPlat.id,
            plat: jourPlat.soir,
            nbPers: jourPlat.soirNbPers,
            tags: jourPlat.tagsSoir
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

      updateMenuJour(menuJour, periode){        
        let menuJourOld = this.menu.plats.find( elem => elem.id === menuJour.id)
        this.errorMessage.message = ""

        let menuJourSave = {
          id: menuJourOld.id,
          jour: menuJourOld.jour,
          date: menuJourOld.date,
          matin: menuJourOld.matin,
          matinNbPers: menuJourOld.matinNbPers,
          tagsMatin: menuJourOld.tagsMatin,
          midi: menuJourOld.matin,
          midiNbPers: menuJourOld.matinNbPers,
          tagsMidi: menuJourOld.tagsMatin,
          soir: menuJourOld.matin,
          soirNbPers: menuJourOld.matinNbPers,
          tagsSoir: menuJourOld.tagsMatin,
        };

        let newTags = []
        menuJour.tags.forEach(el => {
          newTags.push(el)
        });

        if(periode === 'matin'){
          menuJourOld.matin = menuJour.plat
          menuJourOld.matinNbPers = menuJour.nbPers
          menuJourOld.tagsMatin = newTags 

          if(this.menu.nbPlatMatin !== null){
            this.errorMessage.message = checkContrainte.verifContraintePlat(this.items, this.menu.nbPlatMatin, 'matin');
          }
        }
        else if(periode === 'midi'){
          menuJourOld.midi = menuJour.plat
          menuJourOld.midiNbPers = menuJour.nbPers
          menuJourOld.tagsMidi = newTags 

          if(this.menu.nbPlatMidi !== null){
            this.errorMessage.message = checkContrainte.verifContraintePlat(this.items, this.menu.nbPlatMidi, 'midi');
          }
        }
        else if(periode === 'soir'){
          menuJourOld.soir = menuJour.plat
          menuJourOld.soirNbPers = menuJour.nbPers
          menuJourOld.tagsSoir = newTags
          
          if(this.menu.nbPlatSoir !== null){
            this.errorMessage.message = checkContrainte.verifContraintePlat(this.items, this.menu.nbPlatSoir, 'soir');
          }
        }


        if (this.errorMessage.message !== "") {      			
          menuJourOld.matin = menuJourSave.matin
          menuJourOld.midi = menuJourSave.midi
          menuJourOld.soir = menuJourSave.soir
          menuJourOld.matinNbPers = menuJourSave.matinNbPers
          menuJourOld.midiNbPers = menuJourSave.midiNbPers
          menuJourOld.soirNbPers = menuJourSave.soirNbPers
          menuJourOld.tagsMatin = menuJourSave.tagsMatin
          menuJourOld.tagsMidi = menuJourSave.tagsMidi
          menuJourOld.tagsSoir = menuJourSave.tagsSoir

          this.errorMessage.error = true
        } else {
          let iStart = (this.page-1) * 7
          let iEnd = this.page * 7              
          this.fillPlat(this.items,iStart,iEnd)
          this.errorMessage.error = false			
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