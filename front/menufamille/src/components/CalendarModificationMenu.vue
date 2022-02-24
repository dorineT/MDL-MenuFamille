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
                    <p v-if="item.MatinNbPers!== ''">{{item.MatinNbPers}} personnes</p>  
                  </td>
                  <td class="tdplat"> 
                    <v-btn text @click="goToRecette(item,'midi')">
                        <p v-if="item.Midi!=='/'">{{ item.Midi }} </p>
                        <p v-else style="color: red">X</p>                                        
                    </v-btn>                     
                    <p v-if="item.MidiNbPers!== ''" >{{item.MidiNbPers}} personnes</p>  
                  </td>
                  <td class="tdplat"> 
                      <v-btn  text @click="goToRecette(item,'soir')">
                        <p v-if="item.Soir!=='/'">{{ item.Soir }} </p>
                        <p v-else style="color: red">X</p>
                      </v-btn> 
                      <p v-if="item.SoirNbPers!== ''">{{item.SoirNbPers }} personnes </p>  
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
        items: [
              {
          id:0,
            jour: 'Lundi',
            date: '14/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'pain',
            SoirNbPers:''
          },
          {
            id:1,
            jour: 'Mardi',
            date: '15/02',
            Matin: 'crepe',
            MatinNbPers: '',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'lasagne',
            SoirNbPers:'',
          },
          {
            id:2,
            jour: 'Mercredi',
            date: '16/02',
            Matin: '/',
            MatinNbPers:'',
            Midi: 'pain',
            MidiNbPers:'',
            Soir: 'canard',
            SoirNbPers:'',
          },
          {
            id:3,
            jour: 'Jeudi',
            date: '17/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'pain',            
            SoirNbPers:'',
          },
          {
            id:4,
            jour: 'Vendredi',
            date: '18/02',
            Matin: 'flocon d\'avoine',
            MatinNbPers:'',
            Midi: 'croque-monsieur',
            MidiNbPers:'',
            Soir: 'frites',
            SoirNbPers:'',
          },
          {
            id:5,
            jour: 'Samedi',
            date: '19/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'spaghetti',
            MidiNbPers:'',
            Soir: 'crepe',
            SoirNbPers:'',
          },
          {
            id:6,
            jour: 'Dimanche',
            date: '20/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'rotî sauce moutarde',
            MidiNbPers:'18',
            Soir: '/',
            SoirNbPers:'',
          },
          {
            id:7,
            jour: 'Lundi',
            date: '21/02',
            Matin: 'céréale',
            MatinNbPers:'',
            Midi: 'rotî sauce moutarde',
            MidiNbPers: '18',
            Soir: '/',
            SoirNbPers:'',
          }
        ]            
      }
    },
    mounted(){
        console.log('des choses a faire avec l\'api')
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
        if(periode === 'matin'){
          this.items[menuJour.id].Matin = menuJour.Matin
        }
        else if(periode === 'midi'){
          this.items[menuJour.id].Midi = menuJour.Midi
        }
        else if(periode === 'soir'){
          this.items[menuJour.id].Soir = menuJour.Soir
        }
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