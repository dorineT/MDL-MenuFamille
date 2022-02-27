<template>

  <div style="margin: 4px">
      
      <div  style="margin: 4px">Menu : {{periodeMenu}} </div>
      
        <v-data-table
            :headers="headers"
            :items="itemsMenu"                                          
            class="elevation-8"
            disable-sort
            mobile-breakpoint="0"
            :footer-props="{             
              'disable-items-per-page':true,
              itemsPerPage:7,      
              'items-per-page-options': [7,14],
              'items-per-page-text':'Lignes par page',
            }"
        > 


          <template v-slot:item="{ item }">
            <tr>
                  <td class="tdplat"> 
                    {{ item.jour }} <br> {{item.date}}
                  </td>
                  <td class="tdplat"> 
                      <v-btn text @click="goToRecette(item,'matin')">
                        <p v-if="item.Matin!=='/'">{{ item.Matin }} </p>
                        <p v-else style="color: red">X</p>                      
                      </v-btn>                     
                    <p v-if="item.MatinNbPers!==null">{{item.MatinNbPers}} personnes</p>  
                  </td>
                  <td class="tdplat"> 
                    <v-btn text @click="goToRecette(item,'midi')">
                        <p v-if="item.Midi!=='/'">{{ item.Midi }} </p>
                        <p v-else style="color: red">X</p>                                        
                    </v-btn>                     
                    <p v-if="item.MidiNbPers!==null" >{{item.MidiNbPers}} personnes</p>  
                  </td>
                  <td class="tdplat"> 
                      <v-btn  text @click="goToRecette(item,'soir')">
                        <p v-if="item.Soir!=='/'">{{ item.Soir }} </p>
                        <p v-else style="color: red">X</p>
                      </v-btn> 
                      <p v-if="item.SoirNbPers!==null">{{item.SoirNbPers }} personnes </p>  
                  </td>
            </tr>
          </template>

        </v-data-table>    
    </div>

</template>

<script>
import {eventBus } from '../main'
export default {
    props:['periodeMenu'],
    data () {
      return {
        headers: [
          {
            text: 'Période',
            align: 'start',            
            value: 'name',
          },
          { text: 'Matin', align: 'center',value: 'Matin' },
          { text: 'Midi',align: 'center', value: 'Midi' },
          { text: 'Soir',align: 'center', value: 'Soir' },
        ],
        menu: {          
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
        },
        itemsMenu: []          
      }
    },
    mounted(){
        console.log('des choses a faire avec l\'api')
        this.itemsMenu = this.menu.plats
        // call api to get the menu
    },
    created(){
      eventBus.$on('updateMenuJour', this.updateMenuJour)
    },
    methods:{
      goToRecette(item,periode){
          console.log('click recette calendar ' + periode)
          //open dialogue with even bus
          eventBus.$emit('openDialog', item, periode)
        },

      updateMenuJour(menuJour, periode){
        console.log(menuJour)
        console.log(periode)

        console.log(this.menu.plats)
        //let menuJourOld = this.menus.plats.find( elem => elem.id === menuJour.id)
        //console.log('menu trouve ' + menuJourOld)

        /*if(periode === 'matin'){
          this.menu.plat[menuJour.id].Matin = menuJour.Matin
        }
        else if(periode === 'midi'){
          this.menu[menuJour.id].Midi = menuJour.Midi
        }
        else if(periode === 'soir'){
          this.menu[menuJour.id].Soir = menuJour.Soir
        }*/
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